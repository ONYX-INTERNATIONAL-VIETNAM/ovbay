"use client";

import Image from "next/image";
import { CartItem } from "./useCart";

export default function CartItemRow({
  item,
  onInc,
  onDec,
  onQty,
  onRemove,
}: {
  item: CartItem;
  onInc: () => void;
  onDec: () => void;
  onQty: (qty: number) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-start gap-3 p-3 md:gap-4">
      {/* image */}
      <div className="relative h-20 w-20 overflow-hidden rounded-xl border bg-white">
        {/* nếu bạn dùng <Image> cần có ảnh thật trong /public; có thể đổi sang div bg-image */}
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>

      {/* info */}
      <div className="flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="line-clamp-2 text-sm font-medium">{item.title}</div>
            {item.store && <div className="text-xs text-slate-500">{item.store}</div>}
          </div>

          <div className="text-right">
            <div className="text-sm font-semibold">
              {item.price.toLocaleString("vi-VN")}₫
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          {/* qty control */}
          <div className="flex items-center rounded-xl border bg-white">
            <button
              onClick={onDec}
              className="h-9 w-9 disabled:opacity-40"
              disabled={item.qty <= 1}
              aria-label="Giảm"
            >–</button>
            <input
              value={item.qty}
              onChange={(e) => {
                const n = Number(e.target.value);
                if (!Number.isNaN(n)) onQty(n);
              }}
              inputMode="numeric"
              className="h-9 w-12 border-x text-center outline-none"
              aria-label="Số lượng"
            />
            <button
              onClick={onInc}
              className="h-9 w-9 disabled:opacity-40"
              disabled={item.qty >= item.stock}
              aria-label="Tăng"
            >+</button>
          </div>

          {/* stock + remove */}
          <div className="flex items-center gap-3 text-xs text-slate-600">
            <span>
              {item.stock > 0 ? (
                <>Còn {item.stock} sp</>
              ) : (
                <span className="text-rose-600">Hết hàng</span>
              )}
            </span>
            <button
              onClick={onRemove}
              className="rounded-lg border bg-white px-2.5 py-1 hover:bg-slate-50"
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
