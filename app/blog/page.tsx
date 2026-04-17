import { getPosts } from "@/lib/notion";
import BlogContent from "@/components/BlogContent";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="bg-white">
      <BlogContent initialPosts={posts} />
    </div>
  );
}
