import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const handleClick = () => {
    router.push(`/anime/animeDetails/${anime.mal_id}`);
  };
  return (
    <div
      onClick={handleClick}
      className="relative w-[300px] h-[450px] rounded-xl shadow-2xl hover:-translate-y-3 transform transition-all duration-500 ease-out overflow-hidden group cursor-pointer"
    >
      <Image
        src={anime.images.jpg.large_image_url}
        alt={`${anime.title} cover art`}
        width={280}
        height={420}
        className="w-full h-[420px] object-cover group-hover:scale-110 transition-transform duration-500"
      />

      <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg">
        <FaStar className="text-cyan-400 text-xs" />
        <span className="text-white font-bold text-sm">
          {anime.score ?? "N/A"}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black via-black/95 to-transparent pt-24 pb-4 px-4 group-hover:pt-32 transition-all duration-300">
        <h3 className="text-white text-lg font-heading font-semibold line-clamp-2 mb-1 group-hover:text-purple-500 transition-colors">
          {anime.title}
        </h3>
        <p className="text-gray-400 text-xs line-clamp-1">
          {anime.genres?.map((genre) => genre.name).join(", ") || "No genres"}
        </p>
      </div>
    </div>
  );
}
