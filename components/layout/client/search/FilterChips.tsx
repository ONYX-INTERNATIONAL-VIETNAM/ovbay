"use client";

import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";

const CATS = [
  { key: "all", label: "Tất cả" },
  { key: "electronics", label: "Điện tử" },
  { key: "fashion", label: "Thời trang" },
  { key: "home", label: "Gia dụng" },
  { key: "collectibles", label: "Sưu tầm" },
];

export default function FilterChips({ active }: { active: string }) {
  const pathname = usePathname();
  const sp = useSearchParams();

  const urlFor = (cat: string) => {
    const params = new URLSearchParams(sp.toString());
    params.set("cat", cat);
    params.set("page", "1");
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex flex-wrap gap-2">
      {CATS.map((c) => (
        <Link
          key={c.key}
          href={urlFor(c.key)}
          className={`rounded-full border px-3 py-1.5 text-sm ${
            active === c.key ? "bg-amber-500 text-slate-900 border-amber-500" : "bg-white hover:bg-slate-50"
          }`}
        >
          {c.label}
        </Link>
      ))}
    </div>
  );
}
