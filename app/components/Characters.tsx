"use client";
import Image from "next/image";
interface CharactersSectionProps {
  characters?: {
    character: {
      mal_id: number;
      name: string;
      images: {
        jpg: {
          image_url: string | null;
        };
      };
    };
    role: string;
    voice_actors: {
      person: {
        mal_id: number;
        name: string;
        images: {
          jpg: {
            image_url: string | null;
          };
        };
      };
      language: string;
    }[];
  }[];
}

export default function CharactersSection({
  characters,
}: CharactersSectionProps) {
  if (!characters || characters.length === 0) {
    return (
      <div className="text-gray-400">No character information available.</div>
    );
  }
  return (
    <section className="mt-1">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span className="w-1 h-6 bg-cyan-600 rounded-full" />
        Characters & Voice Actors
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {characters.slice(0, 9).map((item) => (
          <CharacterCard key={item.character.mal_id} item={item} />
        ))}

        {characters.length > 5 && (
          <button
            onClick={() => console.log("Show more clicked")} // أو router.push / modal
            className="flex items-center justify-center rounded-xl border border-dashed border-gray-500 
                 text-white hover:bg-gray-800 transition"
          >
            <span className="text-lg font-semibold">+ Show More</span>
          </button>
        )}
      </div>
    </section>
  );
}

export function CharacterCard({ item }: { item: any }) {
  return (
    <>
      <div
        key={item.character.mal_id}
        className="bg-zinc-900 rounded-lg overflow-hidden hover:scale-105 transition-transform"
      >
        {/* Character Image */}
        <Image
          src={item.character.images.jpg.image_url || "/placeholder.jpg"}
          alt={item.character.name}
          className="w-full h-56 object-cover"
          width={200}
          height={224}
        />

        {/* Info */}
        <div className="p-3">
          <h3 className="font-semibold text-sm truncate">
            {item.character.name}
          </h3>
          <p className="text-xs text-purple-400">{item.role}</p>

          {/* Voice Actor */}
          {item.voice_actors[0] && (
            <div className="flex items-center gap-2 mt-2">
              <Image
                src={
                  item.voice_actors[0].person.images.jpg.image_url ||
                  "/placeholder.jpg"
                }
                alt={item.voice_actors[0].person.name}
                className="w-8 h-8 rounded-full object-cover"
                width={200}
                height={224}
              />
              <div>
                <p className="text-xs">{item.voice_actors[0].person.name}</p>
                <p className="text-[10px] text-gray-400">
                  {item.voice_actors[0].language}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
