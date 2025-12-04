"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LeaderboardEntry {
  id: string;
  username: string;
  score: number;
  timeTaken: number;
  createdAt: string;
}

interface Props {
  quizId: string;
  onClose: () => void;
}

export default function LeaderboardModal({ quizId, onClose }: Props) {
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/leaderboard/${quizId}`, {
  cache: "no-store",
});
        const data = await res.json();
        setEntries(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [quizId]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="
            w-full max-w-lg bg-gray-900 border border-gray-800 
            rounded-2xl p-6 relative shadow-2xl shadow-green-400/10
          "
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
        >
          <h2 className="text-2xl font-bold text-green-400 text-center mb-4 drop-shadow-lg">
            Leaderboard
          </h2>

          {loading && (
            <p className="text-center text-gray-400 py-6">Loading...</p>
          )}
          {!loading && entries.length === 0 && (
            <p className="text-center text-gray-400 py-6">
              No leaderboard entries yet.
            </p>
          )}

          {!loading && entries.length > 0 && (
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
              {entries.map((entry, i) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="
                    flex justify-between items-center 
                    bg-gray-800/60 border border-gray-700
                    rounded-xl p-3 
                  "
                >
                  <div>
                    <p className="font-semibold text-white">
                      {entry.username}
                    </p>
                    <p className="text-xs text-gray-400">
                      Time: {(entry.timeTaken / 1000).toFixed(3)}s
                    </p>
                  </div>

                  <p className="text-lg font-bold text-green-400">
                    {entry.score}
                  </p>
                </motion.div>
              ))}
            </div>
          )}

          <button
            onClick={onClose}
            className="
              mt-6 w-full py-2 rounded-xl 
              bg-gray-800 hover:bg-gray-700 
              text-white transition 
              border border-gray-700
              cursor-pointer
            "
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
