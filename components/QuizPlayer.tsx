"use client";

import { useState } from "react";

interface Item {
  id: string;
  hints: string[];
  answers: string[];
}

interface QuizPlayerProps {
  items: Item[];
}

export default function QuizPlayer({ items }: QuizPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealedHints, setRevealedHints] = useState([true, false, false]);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [isCorrectFlash, setIsCorrectFlash] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>(
    Array(items.length).fill("")
  );

  const currentItem = items[currentIndex];

  const handleRevealHint = (index: number) => {
    const newRevealed = [...revealedHints];
    newRevealed[index] = true;
    setRevealedHints(newRevealed);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => prev + 1);
    setUserInput("");
    setRevealedHints([true, false, false]);
  };

  const handleSkip = () => {
    goToNext();
  };

  const handleTyping = (value: string) => {
  setUserInput(value);

  const answer = value.trim().toLowerCase();
  const isCorrect = currentItem.answers.some(
    (a) => a.toLowerCase() === answer
  );

  if (isCorrect) {
    // Trigger visual cue
    setIsCorrectFlash(true);

    // Save user's answer
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentIndex] = answer;
    setUserAnswers(newUserAnswers);

    // Score
    const points =
      revealedHints.filter((r) => r).length === 1
        ? 3
        : revealedHints.filter((r) => r).length === 2
        ? 2
        : 1;

    setScore((prev) => prev + points);

    // Delay before moving forward (so user sees feedback)
    setTimeout(() => {
      setIsCorrectFlash(false);
      goToNext();
    }, 450); // 0.45s flash
  }
  };


  // Quiz completed
  if (currentIndex >= items.length) {
  return (
    <div className="max-w-md mx-auto p-6 bg-gray-900 rounded-xl text-white flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-green-400">Quiz Complete!</h2>
      <p className="text-gray-400">Your final score: {score}</p>

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
                  : "bg-red-800/70 border-red-400/60" // muted red
              }`}
            >
              <summary className="p-3 font-bold cursor-pointer">
                {isCorrect
                  ? `${item.answers.join(", ")}`
                  : `${item.answers.join(", ")}`}
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


  return (
    <div className="max-w-md mx-auto p-6 bg-gray-900 rounded-xl text-white">
      <h2 className="text-xl font-semibold mb-4">
        Item {currentIndex + 1} of {items.length}
      </h2>

      <div className="flex flex-col gap-2 mb-4">
        {currentItem.hints.map((hint, idx) => (
          <div
            key={idx}
            className={`p-3 rounded border border-gray-700 ${
              revealedHints[idx]
                ? "bg-gray-800"
                : "bg-gray-700 cursor-pointer flex justify-between items-center"
            }`}
          >
            {revealedHints[idx] ? (
              hint
            ) : (
              <>
                <span>Hint {idx + 1}</span>
                <button
                  className="ml-2 text-sm text-green-400 hover:underline"
                  onClick={() => handleRevealHint(idx)}
                >
                  Reveal
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
  <input
  type="text"
  value={userInput}
  onChange={(e) => handleTyping(e.target.value)}
  className={`flex-1 p-2 rounded border text-white transition-all duration-300
    ${isCorrectFlash ? "bg-green-600 border-green-300" : "bg-gray-800 border-gray-700"}
  `}
        />
        {isCorrectFlash && (
  <p className="text-green-400 text-sm mt-1 animate-pulse">
    ✓ Correct!
  </p>
  )}
  
  <button
    className="px-4 py-2 bg-gray-700 text-white font-semibold rounded hover:bg-gray-600"
    onClick={handleSkip}
  >
    Skip
  </button>
  </div>


      <p className="mt-4 text-gray-400">Score: {score}</p>
    </div>
  );
}
