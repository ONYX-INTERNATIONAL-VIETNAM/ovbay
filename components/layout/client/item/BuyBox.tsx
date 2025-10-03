"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { addToCart } from "@/utils/addToCart";

type BuyBoxProps = {
  product: {
    id: string;
    title: string;
    price: number;
    image: string;   // ảnh cover
    stock: number;
    store?: string;
  };
  min?: number;
  max?: number;      // giới hạn mỗi lần add
};

export default function BuyBox({ product, min = 1, max = 10 }: BuyBoxProps) {
  const router = useRouter();
  const [qty, setQty] = React.useState(min);

  const dec = () => setQty((v) => Math.max(min, v - 1));
  const inc = () => setQty((v) => Math.min(max, v + 1));

  const handleAdd = () => {
    if (product.stock <= 0) return;
    addToCart(
      {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        stock: product.stock,
        store: product.store,
      },
      qty
    );
    router.push("/cart");
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center rounded-xl border bg-white">
        <button
          onClick={dec}
          disabled={qty <= min}
          className="h-10 w-10 disabled:opacity-40"
          aria-label="Giảm số lượng"
        >
          –
        </button>
        <input
          value={qty}
          onChange={(e) => {
            const n = Number(e.target.value);
            if (!Number.isNaN(n)) setQty(Math.max(min, Math.min(max, n)));
          }}
          inputMode="numeric"
          className="h-10 w-12 border-x text-center outline-none"
          aria-label="Số lượng"
        />
        <button
          onClick={inc}
          disabled={qty >= Math.min(max, product.stock)}
          className="h-10 w-10 disabled:opacity-40"
          aria-label="Tăng số lượng"
        >
          +
        </button>
      </div>

      <button
        onClick={handleAdd}
        disabled={product.stock <= 0}
        className="h-11 rounded-xl bg-amber-500 px-5 text-sm font-medium text-slate-900 hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Thêm vào giỏ
      </button>

      <div className="text-sm text-slate-600">
        {product.stock > 0 ? (
          <>Còn <span className="font-medium text-slate-900">{product.stock}</span> sản phẩm</>
        ) : (
          <span className="text-rose-600">Hết hàng</span>
        )}
      </div>
    </div>
  );
}
