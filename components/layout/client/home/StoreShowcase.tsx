"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function StoreShowcase({
  stores,
  initialCount = 6, // số item hiển thị ban đầu
}: {
  stores: { slug: string; name: string; banner: string }[];
  initialCount?: number;
}) {
  const [showAll, setShowAll] = React.useState(false);

  const visible = showAll ? stores : stores.slice(0, initialCount);
  const canExpand = stores.length > initialCount;

  return (
    <section className="space-y-5">
      <ul
        id="store-showcase-grid"
        className="mt-6 grid place-items-center gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
      >
        {visible.map((s) => (
          <li key={s.slug} className="flex flex-col items-center">
            <Link
              href={`/store/${s.slug}`}
              aria-label={`Xem cửa hàng ${s.name}`}
              className="group inline-flex flex-col items-center"
            >
              {/* Vòng tròn logo (responsive sizes) */}
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[var(--background-color)] ring-1 ring-slate-200 shadow-sm transition group-hover:ring-slate-300 sm:h-28 sm:w-28 lg:h-32 lg:w-32">
                <div className="relative h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-16">
                  <Image
                    src={s.banner}
                    alt={s.name}
                    fill
                    draggable={false}
                    className="object-contain"
                    sizes="(max-width: 640px) 40px, (max-width: 768px) 48px, 64px"
                    priority={false}
                  />
                </div>
              </div>

              {/* Tên thương hiệu (truncate + width theo vòng tròn) */}
              <p
                className="mt-2 sm:mt-3 w-24 sm:w-28 lg:w-32 truncate text-center text-[11px] sm:text-xs font-semibold text-slate-700"
                title={s.name}
              >
                {s.name}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      {canExpand && (
        <div className="flex justify-center mt-9">
          <Button
            variant="outline"
            aria-controls="store-showcase-grid"
            aria-expanded={showAll}
            onClick={() => setShowAll((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-black"
          >
            {showAll ? "Thu gọn" : "Xem tất cả"}
          </Button>
        </div>
      )}
    </section>
  );
}
