import Link from "next/link";
import { checkDbStatus } from "@/lib/checkDbStatus";
import Notice from "@/components/Notice"

const categories = [
  {
    name: "Cartoons",
    category: "cartoons",
  },
  {
    name: "Games",
    category: "games",
  },
  {
    name: "Music",
    category: "music",
  },
  {
    name: "Sports",
    category: "sports",
  },
  {name: "History", category: "history", },
  {name: "Anime", category: "anime",},
  {
    name: "Geography", category: "geography",
   }
];

export default async function Home() {
  const db = await checkDbStatus();

  if (!db.ok) {
    return <Notice />
  }

  return (
  <div className="min-h-screen bg-gray-950 text-white py-8 px-4 sm:px-8 md:px-16 relative">
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-green-400 my-10 text-center">
      {"<Gu3ss/>"}
    </h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
      {categories.map((c) => (
        <Link
  href={`/category/${c.category}`}
  key={c.category}
  className="
    bg-gray-900/80 border border-gray-800 rounded-xl p-4 sm:p-6
    hover:bg-gray-800 transition-all cursor-pointer
    text-center text-lg sm:text-xl font-semibold
    group active:text-green-400
  "
>
  <span className="inline-flex items-center justify-center gap-1">
    {c.name}
    <span
      className="
        inline-block transform transition-transform duration-200
        group-hover:translate-x-1
      "
    >
      →
    </span>
  </span>
</Link>

      ))}
    </div>

    {/* <StickerBar images={activeImages} /> */}
  </div>
);
}
