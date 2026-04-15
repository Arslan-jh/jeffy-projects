import Link from "next/link";

const projects = [
  {
    name: "OpenClaw Integration",
    description:
      "A plugin for OpenClaw that integrates with various messaging platforms.",
    tech: ["TypeScript", "Node.js"],
    link: "https://github.com",
  },
  {
    name: "Personal Portfolio",
    description: "This website! Built with Next.js and Tailwind CSS.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    link: "https://github.com",
  },
  {
    name: "Sample Project",
    description: "A brief description of another project.",
    tech: ["React", "Python", "PostgreSQL"],
    link: "https://github.com",
  },
];

export default function ProjectsPage() {
  return (
    <div className="bg-white">
      {/* Header - Light Gray */}
      <section className="section-light py-24 px-6">
        <div className="max-w-980 mx-auto">
          <h1 style={{ fontFamily: "var(--font-display)" }}>Projects</h1>
          <p
            className="text-body mt-4 max-w-2xl"
            style={{ fontFamily: "var(--font-text)", letterSpacing: 0 }}
          >
            A collection of things I've built, from open source plugins to web applications.
          </p>
        </div>
      </section>

      {/* Projects Grid - White */}
      <section className="section-white py-24 px-6">
        <div className="max-w-980 mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <a
                key={index}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="card group block p-6"
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: "var(--color-white)" }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                </div>

                {/* Title */}
                <h2
                  className="mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {project.name}
                </h2>

                {/* Description */}
                <p className="text-body text-caption mb-6">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-caption px-3 py-1 rounded-full"
                      style={{ background: "var(--color-white)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* External Link */}
                <div
                  className="mt-6 pt-4 border-t flex items-center text-link group-hover:underline"
                  style={{ borderColor: "var(--color-black/10)" }}
                >
                  <span>View on GitHub</span>
                  <svg
                    className="ml-2 w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
