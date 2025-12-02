"use client";

import { useRouter } from "next/navigation";

export default function GoBackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-200 transition-colors active:text-green-400 cursor-pointer"
    >
      ← Back
    </button>
  );
}