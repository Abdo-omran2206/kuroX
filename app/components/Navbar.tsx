import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-2 border-b border-white/10 bg-purple-900/20 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="
          font-heading text-4xl font-bold
        "
        >
          kuro<span className="text-5xl text-purple-700">X</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 font-body text-sm">
          <Link
            href="/"
            className="text-[var(--color-text)]/70 hover:text-[var(--color-text)] transition"
          >
            Home
          </Link>

          <Link
            href="/anime"
            className="text-[var(--color-text)]/70 hover:text-[var(--color-text)] transition"
          >
            Anime
          </Link>

          <Link
            href="/contact"
            className="text-[var(--color-text)]/70 hover:text-[var(--color-text)] transition"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
