"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import { getDataBySection } from "./api/jikan";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import {
  FaStar,
  FaInfoCircle,
  FaClock,
  FaTrophy,
  FaPlayCircle,
  FaFire,
  FaCalendarAlt,
  FaBook,
} from "react-icons/fa";
import { Footer } from "./components/Footer";
import AnimeCard, { BannerProps } from "./components/AnimeCard";

const sections = [
  // { id: "top-anime", title: "Top Anime", icon: FaStar },
  { id: "airing-anime", title: "Currently Airing", icon: FaPlayCircle },
  { id: "seasonal-anime", title: "This Season", icon: FaCalendarAlt },
  { id: "upcoming-anime", title: "Upcoming Anime", icon: FaClock },
  { id: "popular-anime", title: "Most Popular", icon: FaFire },
  { id: "best-anime", title: "Best Anime", icon: FaTrophy },
  // { id: "top-manga", title: "Top Manga", icon: FaBook },
];

export default function Home() {
  const [bannerAnime, setBannerAnime] = useState<BannerProps[]>([]);
  const [sectionData, setSectionData] = useState<Record<string, BannerProps[]>>(
    {},
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const topAnime = await getDataBySection("top-anime", 1, 10);
        setBannerAnime(topAnime);

        for (const section of sections) {
          const data = await getDataBySection(section.id, 1, 20);
          setSectionData((prev) => ({ ...prev, [section.id]: data }));
          // Staggered fetch to avoid rate limits (3 requests per second limit)
          await new Promise((resolve) => setTimeout(resolve, 400));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#0B0D12] font-body">
      <Navbar />
      <header className="w-full">
        {bannerAnime.length > 0 ? (
          <Banner topAnime={bannerAnime} />
        ) : (
          <div className="w-full h-screen bg-[#0B0D12] flex items-center justify-center overflow-hidden">
            <div className="relative flex flex-col items-center">
              <div className="absolute inset-0 -m-8 rounded-full border-4 border-purple-600/10 animate-ping"></div>
              <h1 className="text-6xl md:text-8xl font-heading font-black text-white/20">
                KuroX
              </h1>
              <p className="mt-4 text-zinc-700 font-bold uppercase tracking-widest text-xs animate-pulse">
                Summoning Stars...
              </p>
            </div>
          </div>
        )}
      </header>

      <main className="min-h-screen pb-16">
        {sections.map((section) => (
          <section key={section.id} className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-6">
              <section.icon className="text-purple-600 mr-2 text-4xl" />
              <h2 className="text-2xl md:text-3xl font-bold font-heading text-white">
                {section.title}
              </h2>
              <hr className="flex-1 border-gray-700 ml-4" />
            </div>

            <div className="relative">
              {!sectionData[section.id] ? (
                /* Skeleton Loader */
                <div className="flex gap-6 overflow-hidden pb-4">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="flex-none w-[280px] h-[400px] bg-white/5 rounded-xl border border-white/10 animate-pulse"
                    >
                      <div className="w-full h-full bg-white/5"></div>
                      <div className="p-4 space-y-2">
                        <div className="h-4 bg-white/10 rounded w-3/4"></div>
                        <div className="h-3 bg-white/10 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "#374151 transparent",
                  }}
                >
                  {sectionData[section.id].length > 0 ? (
                    sectionData[section.id].map((anime) => (
                      <div key={anime.mal_id} className="flex-none">
                        <AnimeCard anime={anime} />
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400">No data available</p>
                  )}
                </div>
              )}
            </div>
          </section>
        ))}
      </main>

      <Footer />
    </div>
  );
}

function Banner({ topAnime }: { topAnime: BannerProps[] }) {
  if (!topAnime || topAnime.length === 0) {
    return (
      <div className="w-full h-screen bg-gradient-to-b from-gray-900 to-[#0B0D12] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          <p className="text-white">Loading banner...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet !bg-white !opacity-50",
          bulletActiveClass: "swiper-pagination-bullet-active !opacity-100",
        }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        effect="fade"
        loop={true}
        className="w-full h-full"
      >
        {topAnime.map((anime) => (
          <SwiperSlide key={anime.mal_id}>
            <div className="relative w-full h-full">
              <Image
                src={anime.images.jpg.large_image_url}
                alt={anime.title}
                fill
                className="object-cover"
                priority={true}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12] via-black/70 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />

              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4 md:px-8 lg:px-16">
                  <div className="max-w-2xl space-y-4">
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      {anime.score && (
                        <div className="flex items-center gap-1 bg-yellow-500/20 px-3 py-1 rounded-full">
                          <FaStar className="text-yellow-400" />
                          <span className="font-bold text-yellow-400">
                            {anime.score}
                          </span>
                        </div>
                      )}
                      {anime.year && (
                        <span className="bg-white/10 px-3 py-1 rounded-full">
                          {anime.year}
                        </span>
                      )}
                      {anime.episodes && (
                        <span className="bg-white/10 px-3 py-1 rounded-full">
                          {anime.episodes} Episodes
                        </span>
                      )}
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight">
                      {anime.title}
                    </h1>

                    {anime.genres && anime.genres.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {anime.genres.slice(0, 4).map((genre) => (
                          <span
                            key={genre.name}
                            className="text-xs md:text-sm px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-gray-200"
                          >
                            {genre.name}
                          </span>
                        ))}
                      </div>
                    )}

                    {anime.synopsis && (
                      <p className="text-gray-300 text-sm md:text-base line-clamp-3 max-w-xl">
                        {anime.synopsis}
                      </p>
                    )}

                    <div className="flex gap-4 pt-4">
                      <Link
                        href={`/anime/animeDetails/${anime.mal_id}`}
                        className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition"
                      >
                        <FaInfoCircle />
                        More Info
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
