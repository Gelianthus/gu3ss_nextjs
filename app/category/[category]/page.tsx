import Image from "next/image";
import prisma from "@/lib/prisma";
import GoBackButton from "@/components/GoBackButton";
import { checkDbStatus } from "@/lib/checkDbStatus";
import Notice from "@/components/Notice";
import LeaderboardButton from "@/components/LeaderboardButton";

interface PageProps {
  params: {
    category: string;
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const db = await checkDbStatus();
  if (!db.ok) {
    return <Notice />;
  }

  const { category } = await params;
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);

  const quizzes = await prisma.quiz.findMany({
    where: {
      category: {
        name: formattedCategory,
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 sm:px-6 py-8 sm:py-12">
      <div className="flex flex-col items-center mb-10">
        <div className="self-start mb-4">
          <GoBackButton to="/" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-green-400 text-center">{"<Gu3ss/>"}</h1>
        <p className="text-base sm:text-lg text-gray-400 mt-2 text-center capitalize">{category}</p>
      </div>

      <div className="flex flex-col gap-5 max-w-3xl mx-auto">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="flex flex-col bg-gray-900/80 border  border-gray-800 rounded-xl overflow-hidden">
            <a
              href={`/category/${category}/${quiz.id}`}
              className="flex flex-col sm:flex-row justify-between hover:bg-gray-900 items-center sm:items-start gap-4 p-4 sm:p-5 transition-colors text-center sm:text-left"
            >
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-semibold underline-offset-4">{quiz.title}</h2>
                {quiz.description && (
                  <p className="text-gray-400 mt-1 text-sm sm:text-base max-w-md mx-auto sm:mx-0">{quiz.description}</p>
                )}
              </div>

              {quiz.imageUrl && (
                <div className="w-20 h-20 sm:w-24 sm:h-24 relative rounded-md overflow-hidden shrink-0 bg-gray-800">
                  <Image src={quiz.imageUrl} alt={quiz.imageAlt ?? quiz.title} fill className="object-contain p-0.5" />
                </div>
              )}
            </a>

          
            <div className="border-t border-gray-800 bg-gray-800/60 p-3 flex justify-end">
              <LeaderboardButton quizId={quiz.id} />
            </div>
          </div>
        ))}

        {quizzes.length === 0 && (
          <p className="text-gray-400 text-center">No quizzes found in this category.</p>
        )}
      </div>
    </div>
  );
}
