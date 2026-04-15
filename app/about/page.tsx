export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Header - Light Gray */}
      <section className="section-light py-24 px-6">
        <div className="max-w-980 mx-auto">
          <h1 style={{ fontFamily: "var(--font-display)" }}>About Me</h1>
          <p
            className="text-body mt-4 max-w-xl"
            style={{ fontFamily: "var(--font-text)", letterSpacing: 0 }}
          >
            Hello! I'm a full-stack developer passionate about building
            beautiful, functional digital experiences.
          </p>
        </div>
      </section>

      {/* Content - White */}
      <section className="section-white pb-24 px-6">
        <div className="max-w-980 mx-auto">
          {/* Bio */}
          <div className="mb-16">
            <p className="text-body leading-relaxed mb-6">
              With years of experience in web development, I specialize in
              creating modern applications using React, Next.js, and Node.js.
              I believe in writing clean, maintainable code and focusing on
              user experience.
            </p>
            <p className="text-body leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies,
              contributing to open source, or sharing knowledge through blog posts.
            </p>
          </div>

          {/* Skills */}
          <div className="mb-16">
            <h2
              className="text-2xl font-semibold mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Skills
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3
                  className="text-lg font-semibold mb-4 text-body"
                  style={{ fontFamily: "var(--font-text)" }}
                >
                  Frontend
                </h3>
                <ul className="space-y-2 text-body">
                  <li>React / Next.js</li>
                  <li>Vue / Nuxt.js</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                </ul>
              </div>
              <div>
                <h3
                  className="text-lg font-semibold mb-4 text-body"
                  style={{ fontFamily: "var(--font-text)" }}
                >
                  Backend
                </h3>
                <ul className="space-y-2 text-body">
                  <li>Node.js</li>
                  <li>Python</li>
                  <li>PostgreSQL</li>
                  <li>MongoDB</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="mb-16">
            <h2
              className="text-2xl font-semibold mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Experience
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-body">Senior Developer</h3>
                <p className="text-body mb-2">Company Name • 2020 - Present</p>
                <p className="text-body text-caption">
                  Description of your role and achievements.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-body">Developer</h3>
                <p className="text-body mb-2">Company Name • 2018 - 2020</p>
                <p className="text-body text-caption">
                  Description of your role and achievements.
                </p>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2
              className="text-2xl font-semibold mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Education
            </h2>
            <div>
              <h3 className="text-lg font-semibold text-body">Computer Science</h3>
              <p className="text-body">University Name • 2014 - 2018</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
