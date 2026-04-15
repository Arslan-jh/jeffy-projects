// Notion API Integration using direct fetch
// Notion SDK v5 has breaking changes, so we use the REST API directly

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
const NOTION_API_BASE = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";

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
  try {
    const response = await notionFetch(`/databases/${NOTION_DATABASE_ID}/query`, {
      method: "POST",
      body: JSON.stringify({
        sorts: [
          {
            property: "Date",
            direction: "descending",
          },
        ],
      }),
    });

    const pages = response.results || [];
    const posts = pages.map((page: any) => {
      const props = page.properties;

      // Get title from Name or Title property
      const titleProp = props.Name || props.Title;
      const title =
        titleProp?.title?.[0]?.plain_text ||
        titleProp?.rich_text?.[0]?.plain_text ||
        "Untitled";

      // Get slug
      const slugProp = props.Slug || props.slug;
      const slug =
        slugProp?.rich_text?.[0]?.plain_text ||
        title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") ||
        page.id;

      // Get date
      const dateProp = props.Date || props.date;
      const date = dateProp?.date?.start || new Date().toISOString();

      // Get tags (multi-select)
      const tagsProp = props.Tags || props.tags;
      const tags = tagsProp?.multi_select?.map((tag: any) => tag.name) || [];

      // Get excerpt
      const excerptProp = props.Excerpt || props.Description || props.excerpt;
      const excerpt =
        excerptProp?.rich_text?.[0]?.plain_text ||
        excerptProp?.plain_text ||
        "";

      return {
        id: page.id,
        slug,
        title,
        date,
        tags,
        excerpt,
        content: "",
      };
    });

    return posts;
  } catch (error) {
    console.error("Error fetching posts from Notion:", error);
    return [];
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    // First, query to find the page with matching slug
    const response = await notionFetch(`/databases/${NOTION_DATABASE_ID}/query`, {
      method: "POST",
      body: JSON.stringify({
        filter: {
          property: "Slug",
          rich_text: {
            equals: slug,
          },
        },
      }),
    });

    if (response.results.length === 0) {
      return null;
    }

    const page = response.results[0];
    const props = page.properties;

    const titleProp = props.Name || props.Title;
    const title =
      titleProp?.title?.[0]?.plain_text ||
      titleProp?.rich_text?.[0]?.plain_text ||
      "Untitled";

    const slugProp = props.Slug || props.slug;
    const postSlug =
      slugProp?.rich_text?.[0]?.plain_text ||
      title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") ||
      page.id;

    const dateProp = props.Date || props.date;
    const date = dateProp?.date?.start || new Date().toISOString();

    const tagsProp = props.Tags || props.tags;
    const tags = tagsProp?.multi_select?.map((tag: any) => tag.name) || [];

    const excerptProp = props.Excerpt || props.Description || props.excerpt;
    const excerpt =
      excerptProp?.rich_text?.[0]?.plain_text ||
      excerptProp?.plain_text ||
      "";

    // Get page content (blocks)
    const blocksResponse = await notionFetch(`/blocks/${page.id}/children?page_size=100`);

    // Convert blocks to markdown
    let content = "";
    for (const block of blocksResponse.results) {
      const b = block as any;
      if (b.type === "paragraph") {
        const text = b.paragraph.rich_text.map((t: any) => t.plain_text).join("");
        content += text + "\n\n";
      } else if (b.type === "heading_1") {
        const text = b.heading_1.rich_text.map((t: any) => t.plain_text).join("");
        content += `# ${text}\n\n`;
      } else if (b.type === "heading_2") {
        const text = b.heading_2.rich_text.map((t: any) => t.plain_text).join("");
        content += `## ${text}\n\n`;
      } else if (b.type === "heading_3") {
        const text = b.heading_3.rich_text.map((t: any) => t.plain_text).join("");
        content += `### ${text}\n\n`;
      } else if (b.type === "code") {
        const text = b.code.rich_text.map((t: any) => t.plain_text).join("");
        const language = b.code.language || "text";
        content += `\`\`\`${language}\n${text}\n\`\`\`\n\n`;
      } else if (b.type === "bulleted_list_item") {
        const text = b.bulleted_list_item.rich_text.map((t: any) => t.plain_text).join("");
        content += `- ${text}\n`;
      } else if (b.type === "numbered_list_item") {
        const text = b.numbered_list_item.rich_text.map((t: any) => t.plain_text).join("");
        content += `1. ${text}\n`;
      } else if (b.type === "image") {
        const url = b.image.type === "external" ? b.image.external.url : b.image.file?.url || "";
        content += `![image](${url})\n\n`;
      } else if (b.type === "divider") {
        content += `---\n\n`;
      }
    }

    return {
      id: page.id,
      slug: postSlug,
      title,
      date,
      tags,
      excerpt,
      content: content.trim(),
    };
  } catch (error) {
    console.error("Error fetching post from Notion:", error);
    return null;
  }
}
