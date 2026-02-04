"use client";

import { useState, useRef, useEffect } from "react";
import QuizCompletion from "./QuizCompletion";

interface Item {
  id: string;
  hints: string[];
  answers: string[];
  quizId: string;
}

interface QuizPlayerProps {
  items: Item[];
  category: string;
}


export default function QuizPlayer({ items, category }: QuizPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealedHints, setRevealedHints] = useState([true, false, false]);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [isCorrectFlash, setIsCorrectFlash] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>(Array(items.length).fill(""));
  const [inputLocked, setInputLocked] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
const [startTime, setStartTime] = useState(0);
const [timeTaken, setTimeTaken] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
  inputRef.current?.focus();
}, [currentIndex, revealedHints]);

  const currentItem = items[currentIndex];

  const handleRevealHint = (index: number) => {
      if (!quizStarted) {
        setQuizStarted(true);
        setStartTime(Date.now());
      }
    const canReveal = index === 0 || revealedHints[index - 1];
    if (!canReveal) return;

    const newRevealed = [...revealedHints];
    newRevealed[index] = true;
    setRevealedHints(newRevealed);
  };

  const goToNext = () => {
  if (currentIndex + 1 >= items.length) {
    const end = Date.now();
    setTimeTaken(end - startTime);
  }

  setCurrentIndex((prev) => prev + 1);
  setUserInput("");
  setRevealedHints([true, false, false]);
  setInputLocked(false);
};


  const handleSkip = () => {
    if (!quizStarted) {
    setQuizStarted(true);
    setStartTime(Date.now());
    }
    goToNext();
  };

  const handleTyping = (value: string) => {
    if (!quizStarted) {
    setQuizStarted(true);
    setStartTime(Date.now());
    }
    
    if (inputLocked) return;

    setUserInput(value);

    const answer = value.trim().toLowerCase();
    const isCorrect = currentItem.answers.some((a) => a.toLowerCase() === answer);

    if (isCorrect) {
      setInputLocked(true);
      setIsCorrectFlash(true);

      const newUserAnswers = [...userAnswers];
      newUserAnswers[currentIndex] = answer;
      setUserAnswers(newUserAnswers);

      const points =
        revealedHints.filter((r) => r).length === 1
          ? 3
          : revealedHints.filter((r) => r).length === 2
          ? 2
          : 1;

      setScore((prev) => prev + points);

      setTimeout(() => {
        setIsCorrectFlash(false);
        goToNext();
      }, 450);
    }
  };

  if (currentIndex >= items.length) {
  return (
    <QuizCompletion
      items={items}
      score={score}
      timeTaken={timeTaken}
      userAnswers={userAnswers}
      quizId={items[0].quizId}
      onRetry={() => window.location.reload()}
      category={category}
    />
  );
}


  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6 bg-gray-900 rounded-xl text-white">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">
        Item {currentIndex + 1} of {items.length}
      </h2>
      <div className="flex flex-col gap-2 mb-4">
        {currentItem.hints.map((hint, idx) => {
          const canReveal = idx === 0 || revealedHints[idx - 1];

          return (
            <div
              key={idx}
              className={`
                p-3 rounded border border-gray-700 transition-all duration-300 
                min-h-12 flex items-center
                ${revealedHints[idx] ? "bg-gray-800" : canReveal ? "bg-gray-700 cursor-pointer" : "bg-gray-600 cursor-not-allowed"}
              `}
            >
              {revealedHints[idx] ? (
                <p className="wrap-break-word text-sm sm:text-base">{hint}</p>
              ) : (
                <div className="flex justify-between items-center w-full text-sm sm:text-base">
                  <span>Hint {idx + 1}</span>
                  <button
                    className={`ml-2 text-green-400 hover:underline cursor-pointer ${!canReveal ? "opacity-50 pointer-events-none" : ""}`}
                    onClick={() => handleRevealHint(idx)}
                  >
                    Reveal
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
        <div className="flex-1 flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={(e) => handleTyping(e.target.value)}
            disabled={inputLocked}
            autoFocus
            className={`
              w-full p-2 rounded border text-white text-sm sm:text-base transition-all duration-300
              ${isCorrectFlash ? "bg-green-600 border-green-300" : "bg-gray-800 border-gray-700"}
            `}
          />

          {isCorrectFlash && (
            <span className="text-green-400 text-sm animate-pulse whitespace-nowrap">
              ✓ Correct!
            </span>
          )}
        </div>

        <button
          className="px-4 py-2 bg-gray-700 text-white font-semibold rounded hover:bg-gray-600 text-sm sm:text-base cursor-pointer"
          onClick={handleSkip}
        >
          Skip
        </button>
      </div>

      <p className="mt-4 text-gray-400 text-sm sm:text-base">Score: {score}</p>
    </div>
  );
}
