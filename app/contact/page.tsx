"use client";

import { useState } from "react";

export default function ContactPage() {
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
      <section className="section-light py-24 px-6">
        <div className="max-w-980 mx-auto">
          <h1 style={{ fontFamily: "var(--font-display)" }}>Get in Touch</h1>
          <p
            className="text-body mt-4 max-w-xl"
            style={{ fontFamily: "var(--font-text)", letterSpacing: 0 }}
          >
            Have a question or want to work together? Send me a message!
          </p>
        </div>
      </section>

      {/* Form - White */}
      <section className="section-white pb-24 px-6">
        <div className="max-w-980 mx-auto">
          {status === "success" && (
            <div
              className="mb-8 p-6 rounded-lg"
              style={{
                background: "var(--color-light-gray)",
                border: "none"
              }}
            >
              <p className="text-body font-medium">Message sent successfully!</p>
              <p className="text-body text-caption mt-1">
                I'll get back to you as soon as possible.
              </p>
            </div>
          )}

          {status === "error" && (
            <div
              className="mb-8 p-6 rounded-lg"
              style={{ background: "var(--color-light-gray)" }}
            >
              <p className="text-body font-medium" style={{ color: "#dc2626" }}>
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8 max-w-xl">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-body font-medium mb-3"
                style={{ fontFamily: "var(--font-text)" }}
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Your name"
                className="w-full px-4 py-3 text-lg rounded-lg border-none"
                style={{
                  background: "var(--color-light-gray)",
                  fontFamily: "var(--font-text)",
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-body font-medium mb-3"
                style={{ fontFamily: "var(--font-text)" }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 text-lg rounded-lg border-none"
                style={{
                  background: "var(--color-light-gray)",
                  fontFamily: "var(--font-text)",
                }}
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-body font-medium mb-3"
                style={{ fontFamily: "var(--font-text)" }}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                placeholder="How can I help you?"
                className="w-full px-4 py-3 text-lg rounded-lg border-none resize-none"
                style={{
                  background: "var(--color-light-gray)",
                  fontFamily: "var(--font-text)",
                }}
              />
            </div>

            {/* Submit */}
            <button type="submit" disabled={status === "loading"} className="btn-primary">
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
