"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

import {
  getAnimeById,
  getAnimeCharacters,
  getAnimeRecommendations,
} from "@/app/api/jikan";
import Navbar from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import CharactersSection from "@/app/components/Characters";
import Link from "next/link";

/* ================= TYPES ================= */

export interface AnimeDetailsPageProps {
  data: {
    mal_id: number;
    url: string;
    title: string;
    title_english: string | null;
    title_japanese: string | null;
    title_synonyms: string[];
    characters?: any[];
    type: string | null;
    source: string | null;
    episodes: number | null;
    status: string | null;
    airing: boolean;

    aired: {
      from: string | null;
      to: string | null;
      string: string | null;
    };

    duration: string | null;
    rating: string | null;

    score: number | null;
    scored_by: number | null;
    rank: number | null;
    popularity: number | null;
    members: number | null;
    favorites: number | null;
    recommendations?: any[];
    synopsis: string | null;
    background: string | null;

    season: string | null;
    year: number | null;

    producers: { mal_id: number; name: string }[];
    studios: { mal_id: number; name: string }[];
    licensors: { mal_id: number; name: string }[];
    genres: { mal_id: number; name: string }[];
    themes: { mal_id: number; name: string }[];

    images: {
      jpg: {
        image_url: string | null;
        large_image_url: string | null;
      };
    };

    trailer: {
      youtube_id: string | null;
      embed_url: string | null;
    } | null;
  };
}

type AnimeDetails = AnimeDetailsPageProps["data"];

/* ================= PAGE ================= */

export default function AnimeDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const [animeDetails, setAnimeDetails] = useState<AnimeDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [openTrailer, setOpenTrailer] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function fetchAnime() {
      try {
        const data = await getAnimeById(Number(id));
        const characters = await getAnimeCharacters(Number(id));
        const recommendations = await getAnimeRecommendations(Number(id));
        setAnimeDetails({ ...data, characters, recommendations });
        console.log({ ...data, characters, recommendations });
      } catch (error) {
        console.error("Failed to fetch anime:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAnime();
  }, [id]);

  if (loading || !animeDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-black text-white">
      <Navbar />

      {/* ================= HERO ================= */}
      <header className="relative h-[700px] w-full overflow-hidden">
        <Image
          src={animeDetails.images.jpg.large_image_url || "/placeholder.jpg"}
          alt={animeDetails.title}
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8 flex gap-8 h-screen items-center">
          {/* Poster */}
          <Image
            src={animeDetails.images.jpg.large_image_url || "/placeholder.jpg"}
            alt={animeDetails.title}
            width={350}
            height={450}
            className="rounded-lg shadow-xl hover:scale-105 transition-transform shadow-black/50 hover:shadow-black duration-200 "
          />

          {/* Info */}
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold">{animeDetails.title}</h1>
            {animeDetails.title_japanese && (
              <p className="text-gray-300 mt-1">
                {animeDetails.title_japanese}
              </p>
            )}

            {/* Meta */}
            <div className="flex flex-wrap gap-3 mt-4">
              {animeDetails.type && <Badge text={animeDetails.type} />}
              {animeDetails.episodes && (
                <Badge text={`${animeDetails.episodes} Episodes`} />
              )}
              {animeDetails.status && <Badge text={animeDetails.status} />}
              {animeDetails.score && (
                <Badge>
                  {animeDetails.score}
                  <FaStar className="text-yellow-400 ml-1" />
                </Badge>
              )}
            </div>

            {/* Genres */}
            <div className="mt-4 flex flex-wrap gap-2">
              {animeDetails.genres.map((genre) => (
                <span
                  key={genre.mal_id}
                  className="px-3 py-1 rounded-full bg-cyan-600/30 border border-cyan-500 text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Synopsis */}
            {animeDetails.synopsis && (
              <p className="mt-6 text-gray-200 leading-relaxed">
                {animeDetails.synopsis}
              </p>
            )}
            {animeDetails.trailer && (
              <button
                onClick={() => setOpenTrailer(true)}
                className="mt-4 px-6 py-2 bg-purple-700 hover:bg-purple-600 rounded-lg transition-colors flex items-center gap-2"
              >
                ▶ Watch Trailer
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ================= TRAILER MODAL ================= */}
      {openTrailer && (
        <div
          onClick={() => setOpenTrailer(false)}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
        >
          <div className="relative w-full max-w-4xl">
            {/* Close Button */}
            <button
              onClick={() => setOpenTrailer(false)}
              className="absolute -top-10 right-0 text-white text-3xl hover:text-red-500 transition"
            >
              ×
            </button>

            <TrailerViewer
              embedUrl={
                animeDetails.trailer?.embed_url
                  ? `${animeDetails.trailer.embed_url}?autoplay=1`
                  : null
              }
              youtubeId={animeDetails.trailer?.youtube_id}
            />
          </div>
        </div>
      )}

      {/* ================= EXTRA INFO ================= */}
      <main className="flex-col justify-around mx-auto p-8 gap-10 ">
        <section className="flex gap-10">
          <div className="flex-2 space-y-6">
            <CharactersSection characters={animeDetails.characters} />
          </div>
          <div className="flex-1 space-y-3">
            <Info label="Aired" value={animeDetails.aired.string} />
            <Info label="Duration" value={animeDetails.duration} />
            <Info label="Rating" value={animeDetails.rating} />
            <Info
              label="Studios"
              value={animeDetails.studios.map((s) => s.name).join(", ")}
            />
            <Info
              label="Producers"
              value={animeDetails.producers.map((p) => p.name).join(", ")}
            />
            <Info
              label="Licensors"
              value={animeDetails.licensors.map((l) => l.name).join(", ")}
            />
            <Info
              label="Season & Source"
              value={`${animeDetails.season || "Unknown"}, ${animeDetails.source || "Unknown"}`}
            />
          </div>
        </section>

        <div className="mt-16">
          <h2>Recommendations</h2>
          {/* Recommendations component can be added here */}
          {animeDetails.recommendations &&
          animeDetails.recommendations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
              {animeDetails.recommendations.map((rec: any) => (
                <RecommendationsCard key={rec.entry.mal_id} data={rec} />
              ))}
            </div>
          ) : (
            <p className="text-gray-400 mt-6">No recommendations available.</p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* ================= COMPONENTS ================= */

interface TrailerViewerProps {
  embedUrl?: string | null;
  youtubeId?: string | null;
}

interface RecommendationsCardProps {
  data: {
    entry: {
      mal_id: number;
      title: string;
      images: {
        jpg: {
          image_url: string | null;
          large_image_url: string | null;
        };
      };
      url: string;
    };
    votes?: number;
  };
}

function TrailerViewer({ embedUrl, youtubeId }: TrailerViewerProps) {
  const finalUrl =
    embedUrl ||
    (youtubeId ? `https://www.youtube.com/embed/${youtubeId}` : null);

  if (!finalUrl) {
    return (
      <div className="w-full h-96 bg-gray-800 rounded-lg flex items-center justify-center">
        <p className="text-gray-400">No trailer available 🎬</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-2xl bg-black ">
      <iframe
        src={finalUrl}
        title="Anime Trailer"
        className="w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

function Badge({
  children,
  text,
}: {
  children?: React.ReactNode;
  text?: string;
}) {
  return (
    <span className="px-4 py-1 rounded-full bg-purple-700/30 border border-purple-500 flex items-center gap-1">
      {text}
      {children}
    </span>
  );
}

function Info({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;

  return (
    <div className="bg-zinc-900 p-4 rounded-lg">
      <h4 className="text-sm text-gray-400">{label}</h4>
      <p className="mt-1">{value}</p>
    </div>
  );
}

export function RecommendationsCard({ data }: RecommendationsCardProps) {
  const anime = data.entry;

  return (
    <Link
      href={`/anime/animeDetails/${anime.mal_id}`}
      className="group bg-zinc-900 rounded-xl overflow-hidden shadow-lg 
                 hover:scale-[1.03] transition-transform duration-300"
    >
      {/* Image */}
      <div className="relative w-full h-[260px]">
        <Image
          src={anime.images.jpg.large_image_url || "/placeholder.jpg"}
          alt={anime.title}
          fill
          className="object-cover group-hover:brightness-110 transition"
        />
      </div>

      {/* Info */}
      <div className="p-4 space-y-2">
        <h3 className="text-white font-semibold line-clamp-2">
          {anime.title}
        </h3>

        {data.votes && (
          <p className="text-sm text-gray-400">
            👍 {data.votes} users recommend this
          </p>
        )}
      </div>
    </Link>
  );
}
