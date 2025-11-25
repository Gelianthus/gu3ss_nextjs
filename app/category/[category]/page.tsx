import Image from "next/image";
import prisma from "@/lib/prisma";
import GoBackButton from "@/components/GoBackButton";

interface PageProps {
  params: {
    category: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { category } = await params;
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);

  const quizzes = await prisma.quiz.findMany({
    where: {
      category: {
        name:  formattedCategory,
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-12">

       <div className="flex flex-col items-center mb-12">
        <div className="self-start mb-4">
          <GoBackButton />
        </div>
        <h1 className="text-4xl font-bold text-green-400 text-center">Gu3ss</h1>
        <p className="text-lg text-gray-400 mt-2 text-center capitalize">{category}</p>
      </div>

   
      <div className="flex flex-col gap-6 max-w-3xl mx-auto">
        {quizzes.map((quiz) => (
          <a
            key={quiz.id}
            href={`/category/${category}/${quiz.id}`}
            className="
              flex justify-between items-center gap-4
              bg-gray-900/80 border border-gray-800 rounded-xl
              p-5 hover:bg-gray-800 transition-colors
            "
          >
        
            <div className="flex-1">
              <h2 className="text-2xl font-semibold">{quiz.title}</h2>
              {quiz.description && (
                <p className="text-gray-400 mt-1 text-sm max-w-md">
                  {quiz.description}
                </p>
              )}
            </div>


            {quiz.imageUrl && (
  <div className="w-24 h-24 relative rounded-md overflow-hidden shrink-0 bg-gray-800">
    <Image
      src={quiz.imageUrl}
      alt={quiz.imageAlt ?? quiz.title}
      fill
      className="object-contain"
    />
  </div>
)}
          </a>
        ))}

        {quizzes.length === 0 && (
          <p className="text-gray-400 text-center">
            No quizzes found in this category.
          </p>
        )}
      </div>
    </div>
  );
}
