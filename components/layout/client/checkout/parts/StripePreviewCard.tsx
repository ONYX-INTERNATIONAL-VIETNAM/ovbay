"use client";

import * as React from "react";

export default function StripePreviewCard({ publishableKey }: { publishableKey?: string }) {
  return (
    <div className="space-y-2">
      <div className="rounded-xl border bg-white px-3 py-3">
        <div className="flex flex-col gap-2">
          <input
            className="w-full rounded-lg border bg-white px-3 py-2 text-sm"
            placeholder="Số thẻ (ví dụ: 4242 4242 4242 4242)"
          />
          <div className="grid grid-cols-2 gap-2">
            <input className="rounded-lg border bg-white px-3 py-2 text-sm" placeholder="MM/YY" />
            <input className="rounded-lg border bg-white px-3 py-2 text-sm" placeholder="CVC" />
          </div>
        </div>
      </div>
      <div className="text-xs text-slate-500">
        {(publishableKey && publishableKey.startsWith("pk_")) ? (
          <>Đã cấu hình khóa công khai Stripe (client). Việc tạo PaymentIntent/confirm hãy gọi qua backend của bạn.</>
        ) : (
          <>Bạn có thể truyền <code>NEXT_PUBLIC_STRIPE_PUBLIC_KEY</code> để hiển thị trạng thái đã cấu hình khóa.</>
        )}
      </div>
    </div>
  );
}
