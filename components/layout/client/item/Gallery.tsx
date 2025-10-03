"use client";

import * as React from "react";

export default function Gallery({ images }: { images: string[] }) {
  const [active, setActive] = React.useState(0);

  return (
    <div className="grid gap-3 md:grid-cols-[1fr_100px]">
      {/* Main */}
      <div className="relative overflow-hidden rounded-xl border bg-white">
        <div
          className="h-[360px] bg-cover bg-center md:h-[480px] transition-transform duration-300"
          style={{ backgroundImage: `url(${images[active]})` }}
          aria-label="Ảnh sản phẩm"
        />
      </div>

      {/* Thumbs */}
      <div className="order-first flex gap-2 md:order-none md:flex-col">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border bg-white transition hover:opacity-90 ${
              active === i ? "ring-2 ring-amber-500" : ""
            }`}
            aria-label={`Ảnh ${i + 1}`}
          >
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${src})` }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
