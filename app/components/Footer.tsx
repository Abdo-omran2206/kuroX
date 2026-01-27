import { FaDiscord, FaGithub, FaHeart, FaTwitter } from "react-icons/fa";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaGithub size={20} />, href: "#" },
    { icon: <FaTwitter size={20} />, href: "#" },
    { icon: <FaDiscord size={20} />, href: "#" },
  ];

  const quickLinks = [
    { label: "Browse Anime", href: "/" },
    { label: "Trending Anime", href: "/anime/trending" },
    { label: "Top Rated", href: "/anime/top-rated" },
    { label: "Seasonal Anime", href: "/anime/seasonal" },
  ];

  const categories = [
    { label: "Action", href: "/anime/genres?genre=1" },
    { label: "Romance", href: "/anime/genres?genre=22" },
    { label: "Comedy", href: "/anime/genres?genre=4" },
    { label: "Fantasy", href: "/anime/genres?genre=10" },
  ];

  const supportLinks = [
    { label: "Help Center", href: "/" },
    { label: "Contact Us", href: "/" },
    { label: "Privacy Policy", href: "/" },
    { label: "Terms of Service", href: "/" },
  ];

  return (
    <footer className="bg-gradient-to-b from-[#1a1a2e] to-[#0f1419] border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-4xl text-white">
              Kuro<span className="text-purple-800 text-5xl">X</span>
            </h3>
            <p className="text-gray-400 text-sm">
              Your ultimate destination for discovering anime and manga. Stay
              updated with the latest releases and top-rated content.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <Link
                  key={i}
                  href={social.href}
                  className="text-gray-400 hover:text-purple-400 transition"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-200 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-cyan-400 transition text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold text-gray-200 mb-4">
              Categories
            </h4>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className="text-gray-400 hover:text-purple-400 transition text-sm"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-gray-200 mb-4">
              Support
            </h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-cyan-400 transition text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} kuroX. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>Made with</span>
              <FaHeart className="text-red-500 animate-pulse" />
              <span>by anime fans</span>
            </div>
            <p className="text-gray-500 text-xs">
              Powered by <Link href="https://docs.api.jikan.moe/" className="text-purple-400">Jikan API</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
