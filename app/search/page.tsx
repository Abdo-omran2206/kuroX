"use client";

import Navbar from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchAnime } from "../api/jikan";
import AnimeCard, { BannerProps } from "../components/AnimeCard";
import { FaBackward, FaForward } from "react-icons/fa";
import LoadingModel from "../components/Loading";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.trim();
  const [animeResults, setAnimeResults] = useState<BannerProps[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [visiblePages, setVisiblePages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (query) {
      async function searchAnimeData(query: string) {
        try {
          const response = await searchAnime(query, pageNumber);
          setAnimeResults(response.data);
          setVisiblePages(response.pagination.last_visible_page);
          const pageTitle = query?.trim() || "Anime";
          const page = pageNumber ?? 1;

          document.title = `${pageTitle} — Page ${page} | KuroX`;

          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching anime:", error);
        }
      }
      searchAnimeData(query);
    }
  }, [query, pageNumber]);

  if (isLoading) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen flex flex-col items-center justify-center text-white space-y-4">
          <LoadingModel />
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen flex flex-col items-center justify-center">
        {query ? (
          <div className="text-2xl font-bold py-10 ">
            <h1 className="mb-6 text-white text-4xl text-center">
              Search results for: {query}
            </h1>
            <span className="block h-1 w-full bg-purple-800 mb-8"></span>
            {animeResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {animeResults.map((anime) => (
                  <AnimeCard key={anime.mal_id} anime={anime} />
                ))}
              </div>
            ) : null}
            <span className="block h-1 w-full bg-purple-800 mt-8 rounded-full"></span>

            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                className="px-4 py-2 rounded-md bg-purple-700 text-white
               disabled:opacity-40 disabled:cursor-not-allowed
               hover:bg-purple-600 transition"
                onClick={() => {
                  setPageNumber((p) => Math.max(1, p - 1));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                disabled={pageNumber === 1}
              >
                <FaBackward />
              </button>

              <span className="px-4 py-2 text-lg font-semibold">
                {pageNumber}/{visiblePages}
              </span>

              <button
                className="px-4 py-2 rounded-md bg-purple-700 text-white
               disabled:opacity-40 disabled:cursor-not-allowed
               hover:bg-purple-600 transition"
                onClick={() => {
                  setPageNumber((p) => Math.min(visiblePages, p + 1));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                disabled={pageNumber === visiblePages}
              >
                <FaForward />
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-400">No search query provided</p>
        )}
      </main>

      <Footer />
    </>
  );
}
