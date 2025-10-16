"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const TABS = [
  { key: "live", label: "Đang diễn ra" },
  { key: "upcoming", label: "Sắp diễn ra" },
  { key: "ended", label: "Đã kết thúc" },
  { key: "all", label: "Tất cả" },
];

export default function StatusTabs() {
  const pathname = usePathname();
  const sp = useSearchParams();
  const active = sp.get("status") || "live";

  const urlFor = (k: string) => {
    const params = new URLSearchParams(sp.toString());
    params.set("status", k);
    params.set("page", "1");
    return `${pathname}?${params.toString()}`;
  };

  return (
    <nav className="rounded-2xl border bg-white/70 p-1 backdrop-blur">
      <ul className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <li key={t.key}>
            <Link
              href={urlFor(t.key)}
              className={`block rounded-xl px-4 py-2 text-sm ${
                active === t.key
                  ? "bg-[var(--secondary-color)] text-slate-900"
                  : "bg-white hover:bg-slate-50 border"
              }`}
            >
              {t.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
