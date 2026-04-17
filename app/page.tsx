import Link from "next/link";
import { getPosts } from "@/lib/notion";
import Typewriter from "@/components/Typewriter";

export const dynamic = "force-dynamic";

export default async function Home() {
  const posts = await getPosts();
  const recentPosts = posts.slice(0, 2);

  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-980 mx-auto text-center">
          <h1
            className="text-white mb-6 flex items-center justify-center gap-1 flex-wrap"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <Typewriter text="Hello, I'm " speed={100} delay={300} />
            <span style={{ color: "#0071e3" }}>
              <Typewriter text="Jeffy" speed={100} delay={1300} />
            </span>
          </h1>
          <p
            className="text-white/80 text-xl md:text-2xl font-light max-w-xl mx-auto mb-12"
            style={{
              fontFamily: "var(--font-text)",
              lineHeight: 1.5,
              letterSpacing: 0
            }}
          >
            <Typewriter
              text="Record my sights, sounds, thoughts."
              speed={40}
              delay={1800}
            />
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/blog" className="btn-primary">
              Read Blog
            </Link>
            <Link href="/about" className="btn-pill-white">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Preview Section - Black Background */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-white mb-12"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Latest Articles
          </h2>

          {/* Blog cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentPosts.length === 0 ? (
              <p className="text-white/50 col-span-2 text-center py-12">
                No posts yet. Start writing in Notion!
              </p>
            ) : (
              recentPosts.map((post, index) => {
                const cardColors = [
                  { bg: "#1a1a1a", text: "#ffffff" },
                  { bg: "#232323", text: "#ffffff" },
                  { bg: "#2a2a2a", text: "#ffffff" },
                ];
                const color = cardColors[index % cardColors.length];

                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="block group"
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      className="rounded-[16px] p-6 transition-all duration-300 group-hover:scale-[1.02]"
                      style={{
                        backgroundColor: color.bg,
                        minHeight: "160px",
                      }}
                    >
                      <h3
                        className="text-[16px] font-semibold mb-3 group-hover:opacity-80 transition-opacity"
                        style={{ fontFamily: "var(--font-display)", color: color.text }}
                      >
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-[14px] leading-relaxed line-clamp-2 mb-4" style={{ fontFamily: "var(--font-text)", color: "rgba(255,255,255,0.6)" }}>
                          {post.excerpt}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        {post.tags.length > 0 && (
                          <span
                            className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/10 text-white/50"
                            style={{ fontFamily: "var(--font-text)" }}
                          >
                            {post.tags[0]}
                          </span>
                        )}
                        <span className="text-[12px] text-white/40" style={{ fontFamily: "var(--font-text)" }}>
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                          })}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>

          <div className="text-center mt-12">
            <Link href="/blog" className="btn-pill-white">
              View all articles
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-980 mx-auto text-center">
          <h2
            className="text-white mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Let&apos;s work together
          </h2>
          <p
            className="text-white/80 text-xl font-light mb-10"
            style={{ fontFamily: "var(--font-text)", letterSpacing: 0 }}
          >
            Have a project in mind? I&apos;d love to hear about it.
          </p>
          <Link href="/about" className="btn-primary">
            Start a Conversation
          </Link>
        </div>
      </section>
    </div>
  );
}
