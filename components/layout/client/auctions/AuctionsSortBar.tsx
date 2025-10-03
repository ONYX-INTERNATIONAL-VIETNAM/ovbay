"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function AuctionsSortBar({ total }: { total: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const sort = sp.get("sort") || "ending-soon";

  const change = (v: string) => {
    const params = new URLSearchParams(sp.toString());
    params.set("sort", v);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between rounded-2xl border bg-white/70 p-3 backdrop-blur">
      <div className="text-sm text-slate-600">
        <span className="font-medium text-slate-900">{total}</span> phiên
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span className="text-slate-500">Sắp xếp:</span>
        <select
          className="rounded-lg border bg-white px-3 py-1.5"
          value={sort}
          onChange={(e) => change(e.target.value)}
        >
          <option value="ending-soon">Sắp kết thúc</option>
          <option value="newest">Mới tạo</option>
          <option value="price-asc">Giá tăng dần</option>
          <option value="price-desc">Giá giảm dần</option>
          <option value="highest">Giá cao nhất</option>
        </select>
      </div>
    </div>
  );
}
