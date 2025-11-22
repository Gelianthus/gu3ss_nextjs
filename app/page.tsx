"use client";

import { useState } from "react";
import Link from "next/link";
import StickerBar from "@/components/StickerBar";

const categories = [
  {
    name: "Cartoons",
    category: "cartoons",
    images: [
      "/images/Finn.webp",
      "/images/Tom.webp",
      "images/Morty.png",
       "/images/SpongeBob.png",
    ],
  },
  {
    name: "Games",
    category: "games",
    images: [
      "/images/Steve.png",
      "/images/Juggernaut.png",
      "/images/Terrorist.webp",
      "/images/Lars.webp",
    ],
  },
  {
    name: "Music",
    category: "music",
    images: [
      "/images/TaylorSwift.png",
      "/images/QueenBand.png",
      "/images/Eminem.png",
      "/images/MichaelJackson.png",
    ],
  },
  {
    name: "Sports",
    category: "sports",
    images: [
      "/images/Pacman.png",
      "/images/Phelps.png",
      "/images/Jordan.png",
    ],
  },
  {name: "History", category: "history", images: ["/images/einstein.avif",
      "/images/davinci.png",
    ]
  },
  {name: "Anime", category: "anime", images: [
    "/images/naruto.webp",
    "/images/ichigo.png",
    "/images/luffy.png",]
  },
  {
    name: "Geography", category: "geography",
     images: [
      "/images/earth.png",
    ],
   }
];

export default function Home() {
  const [activeImages, setActiveImages] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-gray-950 text-white py-8 px-16 relative">
      <h1 className="text-6xl font-bold text-green-400 my-10 text-center">Gu3ss</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((c) => (
          <Link
            href={`/category/${c.category}`}
            key={c.category}
            onMouseEnter={() => setActiveImages(c.images)}
            onMouseLeave={() => setActiveImages([])}
            className="
              bg-gray-900/80 border border-gray-800 rounded-xl p-6
              hover:bg-gray-800 transition-all cursor-pointer
              text-center text-xl font-semibold
            "
          >
            {c.name}
          </Link>
        ))}
      </div>

      <StickerBar images={activeImages} />
    </div>
  );
}
