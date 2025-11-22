"use client";

interface StickerBarProps {
  images: string[];
}

export default function StickerBar({ images }: StickerBarProps) {
  const active = images.length > 0;

  return (
    <div
      className={`
        pointer-events-none fixed left-1/2 -translate-x-1/2
        flex gap-4 h-28 overflow-hidden
        bottom-0

        transition-transform duration-500 ease-out
        ${active ? "translate-y-0" : "translate-y-full"}
      `}
    >
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          className={`
            w-28 h-28 object-contain drop-shadow-xl
            transition-all duration-500 ease-out

            /* start slightly lower and slide up */
            ${active ? "translate-y-[10%] opacity-100" : "translate-y-[80%] opacity-0"}

            /* optional small rotation for organic feel */
            ${i === 0 ? "-rotate-6" : ""}
            ${i === 1 ? "rotate-2" : ""}
            ${i === 2 ? "rotate-8" : ""}
          `}
        />
      ))}
    </div>
  );
}

