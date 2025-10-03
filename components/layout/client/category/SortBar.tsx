"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SortBar({ total }: { total: number }) {
  const router = useRouter();
  const sp = useSearchParams();
  const sort = sp.get("sort") || "popular";

  const change = (v: string) => {
    const params = new URLSearchParams(sp.toString());
    params.set("sort", v);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between rounded-2xl border bg-white/70 p-3 backdrop-blur">
      <div className="text-sm text-slate-600">
        <span className="font-medium text-slate-900">{total}</span> sản phẩm
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span className="text-slate-500">Sắp xếp:</span>
        <select
          className="rounded-lg border bg-white px-3 py-1.5"
          value={sort}
          onChange={(e) => change(e.target.value)}
        >
          <option value="popular">Phổ biến</option>
          <option value="new">Mới nhất</option>
          <option value="price-asc">Giá tăng dần</option>
          <option value="price-desc">Giá giảm dần</option>
        </select>
      </div>
    </div>
  );
}
