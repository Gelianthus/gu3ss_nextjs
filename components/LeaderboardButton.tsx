"use client";

import { useState } from "react";
import LeaderboardModal from "./LeaderboardModal";

interface Props {
  quizId: string;
}

export default function LeaderboardButton({ quizId }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="
          text-green-400 text-sm underline 
          hover:text-green-300 
          transition
          cursor-pointer
        "
      >
        View leaderboard
      </button>

      {open && (
        <LeaderboardModal quizId={quizId} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
