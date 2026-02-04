export default function Footer() {
  return (
    <footer className="mt-16 w-full border-t border-gray-800 bg-gray-900 text-gray-300 py-10">
      <div className="max-w-4xl mx-auto px-6 flex flex-col gap-8">

      
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">About This Project</h2>
          <p className="text-gray-400 leading-relaxed">
           A simple quiz app that is meant to demonstrate Create and Read database operation with an API throttling. The app runs on a free database which gets paused from time to time, so I implemented an offline version that will serve as a demo. No authentication, may add later.
          </p>
          <p className="text-gray-400 leading-relaxed mt-2">Created with the assistance of AI {`(ChatGPT)`}, mundane and repetitive tasks were vibe coded.</p>
        </div>
   
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Built With</h3>

          <div className="flex gap-4 flex-wrap items-center opacity-90 bg-stone-50 w-fit p-2 rounded">
  <a title="Next.js" target="_blank" href="https://nextjs.org/">
    <img src="/images/tech/nextjs.png" alt="Next.js" className="h-8" />
  </a>

  <a title="TypeScript" target="_blank" href="https://www.typescriptlang.org/">
    <img src="/images/tech/typescript.png" alt="TypeScript" className="h-8" />
  </a>

  <a title="Tailwind CSS" target="_blank" href="https://tailwindcss.com/">
    <img src="/images/tech/tailwind.png" alt="Tailwind CSS" className="h-8" />
  </a>

  <a title="Prisma" target="_blank" href="https://www.prisma.io/">
    <img src="/images/tech/prisma.png" alt="Prisma" className="h-8" />
  </a>

  <a title="PostgreSQL" target="_blank" href="https://www.postgresql.org/">
    <img src="/images/tech/postgresql.png" alt="PostgreSQL" className="h-8" />
  </a>

  <a title="Supabase" target="_blank" href="https://supabase.com/">
    <img src="/images/tech/supabase.svg" alt="Supabase" className="h-8" />
  </a>

  <a title="Vercel" target="_blank" href="https://vercel.com/">
    <img src="/images/tech/vercel.svg" alt="Vercel" className="h-8" />
  </a>
</div>

        </div>

        <p className="text-xs text-gray-500 mt-4">
          This project is provided for entertainment and personal use. 
          All trademarks, game titles, and references belong to their respective owners.
        </p>
      </div>
    </footer>
  );
}
