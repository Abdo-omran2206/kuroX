"use client";

import { fetchAnimeByCategory } from "@/app/api/jikan";
import { Footer } from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import AnimeCard from "@/app/components/AnimeCard";
import { FaBackward, FaForward } from "react-icons/fa";
import LoadingModel from "@/app/components/Loading";

export default function Page() {
  const { path } = useParams(); // e.g., "top-anime" | "seasonal" | "trending"
  const [animeData, setAnimeData] = useState<any[]>([]);
  const [visiblePages, setVisiblePages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      let category: "top" | "seasonal" | "genres" | "trending" = "top";

      // Map URL path to category
      switch (path) {
        case "top-anime":
          category = "top";
          break;
        case "seasonal":
          category = "seasonal";
          break;
        case "trending":
          category = "trending";
          break;
        case "genres":
          category = "genres";
          break;
      }

      const { animeList, lastPage } = await fetchAnimeByCategory(
        category,
        currentPage,
        25,
      );
      setAnimeData(animeList);
      setVisiblePages(lastPage);
      setLoading(false)
    }

    fetchData();
  }, [path,currentPage]);

  if (loading) {
      return (
        <>
          <Navbar />
          <div className="py-20 min-h-screen container mx-auto px-4">
            <LoadingModel />
          </div>
          <Footer />
        </>
      );
    }

  return (
    <>
      <Navbar />
      <div className="min-h-screen px-4 py-10">
        <div className="mb-5 w-full text-center flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-3 text-white">{path}</h1>
          <span className="block h-1 w-30 bg-purple-600 rounded-full mb-8"></span>
        </div>

        {animeData.length > 0 && (
          <div className="flex flex-wrap justify-center gap-5">
            {animeData.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
          </div>
        )}

        <span className="block h-1 w-full bg-purple-800 mt-8 rounded-full"></span>

        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            className="px-4 py-2 rounded-md bg-purple-700 text-white
                       disabled:opacity-40 disabled:cursor-not-allowed
                       hover:bg-purple-600 transition"
            onClick={() => {
              setCurrentPage((p) => Math.max(1, p - 1));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            disabled={currentPage === 1}
          >
            <FaBackward />
          </button>

          <span className="px-4 py-2 text-lg font-semibold">
            {currentPage}/{visiblePages}
          </span>

          <button
            className="px-4 py-2 rounded-md bg-purple-700 text-white
                       disabled:opacity-40 disabled:cursor-not-allowed
                       hover:bg-purple-600 transition"
            onClick={() => {
              setCurrentPage((p) => Math.min(visiblePages, p + 1));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            disabled={currentPage === visiblePages}
          >
            <FaForward />
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
