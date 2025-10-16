"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const CATS = [
  { key: "all", label: "Tất cả" },
  { key: "collectibles", label: "Sưu tầm" },
  { key: "electronics", label: "Điện tử" },
  { key: "fashion", label: "Thời trang" },
];

export default function AuctionsFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const [q, setQ] = React.useState(sp.get("q") || "");
  const [cat, setCat] = React.useState(sp.get("cat") || "all");
  const [min, setMin] = React.useState(Number(sp.get("min") || 0));
  const [max, setMax] = React.useState(Number(sp.get("max") || 0));

  const apply = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(sp.toString());
    const setOrDel = (k: string, v?: string | number | null) => {
      if (v && String(v).trim() !== "" && v !== 0) params.set(k, String(v));
      else params.delete(k);
    };
    setOrDel("q", q || null);
    setOrDel("cat", cat !== "all" ? cat : null);
    setOrDel("min", min || null);
    setOrDel("max", max || null);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  const reset = () => {
    setQ(""); setCat("all"); setMin(0); setMax(0);
    const params = new URLSearchParams(sp.toString());
    ["q","cat","min","max","page"].forEach((k)=>params.delete(k));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form onSubmit={apply} className="space-y-4">
      <div>
        <div className="text-xs uppercase tracking-wide text-slate-500">Từ khóa</div>
        <input
          value={q}
          onChange={(e)=>setQ(e.target.value)}
          placeholder="Ví dụ: lego, pokemon…"
          className="mt-2 w-full rounded-xl border bg-white px-3 py-2"
        />
      </div>

      <div>
        <div className="text-xs uppercase tracking-wide text-slate-500">Danh mục</div>
        <select
          value={cat}
          onChange={(e)=>setCat(e.target.value)}
          className="mt-2 w-full rounded-xl border bg-white px-3 py-2"
        >
          {CATS.map((c)=><option key={c.key} value={c.key}>{c.label}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <label className="space-y-1">
          <span className="text-xs text-slate-500">Giá tối thiểu</span>
          <input
            type="number"
            min={0}
            value={min}
            onChange={(e)=>setMin(Number(e.target.value))}
            className="w-full rounded-xl border bg-white px-3 py-2"
          />
        </label>
        <label className="space-y-1">
          <span className="text-xs text-slate-500">Giá tối đa</span>
          <input
            type="number"
            min={0}
            value={max}
            onChange={(e)=>setMax(Number(e.target.value))}
            className="w-full rounded-xl border bg-white px-3 py-2"
          />
        </label>
      </div>

      <div className="flex items-center justify-between gap-2">
        <button type="button" onClick={reset} className="rounded-xl border bg-white px-4 py-2 text-sm hover:bg-slate-50">Đặt lại</button>
        <button type="submit" className="rounded-xl bg-[var(--secondary-color)] px-4 py-2 text-sm font-medium text-slate-900 hover:bg-amber-400">Áp dụng</button>
      </div>
    </form>
  );
}
