"use client";

import { useState } from "react";

const SHIP = ["Freeship", "Hỏa tốc", "Tiết kiệm"];
const WARRANTY = ["7 ngày đổi trả", "Bảo hành 6 tháng", "Bảo hành 12 tháng"];

export default function StoreFilters() {
  const [ship, setShip] = useState<string[]>([]);
  const [war, setWar] = useState<string[]>([]);
  const toggle = (arr: string[], set: (v: string[]) => void, v: string) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs uppercase tracking-wide text-slate-500">Vận chuyển</div>
        <div className="mt-2 space-y-2">
          {SHIP.map((s) => (
            <label key={s} className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={ship.includes(s)}
                onChange={() => toggle(ship, setShip, s)}
                className="h-4 w-4 rounded border-slate-300 accent-amber-500"
              />
              <span className="text-sm">{s}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <div className="text-xs uppercase tracking-wide text-slate-500">Bảo hành</div>
        <div className="mt-2 space-y-2">
          {WARRANTY.map((w) => (
            <label key={w} className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={war.includes(w)}
                onChange={() => toggle(war, setWar, w)}
                className="h-4 w-4 rounded border-slate-300 accent-amber-500"
              />
              <span className="text-sm">{w}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="rounded-xl border bg-white p-3 text-xs text-slate-600">
        <div className="font-medium text-slate-900">Bộ lọc cửa hàng</div>
        <div>Áp dụng khi bạn chọn lọc & tìm kiếm trong store.</div>
      </div>
    </div>
  );
}
