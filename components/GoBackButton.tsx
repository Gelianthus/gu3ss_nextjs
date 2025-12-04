"use client";

import { useRouter } from "next/navigation";

interface GoBackButtonProps {
  to?: string;
}

export default function GoBackButton({ to }: GoBackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (to) {
      router.push(to);
    } else {
      router.back();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-200 transition-colors active:text-green-400 cursor-pointer"
    >
      ← Back
    </button>
  );
}
