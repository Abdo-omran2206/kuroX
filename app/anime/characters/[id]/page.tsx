"use client";

import { getAnimeCharacters } from "@/app/api/jikan";
import { CharacterCard } from "@/app/components/Characters";
import { Footer } from "@/app/components/Footer";
import LoadingModel from "@/app/components/Loading";
import Navbar from "@/app/components/Navbar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CharactersSectionProps } from "@/app/components/Characters";

export default function CharacterDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [characters, setCharacters] = useState<CharactersSectionProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchCharacters = async () => {
      try {
        const data = await getAnimeCharacters(id);
        setCharacters(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [id]);

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

      <div className="py-15 min-h-screen container mx-auto px-4">
        <div className="mb-5 w-full text-center flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-3 text-white">Characters</h1>
          <span className="block h-1 w-30 bg-purple-600 rounded-full mb-8"></span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {characters.length === 0 && (
            <div className="text-gray-400">
              No character information available.
            </div>
          )}
          {characters.map((characters) => (
            <CharacterCard
              key={characters.characters?.[0]?.character.mal_id}
              item={characters}
            />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
