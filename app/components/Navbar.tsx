"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaBars, FaSearch, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },

    { name: "Top", href: "/anime/top-anime" },
    { name: "Seasonal", href: "/anime/seasonal" },
    { name: "Genres", href: "/anime/genres" },
    { name: "Trending", href: "/anime/trending" },
  ];

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const rawQuery = formData.get("search");

    if (!rawQuery) return;

    const query = rawQuery.toString().trim();
    if (!query) return;

    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <nav className="w-full px-6 py-2 border-b border-white/10 bg-purple-900/20 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="font-heading text-4xl font-bold">
          kuro<span className="text-5xl text-purple-700">X</span>
        </Link>

        {/* Desktop Links */}
        <div className="flex gap-5 items-center">

        <div className="hidden md:flex items-center gap-6 font-body text-sm text-[var(--color-text)]/70">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="hover:text-white transition"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Search Bar - desktop */}
        <form
          onSubmit={handleSearch}
          className="relative flex w-full md:w-64 max-md:hidden"
          aria-label="Search Anime"
        >
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            name="search"
            placeholder="Search anime..."
            className="w-full pl-10 pr-3 py-2 rounded-full bg-white/10 border border-white/20 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
          />
        </form>
        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="text-[var(--color-text)]/70 hover:text-white transition"
          >
            {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
        </div>

      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 px-4 py-4 space-y-2 bg-purple-900/80 backdrop-blur-md rounded-b-lg">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block text-[var(--color-text)]/70 hover:text-white transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="mt-2">
            <input
              type="search"
              name="search"
              placeholder="Search anime..."
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-[var(--color-text)] placeholder-[var(--color-text)]/50 focus:outline-none focus:border-purple-500 transition"
            />
          </form>
        </div>
      )}
    </nav>
  );
}
