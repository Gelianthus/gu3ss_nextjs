"use client";
import QuizPlayer from "@/components/QuizPlayer";

export default function OfflineQuizPage() {
  
  const offlineQuiz = {
    title: "Offline Quiz Challenge",
    description: "Try this quiz while the database is asleep!",
    items: [
      {
        id: "1",
        hints: [
          "A fruit that keeps the doctor away",
          "Commonly red or green",
          "Often found in pies and cider"
        ],
        answers: ["apple"]
      },
      {
        id: "2",
        hints: [
          "The largest planet in our solar system",
          "Has a big red spot",
          "A gas giant"
        ],
        answers: ["jupiter"]
      },
      {
        id: "3",
        hints: [
          "The fastest land animal",
          "Spotted coat",
          "Native to Africa"
        ],
        answers: ["cheetah"]
      },
      {
        id: "4",
        hints: [
          "Used to measure time",
          "Often found on walls or wrists",
          "Has hands and numbers"
        ],
        answers: ["clock", "watch"]
      },
      {
        id: "5",
        hints: [
          "A popular programming language",
          "Named after a type of snake",
          "Used for web and AI projects"
        ],
        answers: ["python"]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-12">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-4xl font-bold text-green-400 text-center">
          {offlineQuiz.title}
        </h1>
        <p className="text-gray-400 mt-2 text-center">{offlineQuiz.description}</p>
      </div>

      <div className="flex flex-col gap-6 max-w-3xl mx-auto">
        <QuizPlayer items={offlineQuiz.items} />
      </div>
    </div>
  );
}
