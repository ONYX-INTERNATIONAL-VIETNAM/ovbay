"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import Link from "next/link";
import { getSuggestions } from "@/lib/data";

export default function SearchHero({ defaultQuery = "" }: { defaultQuery?: string }) {
  const router = useRouter();
  const sp = useSearchParams();

  const [q, setQ] = React.useState(defaultQuery);
  const [suggest, setSuggest] = React.useState<string[]>([]);

  React.useEffect(() => {
    const id = setTimeout(() => {
      if (!q?.trim()) return setSuggest([]);
      setSuggest(getSuggestions(q));
    }, 180);
    return () => clearTimeout(id);
  }, [q]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(sp.toString());
    params.set("q", q.trim());
    params.delete("page");
    router.push(`/search?${params.toString()}`);
  };

  return (
    <section className="relative">
      <div className="rounded-2xl border bg-white/70 p-4 backdrop-blur">
        <form onSubmit={submit} className="relative">
          <div className="flex items-center rounded-2xl border bg-white px-3">
            <Search className="mr-2 h-5 w-5 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Tìm sản phẩm, danh mục hoặc cửa hàng…"
              className="h-12 w-full border-0 p-0 text-[15px] outline-none"
              aria-label="Tìm kiếm"
            />
            <button
              type="submit"
              className="ml-2 rounded-xl bg-amber-500 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-amber-400"
            >
              Tìm
            </button>
          </div>

          {suggest.length > 0 && (
            <ul
              role="listbox"
              className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border bg-white shadow-lg"
            >
              {suggest.slice(0, 8).map((s) => (
                <li key={s}>
                  <Link
                    href={`/search?q=${encodeURIComponent(s)}`}
                    className="block px-3 py-2 text-sm hover:bg-slate-50"
                    role="option"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>
    </section>
  );
}
