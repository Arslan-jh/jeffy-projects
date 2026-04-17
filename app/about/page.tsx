"use client";

import { useState } from "react";

export default function AboutPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      message: data.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="bg-white">
      {/* Header - Light Gray */}
      <section className="section-light py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 style={{ fontFamily: "var(--font-display)" }}>About Me</h1>
          <p
            className="text-[17px] text-black/60 mt-4 max-w-lg"
            style={{ fontFamily: "var(--font-text)", letterSpacing: "-0.374px", lineHeight: 1.47 }}
          >
            Hello! I&apos;m Jeffy, a full-stack developer passionate about building beautiful, functional digital experiences.
          </p>
        </div>
      </section>

      {/* Content - White */}
      <section className="section-white pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Bio */}
          <div className="mb-16">
            <p className="text-[17px] leading-relaxed mb-6" style={{ fontFamily: "var(--font-text)", color: "rgba(0,0,0,0.8)" }}>
              With years of experience in web development, I specialize in creating modern applications using React, Next.js, and Node.js. I believe in writing clean, maintainable code and focusing on user experience.
            </p>
            <p className="text-[17px] leading-relaxed" style={{ fontFamily: "var(--font-text)", color: "rgba(0,0,0,0.8)" }}>
              When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to open source, or sharing knowledge through blog posts.
            </p>
          </div>

          {/* Skills */}
          <div className="mb-16">
            <h2
              className="text-[21px] font-semibold mb-8"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "0.231px", lineHeight: 1.19 }}
            >
              Skills
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3
                  className="text-[17px] font-semibold mb-4"
                  style={{ fontFamily: "var(--font-text)", color: "rgba(0,0,0,0.8)" }}
                >
                  Frontend
                </h3>
                <ul className="space-y-2 text-[15px]" style={{ fontFamily: "var(--font-text)", color: "rgba(0,0,0,0.8)" }}>
                  <li>React / Next.js</li>
                  <li>Vue / Nuxt.js</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                </ul>
              </div>
              <div>
                <h3
                  className="text-[17px] font-semibold mb-4"
                  style={{ fontFamily: "var(--font-text)", color: "rgba(0,0,0,0.8)" }}
                >
                  Backend
                </h3>
                <ul className="space-y-2 text-[15px]" style={{ fontFamily: "var(--font-text)", color: "rgba(0,0,0,0.8)" }}>
                  <li>Node.js</li>
                  <li>Python</li>
                  <li>PostgreSQL</li>
                  <li>MongoDB</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2
              className="text-[21px] font-semibold mb-8"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "0.231px", lineHeight: 1.19 }}
            >
              Get in Touch
            </h2>
            <p className="text-[15px] text-black/60 mb-8" style={{ fontFamily: "var(--font-text)" }}>
              Have a question or want to work together? Send me a message!
            </p>

            {status === "success" && (
              <div
                className="mb-8 p-6 rounded-[12px]"
                style={{ background: "#f5f5f7" }}
              >
                <p className="text-[15px] font-medium" style={{ fontFamily: "var(--font-text)", color: "rgba(0,0,0,0.8)" }}>Message sent successfully!</p>
                <p className="text-[14px] mt-1" style={{ fontFamily: "var(--font-text)", color: "rgba(0,0,0,0.6)" }}>
                  I&apos;ll get back to you as soon as possible.
                </p>
              </div>
            )}

            {status === "error" && (
              <div
                className="mb-8 p-6 rounded-[12px]"
                style={{ background: "#fef2f2" }}
              >
                <p className="text-[15px] font-medium" style={{ fontFamily: "var(--font-text)", color: "#dc2626" }}>
                  {error}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-[14px] font-medium mb-2"
                  style={{ fontFamily: "var(--font-text)", color: "rgba(0,0,0,0.8)" }}
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-3 text-[15px] rounded-[11px] border-none"
                  style={{
                    background: "#f5f5f7",
                    fontFamily: "var(--font-text)",
                  }}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-[14px] font-medium mb-2"
                  style={{ fontFamily: "var(--font-text)", color: "rgba(0,0,0,0.8)" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 text-[15px] rounded-[11px] border-none"
                  style={{
                    background: "#f5f5f7",
                    fontFamily: "var(--font-text)",
                  }}
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-[14px] font-medium mb-2"
                  style={{ fontFamily: "var(--font-text)", color: "rgba(0,0,0,0.8)" }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="How can I help you?"
                  className="w-full px-4 py-3 text-[15px] rounded-[11px] border-none resize-none"
                  style={{
                    background: "#f5f5f7",
                    fontFamily: "var(--font-text)",
                  }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-6 py-3 bg-black text-white text-[15px] font-medium rounded-[11px] hover:bg-black/80 transition-colors disabled:opacity-50"
                style={{ fontFamily: "var(--font-text)" }}
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
