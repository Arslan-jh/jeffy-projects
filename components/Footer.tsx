import Link from "next/link";

export default function Footer() {
  return (
    <footer className="section-light py-8">
      <div className="max-w-980 mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="space-y-1">
            <p
              className="font-semibold text-base"
              style={{ fontFamily: "var(--font-text)", letterSpacing: 0 }}
            >
              My Portfolio
            </p>
            <p className="text-caption">
              © {new Date().getFullYear()} My Portfolio. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              GitHub
            </Link>
            <Link href="/blog" className="text-link">
              Blog
            </Link>
            <Link href="/projects" className="text-link">
              Projects
            </Link>
            <Link href="/contact" className="text-link">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
