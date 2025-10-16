"use client";

import * as React from "react";
import Link from "next/link";
import CartItemRow from "@/components/layout/client/cart/CartItemRow";
import CartSummary from "@/components/layout/client/cart/CartSummary";
import { useCart } from "@/components/layout/client/cart/useCart";

export default function CartView() {
  const cart = useCart();

  // Hydration guard: chỉ render state thật sau khi client mount
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => setHydrated(true), []);

  // Skeleton khi chưa hydrate
  if (!hydrated) {
    return (
      <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-2xl border bg-white/70 p-3 backdrop-blur">
          <div className="animate-pulse space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-20 rounded-xl bg-slate-200/60" />
            ))}
          </div>
        </div>
        <div className="rounded-2xl border bg-white/70 p-5 backdrop-blur">
          <div className="h-6 w-32 animate-pulse rounded bg-slate-200/60" />
          <div className="mt-4 space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-slate-200/60" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200/60" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200/60" />
          </div>
        </div>
      </section>
    );
  }

  if (cart.items.length === 0) {
    return (
      <section className="rounded-2xl border bg-white/70 p-12 text-center text-slate-600 backdrop-blur">
        <div className="text-lg font-semibold text-slate-900">Giỏ hàng trống</div>
        <p className="mt-2">Tiếp tục mua sắm và thêm sản phẩm bạn yêu thích.</p>
        <Link
          href="/"
          className="mt-4 inline-block rounded-xl bg-[var(--secondary-color)] px-4 py-2 text-sm font-medium text-slate-900 hover:bg-amber-400"
        >
          Về trang chủ
        </Link>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between">
        <h2 className="text-lg font-semibold">
          Có <span className="text-slate-900">{cart.items.length}</span> sản phẩm trong giỏ
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* danh sách items */}
        <div className="rounded-2xl border bg-white/70 p-3 backdrop-blur">
          <div className="divide-y">
            {cart.items.map((it) => (
              <CartItemRow
                key={it.id}
                item={it}
                onInc={() => cart.inc(it.id)}
                onDec={() => cart.dec(it.id)}
                onQty={(q) => cart.setQty(it.id, q)}
                onRemove={() => cart.remove(it.id)}
              />
            ))}
          </div>
        </div>

        {/* summary */}
        <CartSummary subtotal={cart.subtotal} onClear={cart.clear} />
      </div>
    </section>
  );
}
