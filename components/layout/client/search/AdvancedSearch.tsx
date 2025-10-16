"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const CATS = [
  { key: "all", label: "Tất cả" },
  { key: "electronics", label: "Điện tử" },
  { key: "fashion", label: "Thời trang" },
  { key: "home", label: "Gia dụng" },
  { key: "collectibles", label: "Sưu tầm" },
];

// nếu có brand thực tế hãy thay mảng này
const BRANDS = ["Onyx", "KeyLab", "RetroHub", "CamZone", "HomePlus"];
const CONDITIONS = [
  { key: "new", label: "Mới" },
  { key: "used", label: "Đã qua sử dụng" },
  { key: "refurb", label: "Tân trang" },
];

export default function AdvancedSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  // state lấy từ URL nếu có
  const [minPrice, setMinPrice] = React.useState(Number(sp.get("min") || 0));
  const [maxPrice, setMaxPrice] = React.useState(Number(sp.get("max") || 0));
  const [cat, setCat] = React.useState(sp.get("cat") || "all");
  const [brand, setBrand] = React.useState(sp.get("brand") || "");
  const [condition, setCondition] = React.useState(sp.get("cond") || "");
  const [ship, setShip] = React.useState(sp.get("ship") || ""); // free|fast
  const [onlyAuction, setOnlyAuction] = React.useState(sp.get("auction") === "1");
  const [onlyFeatured, setOnlyFeatured] = React.useState(sp.get("feat") === "1");
  const [store, setStore] = React.useState(sp.get("store") || "");
  const [open, setOpen] = React.useState(false);

  const apply = (e: React.FormEvent) => {
    e.preventDefault();
    const qs = new URLSearchParams(sp.toString());
    const setOrDel = (k: string, v?: string | number | null) => {
      if (v && String(v).trim() !== "" && v !== 0) qs.set(k, String(v));
      else qs.delete(k);
    };
    setOrDel("cat", cat !== "all" ? cat : null);
    setOrDel("min", minPrice || null);
    setOrDel("max", maxPrice || null);
    setOrDel("brand", brand || null);
    setOrDel("cond", condition || null);
    setOrDel("ship", ship || null);
    setOrDel("store", store || null);
    if (onlyAuction) qs.set("auction", "1"); else qs.delete("auction");
    if (onlyFeatured) qs.set("feat", "1"); else qs.delete("feat");

    qs.delete("page"); // reset trang
    router.push(`${pathname}?${qs.toString()}`);
    setOpen(false);
  };

  const reset = () => {
    setMinPrice(0);
    setMaxPrice(0);
    setCat("all");
    setBrand("");
    setCondition("");
    setShip("");
    setOnlyAuction(false);
    setOnlyFeatured(false);
    setStore("");
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl border bg-[var(--secondary-color)] py-3 text-base text-white hover:bg-amber-400 w-full md:w-1/4"
      >
        Tìm kiếm nâng cao
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setOpen(false)}
          />
          {/* modal */}
          <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-white p-5 shadow-xl">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Tìm kiếm nâng cao</h3>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-1 text-sm text-slate-600 hover:bg-slate-100"
                aria-label="Đóng"
              >
                ✕
              </button>
            </div>

            <form onSubmit={apply} className="grid gap-4 md:grid-cols-2">
              {/* Danh mục */}
              <label className="space-y-1">
                <span className="text-sm text-slate-600">Danh mục</span>
                <select
                  className="w-full rounded-xl border bg-white px-3 py-2"
                  value={cat}
                  onChange={(e) => setCat(e.target.value)}
                >
                  {CATS.map((c) => (
                    <option key={c.key} value={c.key}>{c.label}</option>
                  ))}
                </select>
              </label>

              {/* Thương hiệu */}
              <label className="space-y-1">
                <span className="text-sm text-slate-600">Thương hiệu</span>
                <input
                  list="brand-list"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full rounded-xl border px-3 py-2"
                  placeholder="Ví dụ: Onyx"
                />
                <datalist id="brand-list">
                  {BRANDS.map((b) => <option key={b} value={b} />)}
                </datalist>
              </label>

              {/* Giá tối thiểu */}
              <label className="space-y-1">
                <span className="text-sm text-slate-600">Giá tối thiểu (VND)</span>
                <input
                  type="number"
                  min={0}
                  className="w-full rounded-xl border px-3 py-2"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  placeholder="0"
                />
              </label>

              {/* Giá tối đa */}
              <label className="space-y-1">
                <span className="text-sm text-slate-600">Giá tối đa (VND)</span>
                <input
                  type="number"
                  min={0}
                  className="w-full rounded-xl border px-3 py-2"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  placeholder="0"
                />
              </label>

              {/* Tình trạng */}
              <label className="space-y-1">
                <span className="text-sm text-slate-600">Tình trạng</span>
                <select
                  className="w-full rounded-xl border bg-white px-3 py-2"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                >
                  <option value="">Tất cả</option>
                  {CONDITIONS.map((c) => (
                    <option key={c.key} value={c.key}>{c.label}</option>
                  ))}
                </select>
              </label>

              {/* Vận chuyển */}
              <label className="space-y-1">
                <span className="text-sm text-slate-600">Vận chuyển</span>
                <select
                  className="w-full rounded-xl border bg-white px-3 py-2"
                  value={ship}
                  onChange={(e) => setShip(e.target.value)}
                >
                  <option value="">Bất kỳ</option>
                  <option value="free">Miễn phí</option>
                  <option value="fast">Hỏa tốc</option>
                </select>
              </label>

              {/* Chỉ đấu giá / Featured */}
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={onlyAuction}
                    onChange={(e) => setOnlyAuction(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 accent-amber-500"
                  />
                  <span className="text-sm">Chỉ hiển thị đấu giá</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={onlyFeatured}
                    onChange={(e) => setOnlyFeatured(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 accent-amber-500"
                  />
                  <span className="text-sm">Featured</span>
                </label>
              </div>

              {/* Cửa hàng */}
              <label className="space-y-1 md:col-span-2">
                <span className="text-sm text-slate-600">Cửa hàng (slug hoặc tên)</span>
                <input
                  className="w-full rounded-xl border px-3 py-2"
                  value={store}
                  onChange={(e) => setStore(e.target.value)}
                  placeholder="ví dụ: soundx"
                />
              </label>

              <div className="mt-2 flex items-center justify-between md:col-span-2">
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-xl border bg-white px-4 py-2 text-sm hover:bg-slate-50"
                >
                  Đặt lại
                </button>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="rounded-xl border bg-white px-4 py-2 text-sm hover:bg-slate-50"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-[var(--secondary-color)] px-4 py-2 text-sm font-medium text-slate-900 hover:bg-amber-400"
                  >
                    Áp dụng
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
