"use client";

import * as React from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";

/** Lấy videoId từ nhiều dạng URL YouTube: watch?v=, youtu.be/, shorts/, embed/ */
function ytIdFromUrl(url: string): string | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtu.be") return u.pathname.slice(1) || null;
    if (host === "youtube.com") {
      const v = u.searchParams.get("v");
      if (v) return v;
      const m = u.pathname.match(/\/(shorts|embed)\/([^/?#]+)/);
      if (m) return m[2];
    }
  } catch { }
  return null;
}

export default function Gallery({ images }: { images: string[] }) {
  const [active, setActive] = React.useState(0);
  const current = images?.[active] ?? "/placeholder.png";
  const ytId = ytIdFromUrl(current);

  return (
    <div className="grid gap-3 md:grid-cols-[1fr_100px]">
      {/* Main */}
      <div className="relative overflow-hidden rounded-xl border bg-white">
        <div className="relative h-[360px] md:h-[480px] overflow-hidden">
          {ytId ? (
            <iframe
              key={ytId} // đổi key để reset player khi chuyển media
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${ytId}?rel=0&modestbranding=1`}
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          ) : (
            <Image
              src={current}
              alt="Ảnh sản phẩm"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain object-center transition-transform duration-300"
              priority={active === 0}
            />
          )}
        </div>
      </div>

      {/* Thumbs */}
      <div className="order-first flex gap-2 md:order-none md:flex-col">
        {images.map((src, i) => {
          const id = ytIdFromUrl(src);
          const thumb = id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : src;
          const isActive = active === i;

          return (
            <button
              key={i}
              onClick={() => setActive(i)}
              type="button"
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border bg-white transition hover:opacity-90 ${isActive ? "ring-2 ring-amber-500" : ""
                }`}
              aria-label={`Media ${i + 1}${id ? " (YouTube)" : ""}`}
            >
              <Image src={thumb} alt="" fill sizes="80px" className="object-cover" />
              {id && (
                <span className="pointer-events-none absolute inset-0 grid place-items-center">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--primary-color)] text-white">
                    <FaPlay className="h-4 w-4 text-white" />
                  </span>
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
