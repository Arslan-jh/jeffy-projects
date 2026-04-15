import Link from "next/link";
import { getPosts } from "@/lib/notion";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="bg-white">
      {/* Header - Light Gray */}
      <section className="section-light py-24 px-6">
        <div className="max-w-980 mx-auto">
          <h1 style={{ fontFamily: "var(--font-display)" }}>Blog</h1>
          <p
            className="text-body mt-4 max-w-xl"
            style={{ fontFamily: "var(--font-text)", letterSpacing: 0 }}
          >
            Thoughts on technology, design, and everything in between.
          </p>
        </div>
      </section>

      {/* Posts - White */}
      <section className="section-white pb-24 px-6">
        <div className="max-w-980 mx-auto">
          <div className="space-y-0">
            {posts.length === 0 ? (
              <p className="text-body py-12 text-center">
                No posts yet. Connect your Notion database to start writing!
              </p>
            ) : (
              posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block group py-8 border-b border-black/10 last:border-b-0"
                >
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-3">
                    <h2
                      className="text-near-black group-hover:opacity-70 transition-opacity"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {post.title}
                    </h2>
                    <span className="text-caption shrink-0">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-body mb-4">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="text-caption px-3 py-1 rounded-full"
                        style={{ background: "var(--color-light-gray)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
