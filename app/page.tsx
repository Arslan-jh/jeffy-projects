import Link from "next/link";
import { getPosts } from "@/lib/notion";

export const dynamic = "force-dynamic";

export default async function Home() {
  const posts = await getPosts();
  const recentPosts = posts.slice(0, 2);

  return (
    <div className="bg-white">
      {/* Hero Section - Black Background */}
      <section className="section-dark min-h-screen flex items-center justify-center px-6">
        <div className="max-w-980 mx-auto text-center">
          <h1
            className="text-white mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Hello, I'm<br />
            <span style={{ color: "var(--color-apple-blue)" }}>Developer</span>
          </h1>
          <p
            className="text-white/80 text-xl md:text-2xl font-light max-w-xl mx-auto mb-12"
            style={{
              fontFamily: "var(--font-text)",
              lineHeight: 1.5,
              letterSpacing: 0
            }}
          >
            I build exceptional digital experiences<br />
            with focus on design and technology.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/projects" className="btn-primary">
              View Projects
            </Link>
            <Link href="/contact" className="btn-pill-white">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Section - Light Gray Background */}
      <section className="section-light py-24 px-6">
        <div className="max-w-980 mx-auto">
          <h2
            className="text-center mb-16"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Featured Work
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Project Card 1 */}
            <Link
              href="/projects/my-project"
              className="card group block"
            >
              <div
                className="aspect-[4/3] flex items-center justify-center"
                style={{ background: "var(--color-white)" }}
              >
                <span className="text-7xl">🚀</span>
              </div>
              <div className="p-6">
                <h3
                  className="mb-2 group-hover:opacity-70 transition-opacity"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  My Project
                </h3>
                <p className="text-body text-caption">
                  A brief description of the project and what it does.
                </p>
              </div>
            </Link>

            {/* Project Card 2 */}
            <Link
              href="/projects/another-project"
              className="card group block"
            >
              <div
                className="aspect-[4/3] flex items-center justify-center"
                style={{ background: "var(--color-white)" }}
              >
                <span className="text-7xl">💻</span>
              </div>
              <div className="p-6">
                <h3
                  className="mb-2 group-hover:opacity-70 transition-opacity"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Another Project
                </h3>
                <p className="text-body text-caption">
                  Another brief description of the project.
                </p>
              </div>
            </Link>
          </div>
          <div className="text-center mt-12">
            <Link href="/projects" className="btn-pill">
              View all projects
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Preview Section - White Background */}
      <section className="section-white py-24 px-6">
        <div className="max-w-980 mx-auto">
          <h2
            className="text-center mb-16"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Latest Articles
          </h2>
          <div className="space-y-0">
            {recentPosts.length === 0 ? (
              <p className="text-body text-center py-12">
                No posts yet. Connect your Notion database to start writing!
              </p>
            ) : (
              recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block group py-8 border-b border-black/10"
                >
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-3">
                    <h3
                      className="text-near-black group-hover:opacity-70 transition-opacity"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {post.title}
                    </h3>
                    <span className="text-caption">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-body">
                    {post.excerpt}
                  </p>
                  <span className="text-link mt-3 inline-block">
                    Read more →
                  </span>
                </Link>
              ))
            )}
          </div>
          <div className="text-center mt-12">
            <Link href="/blog" className="btn-pill">
              View all articles
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section - Black Background */}
      <section className="section-dark py-24 px-6">
        <div className="max-w-980 mx-auto text-center">
          <h2
            className="text-white mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Let's work together
          </h2>
          <p
            className="text-white/80 text-xl font-light mb-10"
            style={{ fontFamily: "var(--font-text)", letterSpacing: 0 }}
          >
            Have a project in mind? I'd love to hear about it.
          </p>
          <Link href="/contact" className="btn-primary">
            Start a Conversation
          </Link>
        </div>
      </section>
    </div>
  );
}
