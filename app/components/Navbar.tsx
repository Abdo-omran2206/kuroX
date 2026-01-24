import Link from "next/link";

export default function Navbar() {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Anime", href: "/anime" },
    { name: "Top", href: "/top-anime" },
    { name: "Seasonal", href: "/seasonal" },
    { name: "Genres", href: "/genres" },
    { name: "Trending", href: "/trending" },
  ];

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
          {navLinks.map((items) => (
            <Link
              key={items.name}
              href="/"
              // href={items.href}
              className="text-[var(--color-text)]/70 hover:text-[var(--color-text)] transition"
            >
              {items.name}
            </Link>
          ))}
        </div>
        <input
          type="search"
          placeholder="Search anime..."
          className="w-80 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-[var(--color-text)] placeholder-[var(--color-text)]/50 focus:outline-none focus:border-purple-500 transition"
        />
      </div>
    </nav>
  );
}
