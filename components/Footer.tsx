export default function Footer() {
  return (
    <footer className="py-8" style={{ backgroundColor: "#000000" }}>
      <div className="max-w-980 mx-auto px-6">
        <p style={{ color: "#ffffff", fontFamily: "var(--font-text)", fontSize: "14px" }}>
          © {new Date().getFullYear()} Jeffy. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
