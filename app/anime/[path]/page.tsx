"use client";

import { fetchAnimeByCategory, fetchGenres } from "@/app/api/jikan";
import Navbar from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import AnimeCard from "@/app/components/AnimeCard";
import LoadingModel from "@/app/components/Loading";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FaBackward, FaForward } from "react-icons/fa";

/* ===================== */
/* PAGE                  */
/* ===================== */

export default function Page() {
  const { path } = useParams<{ path: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const genreId = searchParams.get("genre");
  const pageParam = Number(searchParams.get("page") || 1);

  const [animeData, setAnimeData] = useState<any[]>([]);
  const [visiblePages, setVisiblePages] = useState(1);
  const [loading, setLoading] = useState(true);

  /* ===================== */
  /* CATEGORY MAP          */
  /* ===================== */

  const category = useMemo<"top" | "seasonal" | "genres" | "trending">(() => {
    switch (path) {
      case "top-anime":
        return "top";
      case "seasonal":
        return "seasonal";
      case "trending":
        return "trending";
      case "genres":
        return "genres";
      default:
        return "top";
    }
  }, [path]);

  /* ===================== */
  /* FETCH DATA            */
  /* ===================== */

  useEffect(() => {
    async function fetchData() {
      // genres بدون genreId → اعرض genres فقط
      if (category === "genres" && !genreId) {
        setLoading(false);
        return;
      }

      setLoading(true);

      const { animeList, lastPage } = await fetchAnimeByCategory(
        category,
        pageParam,
        25,
        {
          genreId: genreId ? Number(genreId) : undefined,
        },
      );

      setAnimeData(animeList);
      setVisiblePages(lastPage);
      setLoading(false);
    }

    fetchData();
  }, [category, genreId, pageParam]);

  /* ===================== */
  /* UPDATE PAGE PARAM     */
  /* ===================== */

  function updatePage(newPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));

    router.replace(`?${params.toString()}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ===================== */
  /* LOADING               */
  /* ===================== */

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

  /* ===================== */
  /* RENDER                */
  /* ===================== */

  return (
    <>
      <Navbar />

      <div className="min-h-screen px-4 py-10">
        {category === "genres" && !genreId ? (
          <GenresView />
        ) : (
          <>
            <PageTitle title={category === "genres" ? "Genre Anime" : path} />

            {/* Anime List */}
            <div className="flex min-w-full flex-wrap justify-center items-center gap-5">
              {animeData.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={pageParam}
              visiblePages={visiblePages}
              onChange={updatePage}
            />
          </>
        )}
      </div>

      <Footer />
    </>
  );
}

/* ===================== */
/* GENRES VIEW            */
/* ===================== */

function GenresView() {
  const [genres, setGenres] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadGenres() {
      const data = await fetchGenres();
      setGenres(data);
      setLoading(false);
    }

    loadGenres();
  }, []);

  if (loading) return <LoadingModel />;

  return (
    <>
      <PageTitle title="Genres" />

      <div className="flex flex-wrap justify-center gap-4">
        {genres.map((genre) => (
          <button
            key={genre.mal_id}
            onClick={() =>
              router.push(`/anime/genres?genre=${genre.mal_id}&page=1`)
            }
            className="px-5 py-2 rounded-full
                       bg-purple-700/80 text-white
                       hover:bg-purple-600 transition"
          >
            {genre.name}
            <span className="ml-2 text-sm opacity-70">({genre.count})</span>
          </button>
        ))}
      </div>
    </>
  );
}

/* ===================== */
/* PAGINATION             */
/* ===================== */

function Pagination({
  currentPage,
  visiblePages,
  onChange,
}: {
  currentPage: number;
  visiblePages: number;
  onChange: (page: number) => void;
}) {
  return (
    <>
      <span className="block h-1 w-full bg-purple-800 mt-8 rounded-full"></span>

      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => {
            onChange(currentPage - 1);
            window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
          }}
          className="px-4 py-2 rounded-md bg-purple-700 text-white
                     disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <FaBackward />
        </button>

        <span className="px-4 py-2 text-lg font-semibold">
          {currentPage}/{visiblePages}
        </span>

        <button
          disabled={currentPage === visiblePages}
          onClick={() => {
            onChange(currentPage + 1);
            window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
          }}
          className="px-4 py-2 rounded-md bg-purple-700 text-white
                     disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <FaForward />
        </button>
      </div>
    </>
  );
}

/* ===================== */
/* TITLE                  */
/* ===================== */

function PageTitle({ title }: { title: string }) {
  return (
    <div className="mb-5 w-full text-center flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-3 text-white">{title}</h1>
      <span className="block h-1 w-30 bg-purple-600 rounded-full mb-8"></span>
    </div>
  );
}
