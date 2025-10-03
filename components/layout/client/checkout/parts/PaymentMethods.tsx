"use client";

import * as React from "react";
import dynamic from "next/dynamic";

export type PaymentValues = {
  method: "stripe" | "paypal" | "card";
  // card thủ công (giữ nếu bạn muốn)
  cardName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  // paypal
  paypalEmail: string;
  // stripe
  stripeName?: string;
  stripeEmail?: string;
};

const StripeCardForm = dynamic(() => import("./StripePreviewCard"), { ssr: false });

export default function PaymentMethods({
  value,
  onChange,
  stripePk,
}: {
  value: PaymentValues;
  onChange: (v: PaymentValues) => void;
  stripePk?: string;
}) {
  // ✅ dùng generic để đảm bảo type chính xác, không cần any
  const set = <K extends keyof PaymentValues>(k: K, v: PaymentValues[K]) => {
    onChange({ ...value, [k]: v });
  };

  return (
    <div className="mt-4 space-y-4">
      <div className="flex flex-wrap gap-2">
        {[
          { k: "stripe", label: "Stripe (thẻ)" },
          { k: "paypal", label: "PayPal" },
          // { k: "card", label: "Thẻ thủ công" },
        ].map((m) => (
          <button
            key={m.k}
            onClick={() => set("method", m.k as PaymentValues["method"])}
            className={`rounded-xl border px-4 py-2 text-sm ${
              value.method === m.k ? "bg-amber-500 text-slate-900 border-amber-500" : "bg-white hover:bg-slate-50"
            }`}
            type="button"
          >
            {m.label}
          </button>
        ))}
      </div>

      {value.method === "stripe" && (
        <div className="space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <label className="space-y-1">
              <span className="text-sm text-slate-600">Tên chủ thẻ</span>
              <input
                className="w-full rounded-xl border bg-white px-3 py-2"
                value={value.stripeName || ""}
                onChange={(e) => set("stripeName", e.target.value)}
                placeholder="NGUYEN VAN A"
              />
            </label>
            <label className="space-y-1">
              <span className="text-sm text-slate-600">Email</span>
              <input
                type="email"
                className="w-full rounded-xl border bg-white px-3 py-2"
                value={value.stripeEmail || ""}
                onChange={(e) => set("stripeEmail", e.target.value)}
                placeholder="you@example.com"
              />
            </label>
          </div>

          {/* UI xem trước vùng nhập thẻ theo style Stripe (mock/preview) */}
          <StripeCardForm publishableKey={stripePk || ""} />
          <p className="text-xs text-slate-500">
            UI demo thẻ Stripe. Việc tạo/confirm sẽ do backend gọi Stripe.
          </p>
        </div>
      )}

      {value.method === "paypal" && (
        <div className="grid gap-3">
          <label className="space-y-1">
            <span className="text-sm text-slate-600">Email PayPal</span>
            <input
              type="email"
              className="w-full rounded-xl border bg-white px-3 py-2"
              value={value.paypalEmail}
              onChange={(e) => set("paypalEmail", e.target.value)}
              placeholder="you@paypal.com"
            />
          </label>
          <p className="text-xs text-slate-500">
            Bạn sẽ được chuyển đến PayPal để xác nhận (backend xử lý).
          </p>
        </div>
      )}
    </div>
  );
}
