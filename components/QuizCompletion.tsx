"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';

interface Item {
  id: string;
  hints: string[];
  answers: string[];
}

interface QuizCompletionProps {
  items: Item[];
  score: number;
  timeTaken: number;
  userAnswers: string[];
  onRetry: () => void;
  quizId: string;
  category: string;
}

export default function QuizCompletion({
  items,
  score,
  timeTaken,
  userAnswers,
  onRetry,
  quizId,
  category
}: QuizCompletionProps) {
  const router = useRouter();
  const [showSubmit, setShowSubmit] = useState(false);
  const [username, setUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!username.trim()) return;

    setIsSubmitting(true);

    await fetch("/api/leaderboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        score,
        timeTaken,
        quizId,
      }),
    });

    alert("Result submitted!");
     router.push(`/category/${category}`);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-900 rounded-xl text-white flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-green-400">Quiz Complete!</h2>

      <p className="text-gray-400">Your final score: {score} / 30</p>

      <p className="text-blue-400 font-semibold">
        Time Taken: {Math.floor(timeTaken / 1000)}s
      </p>

      {!isSubmitting && (
        <div className="flex gap-3 mt-2">
          <button
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer"
            onClick={onRetry}
          >
            Retry
          </button>

          <button
            className="px-4 py-2 bg-gray-700 rounded hover:bg-green-500 cursor-pointer"
            onClick={() => setShowSubmit(true)}
          >
            Submit Result
          </button>
        </div>
      )}

      {showSubmit && (
        <div className="mt-3 p-3 rounded bg-gray-800">
          <label className="block mb-1 text-sm">Enter your name:</label>

          <input
            type="text"
            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <button
            className="mt-2 w-full bg-gray-700 p-2 rounded hover:bg-green-500 cursor-pointer"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      )}

      <div className="mt-4 flex flex-col gap-3">
        {items.map((item, idx) => {
          const userAnswer = userAnswers[idx];
          const correctAnswersLower = item.answers.map((a) => a.toLowerCase());
          const isCorrect = correctAnswersLower.includes(userAnswer);

          return (
            <details
              key={item.id}
              className={`rounded border ${
                isCorrect
                  ? "bg-green-800 border-green-400"
                  : "bg-red-800/70 border-red-400/60"
              }`}
            >
              <summary className="p-3 font-bold cursor-pointer">
                {item.answers.join(", ")}
              </summary>

              <ul className="rounded border-0 p-3 list-disc list-inside mt-2 text-white bg-gray-800">
                {item.hints.map((hint, i) => (
                  <li key={i}>{hint}</li>
                ))}
              </ul>
            </details>
          );
        })}
      </div>
    </div>
  );
}
