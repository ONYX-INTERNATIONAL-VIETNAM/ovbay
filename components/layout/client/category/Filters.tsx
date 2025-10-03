"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

type Props = { category: string; subcategory?: string };

const BRANDS = ["Onyx", "KeyLab", "RetroHub", "CamZone", "HomePlus"];
const FEATURES = ["Hàng mới", "Freeship", "Đổi trả 7 ngày", "Trả góp"];

export default function Filters({ category, subcategory }: Props) {
  const [price, setPrice] = useState([200, 2000]); // K vnđ
  const [brands, setBrands] = useState<string[]>([]);
  const [flags, setFlags] = useState<string[]>([]);

  const toggle = (arr: string[], setArr: (v: string[]) => void, v: string) =>
    setArr(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs uppercase tracking-wide text-slate-500">Khoảng giá</div>
        <div className="mt-2">
          <Slider
            min={0}
            max={5000}
            step={50}
            value={price}
            onValueChange={setPrice}
          />
          <div className="mt-2 text-sm text-slate-700">
            {price[0].toLocaleString("vi-VN")}k — {price[1].toLocaleString("vi-VN")}k
          </div>
        </div>
      </div>

      <div>
        <div className="text-xs uppercase tracking-wide text-slate-500">Thương hiệu</div>
        <div className="mt-2 space-y-2">
          {BRANDS.map((b) => (
            <label key={b} className="flex items-center gap-2">
              <Checkbox
                checked={brands.includes(b)}
                onCheckedChange={() => toggle(brands, setBrands, b)}
              />
              <span className="text-sm">{b}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <div className="text-xs uppercase tracking-wide text-slate-500">Tùy chọn</div>
        <div className="mt-2 space-y-2">
          {FEATURES.map((f) => (
            <label key={f} className="flex items-center gap-2">
              <Checkbox
                checked={flags.includes(f)}
                onCheckedChange={() => toggle(flags, setFlags, f)}
              />
              <span className="text-sm">{f}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="rounded-xl border bg-white p-3 text-xs text-slate-600">
        <div><span className="font-medium text-slate-900">Danh mục:</span> {category}</div>
        {subcategory && <div><span className="font-medium text-slate-900">Phân loại:</span> {subcategory}</div>}
      </div>
    </div>
  );
}
