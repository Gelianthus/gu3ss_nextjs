import Image from "next/image";
import { use } from "react";

const quizzes = [
  {
    id: "taylor-swift",
    title: "Taylor Swift Songs",
    description: "Guess the song from your favorite albums!",
    image: "/quiz-images/taylor.jpg",
  },
  {
    id: "bruno-mars",
    title: "Bruno Mars Hits",
    description: "Can you guess these iconic Bruno Mars tracks?",
    image: "/quiz-images/bruno.jpg",
  },
  {
    id: "pop-legends",
    title: "Pop Music Legends",
    description: "A mixed challenge featuring top pop artists.",
    image: "/quiz-images/pop.jpg",
  },
];

export default function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params);
  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-400">Gu3ss</h1>
        <p className="text-lg text-gray-400 mt-2 capitalize">
          {category}
        </p>
      </div>

      {/* Quiz List */}
      <div className="flex flex-col gap-6 max-w-3xl mx-auto">
        {quizzes.map((quiz) => (
          <a
            key={quiz.id}
            href={`/quiz/${quiz.id}`}
            className="
              flex justify-between items-center gap-4
              bg-gray-900/80 border border-gray-800 rounded-xl
              p-5 hover:bg-gray-800 transition-colors
            "
          >
            {/* Left: Title + description */}
            <div className="flex-1">
              <h2 className="text-2xl font-semibold">{quiz.title}</h2>
              <p className="text-gray-400 mt-1 text-sm max-w-md">
                {quiz.description}
              </p>
            </div>

            {/* Right: Square Image */}
            <div className="w-24 h-24 relative rounded-md overflow-hidden shrink-0">
              <Image
                src={quiz.image}
                alt={quiz.title}
                fill
                className="object-cover"
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
