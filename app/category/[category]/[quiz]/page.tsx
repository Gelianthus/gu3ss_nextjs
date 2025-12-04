import prisma from "@/lib/prisma";
import GoBackButton from "@/components/GoBackButton";
import QuizPlayer from "@/components/QuizPlayer";
import { checkDbStatus } from "@/lib/checkDbStatus";
import Notice from "@/components/Notice"

interface PageProps {
  params: {
    category: string;
    quiz: string;
  };
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default async function QuizPage({ params }: PageProps) {
  const db = await checkDbStatus();
  if (!db.ok) {
      return <Notice />
  }
  const { category, quiz } = await params;
  const quizData = await prisma.quiz.findFirst({
    where: {
      id: quiz,
      category: {
        name: { equals: category, mode: "insensitive" },
      },
    },
    include: {
      items: true,
    },
  });



  if (!quizData) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center">
        <p className="text-gray-400">Quiz not found in this category.</p>
      </div>
    );
  }

  const randomItems = shuffleArray(quizData.items).slice(0, 10);


  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-12">

      <div className="flex flex-col items-center mb-8">
        <div className="self-start mb-4">
          <GoBackButton to={`/category/${category.toLocaleLowerCase()}`} />
        </div>
        <h1 className="text-4xl font-bold text-green-400 text-center">
          {quizData.title}
        </h1>
        {quizData.description && (
          <p className="text-gray-400 mt-2 text-center">{quizData.description}</p>
        )}
      </div>

      <div className="flex flex-col gap-6 max-w-3xl mx-auto">
        <QuizPlayer items={randomItems} category={category} />
      </div>
    </div>
  );
}
