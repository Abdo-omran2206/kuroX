import Image from "next/image";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
export interface BannerProps {
  mal_id: number;
  title: string;
  genres: { name: string }[];
  score: number;
  synopsis?: string;
  year?: number;
  episodes?: number;
  images: {
    jpg: {
      large_image_url: string;
    };
  };
}
export default function AnimeCard({ anime }: { anime: BannerProps }) {
  return (
    <Link
      href={`/anime/animeDetails/${anime.mal_id}`}
      className="relative block w-[280px] h-[400px] rounded-xl shadow-2xl hover:-translate-y-3 transform transition-all duration-500 ease-out overflow-hidden group cursor-pointer"
    >
      <Image
        src={anime.images.jpg.large_image_url}
        alt={anime.title}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-500 brightness-90 group-hover:brightness-100"
      />

      <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 transition-all duration-300 group-hover:border-purple-500/50">
        <FaStar className="text-yellow-400 text-xs" />
        <span className="text-white font-bold text-xs">
          {anime.score ?? "N/A"}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black via-black/80 to-transparent pt-32 pb-5 px-5 transition-all duration-300">
        <h3 className="text-white text-lg font-heading font-bold line-clamp-2 mb-1 group-hover:text-purple-400 transition-colors duration-300">
          {anime.title}
        </h3>
        <div className="overflow-hidden">
          <p className="text-zinc-400 text-xs line-clamp-1 translate-y-0 group-hover:text-zinc-300 transition-all duration-300">
            {anime.genres
              ?.slice(0, 3)
              .map((genre) => genre.name)
              .join(", ") || "No genres"}
          </p>
        </div>
      </div>
    </Link>
  );
}
