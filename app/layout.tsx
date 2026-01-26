import type { Metadata } from "next";
import { Racing_Sans_One, Noto_Sans } from "next/font/google";
import "./globals.css";

// فونت العناوين
const racingSans = Racing_Sans_One({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: "400",
  display: "swap",
});

// فونت النصوص
const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "kuroX | Discover Your Next Favorite Anime",
  description:
    "Explore the ultimate anime universe with kuroX. Track seasonal hits, top-rated series, and discover your next obsession.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${racingSans.variable} 
          ${notoSans.variable} 
          antialiased bg-black text-white
        `}
      >
        {children}
      </body>
    </html>
  );
}
