"use client";

import Navbar from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchAnime } from "../api/jikan";
import AnimeCard, { BannerProps } from "../components/AnimeCard";
import { FaBackward, FaForward } from "react-icons/fa";
import LoadingModel from "../components/Loading";

export const dynamic = 'force-dynamic';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.trim();

  const [animeResults, setAnimeResults] = useState<BannerProps[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [visiblePages, setVisiblePages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!query) return;

    async function searchAnimeData() {
      try {
        setIsLoading(true);
        const response = await searchAnime(query as string, pageNumber);

        setAnimeResults(response.data);
        setVisiblePages(response.pagination.last_visible_page);

        const pageTitle = query || "Anime";
        document.title = `${pageTitle} — Page ${pageNumber} | KuroX`;
      } catch (error) {
        console.error("Error fetching anime:", error);
      } finally {
        setIsLoading(false);
      }
    }

    searchAnimeData();
  }, [query, pageNumber]);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center py-20">
          <LoadingModel />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen px-4 py-10 flex flex-col items-center">
        {query ? (
          <section className="w-full max-w-7xl flex flex-col items-center">
            {/* Title */}
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold text-white">
                Search results for:{" "}
                <span className="text-purple-500">{query}</span>
              </h1>
              <span className="block h-1 w-32 bg-purple-800 rounded-full mt-4 mx-auto"></span>
            </div>

            {/* Results Flex */}
            {animeResults.length > 0 ? (
              <div className="flex flex-wrap justify-center gap-6 w-full">
                {animeResults.map((anime) => (
                  <AnimeCard key={anime.mal_id} anime={anime} />
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center mt-10">
                No results found for &quot;{query}&quot;
              </p>
            )}

            {/* Pagination */}
            {animeResults.length > 0 && (
              <div className="flex items-center justify-center gap-4 mt-10">
                <button
                  className="px-4 py-2 rounded-md bg-purple-700 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-purple-600 transition"
                  onClick={() => {
                    setPageNumber((p) => Math.max(1, p - 1));
                    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
                  }}
                  disabled={pageNumber === 1}
                >
                  <FaBackward />
                </button>

                <span className="px-4 py-2 text-lg font-semibold text-white">
                  {pageNumber} / {visiblePages}
                </span>

                <button
                  className="px-4 py-2 rounded-md bg-purple-700 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-purple-600 transition"
                  onClick={() => {
                    setPageNumber((p) => Math.min(visiblePages, p + 1));
                    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
                  }}
                  disabled={pageNumber === visiblePages}
                >
                  <FaForward />
                </button>
              </div>
            )}
          </section>
        ) : (
          <p className="text-gray-400 text-center mt-20">
            No search query provided
          </p>
        )}
      </main>
      <Footer />
    </>
  );
}
