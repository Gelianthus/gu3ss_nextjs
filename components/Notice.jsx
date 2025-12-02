import Link from "next/link";

export default function Notice() {
    return <div className="w-full min-h-screen bg-gray-900 text-gray-300 p-12 text-center">
    <h1 className="text-2xl font-bold mb-4">Database is temporarily asleep...</h1>
    <p className="mb-6">Try our offline quiz instead? <span className="text-sm">(Score can't be saved)</span></p>
    <Link
      href="/offline-quiz"
      className="px-4 py-2 bg-green-400 text-black rounded hover:bg-green-500"
    >
      Offline Quiz
    </Link>
  </div>
}