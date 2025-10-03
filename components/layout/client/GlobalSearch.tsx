"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function GlobalSearch() {
  const [q, setQ] = React.useState("");
  const [suggest, setSuggest] = React.useState<string[]>([]);

  React.useEffect(() => {
    const id = setTimeout(() => {
      if (!q) return setSuggest([]);
      // mock gợi ý – thay bằng API thật sau
      setSuggest([`Điện thoại "${q}"`, `Tai nghe "${q}"`, `Shop "${q} Store"`]);
    }, 200);
    return () => clearTimeout(id);
  }, [q]);

  return (
    <div className="relative">
      <div className="flex items-center rounded-xl border bg-white px-3">
        <Search className="mr-2 h-4 w-4 text-slate-400" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Tìm sản phẩm, danh mục hoặc cửa hàng…"
          className="h-10 border-0 p-0 focus-visible:ring-0"
          aria-label="Tìm kiếm"
        />
      </div>

      {suggest.length > 0 && (
        <ul
          role="listbox"
          className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border bg-white shadow-lg"
        >
          {suggest.map((s) => (
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
    </div>
  );
}
