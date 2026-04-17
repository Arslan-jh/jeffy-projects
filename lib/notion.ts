// Notion API Integration using direct fetch
// Notion SDK v5 has breaking changes, so we use the REST API directly

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
const NOTION_API_BASE = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";

// Simple in-memory cache with TTL
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const isDev = process.env.NODE_ENV === "development";
const CACHE_TTL = isDev ? 60 * 1000 : 60 * 1000; // 1 minute cache in both dev and prod

const cache = new Map<string, CacheEntry<any>>();

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.timestamp < CACHE_TTL) {
    return entry.data as T;
  }
  cache.delete(key);
  return null;
}

function setCache<T>(key: string, data: T): void {
  cache.set(key, { data, timestamp: Date.now() });
}

// Force refresh cache (useful when Notion content updates)
export function invalidateCache(key?: string): void {
  if (key) {
    cache.delete(key);
  } else {
    cache.clear();
  }
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  content: string;
}

async function notionFetch(endpoint: string, options: RequestInit = {}) {
  const url = `${NOTION_API_BASE}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${NOTION_API_KEY}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Notion API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function getPosts(): Promise<Post[]> {
  const cacheKey = "posts_list";
  const cached = getCached<Post[]>(cacheKey);
  if (cached) return cached;

  try {
    const response = await notionFetch(`/databases/${NOTION_DATABASE_ID}/query`, {
      method: "POST",
      body: JSON.stringify({}),
    });

    const pages = response.results || [];
    const posts = [];

    for (const page of pages) {
      const props = page.properties;

      // Get title
      const titleProp = props.Name || props.Title;
      const title =
        titleProp?.title?.[0]?.plain_text ||
        titleProp?.rich_text?.[0]?.plain_text ||
        "Untitled";

      // Get slug
      const slug =
        title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") ||
        page.id;

      // Get date
      const dateProp = props.Date || props.date;
      const date = dateProp?.date?.start || new Date().toISOString();

      // Get tags (multi-select)
      const tagsProp = props.Tags || props.tags;
      const tags = tagsProp?.multi_select?.map((tag: any) => tag.name) || [];

      // Use title as excerpt (don't fetch blocks for list - that's too slow)
      const excerpt = title;

      posts.push({
        id: page.id,
        slug,
        title,
        date,
        tags,
        excerpt,
        content: "",
      });
    }

    setCache(cacheKey, posts);
    return posts;
  } catch (error) {
    console.error("Error fetching posts from Notion:", error);
    return [];
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  const cacheKey = `post_${slug}`;
  const cached = getCached<Post | null>(cacheKey);
  if (cached) return cached;

  try {
    // Get all posts and find by slug
    const posts = await getPosts();
    const post = posts.find(p => p.slug === slug);

    if (!post) return null;

    // Re-fetch to get full content
    const blocksResponse = await notionFetch(`/blocks/${post.id}/children?page_size=100`);
    let content = "";

    for (const b of blocksResponse.results || []) {
      const blockData = b as any;
      if (blockData.type === "paragraph") {
        const text = blockData.paragraph.rich_text.map((t: any) => t.plain_text).join("");
        content += text + "\n\n";
      } else if (blockData.type === "heading_1") {
        const text = blockData.heading_1.rich_text.map((t: any) => t.plain_text).join("");
        content += `# ${text}\n\n`;
      } else if (blockData.type === "heading_2") {
        const text = blockData.heading_2.rich_text.map((t: any) => t.plain_text).join("");
        content += `## ${text}\n\n`;
      } else if (blockData.type === "heading_3") {
        const text = blockData.heading_3.rich_text.map((t: any) => t.plain_text).join("");
        content += `### ${text}\n\n`;
      } else if (blockData.type === "code") {
        const text = blockData.code.rich_text.map((t: any) => t.plain_text).join("");
        content += `\`\`\`${blockData.code.language || "text"}\n${text}\n\`\`\`\n\n`;
      } else if (blockData.type === "bulleted_list_item") {
        const text = blockData.bulleted_list_item.rich_text.map((t: any) => t.plain_text).join("");
        content += `- ${text}\n`;
      } else if (blockData.type === "numbered_list_item") {
        const text = blockData.numbered_list_item.rich_text.map((t: any) => t.plain_text).join("");
        content += `1. ${text}\n`;
      } else if (blockData.type === "image") {
        const url = blockData.image.type === "external"
          ? blockData.image.external.url
          : blockData.image.file?.url || "";
        content += `![image](${url})\n\n`;
      } else if (blockData.type === "divider") {
        content += `---\n\n`;
      }
    }

    const fullPost = {
      ...post,
      content: content.trim(),
    };

    setCache(cacheKey, fullPost);
    return fullPost;
  } catch (error) {
    console.error("Error fetching post from Notion:", error);
    return null;
  }
}
