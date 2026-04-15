import Link from "next/link";
import { getPost } from "@/lib/notion";
import { remark } from "remark";
import html from "remark-html";
import GiscusComponent from "@/components/Giscus";

export const dynamic = "force-dynamic";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return (
      <div className="bg-white">
        <section className="section-light py-24 px-6">
          <div className="max-w-980 mx-auto text-center">
            <h1 style={{ fontFamily: "var(--font-display)" }}>Post not found</h1>
            <Link href="/blog" className="text-link mt-4 inline-block">
              ← Back to blog
            </Link>
          </div>
        </section>
      </div>
    );
  }

  // Convert markdown content to HTML
  const processed = await remark().use(html).process(post.content);
  const contentHtml = processed.toString();

  return (
    <div className="bg-white">
      {/* Header - Light Gray */}
      <section className="section-light py-24 px-6">
        <div className="max-w-980 mx-auto">
          <Link
            href="/blog"
            className="text-link inline-flex items-center mb-8"
          >
            ← Back to blog
          </Link>
          <h1
            className="mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-caption">
            <span>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            {post.tags.length > 0 && (
              <>
                <span
                  className="w-1 h-1 rounded-full"
                  style={{ background: "var(--color-text-tertiary)" }}
                />
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full"
                      style={{ background: "var(--color-light-gray)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Content - White */}
      <section className="section-white py-16 px-6">
        <div className="max-w-980 mx-auto">
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
          <GiscusComponent />
        </div>
      </section>
    </div>
  );
}
