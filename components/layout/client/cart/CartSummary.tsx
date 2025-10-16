"use client";

import { useRouter } from "next/navigation";

export default function CartSummary({
  subtotal,
  onClear,
}: {
  subtotal: number;
  onClear: () => void;
}) {
  const router = useRouter();

  // mock vận chuyển/giảm giá — thay bằng tính toán thật khi có
  const shipping: number = subtotal > 0 ? 0 : 0;
  const discount = 0;
  const total = Math.max(0, subtotal + shipping - discount);

  return (
    <aside className="rounded-2xl border bg-white/70 p-5 backdrop-blur">
      <h2 className="text-lg font-semibold">Tổng quan</h2>

      <div className="mt-3 space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Tạm tính</span>
          <span className="font-medium">{subtotal.toLocaleString("vi-VN")}₫</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Vận chuyển</span>
          <span className="font-medium">{shipping === 0 ? "Miễn phí" : `${shipping.toLocaleString("vi-VN")}₫`}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Giảm giá</span>
          <span className="font-medium">{discount > 0 ? `- ${discount.toLocaleString("vi-VN")}₫` : "—"}</span>
        </div>
        <div className="my-2 border-t" />
        <div className="flex items-center justify-between text-base">
          <span className="font-semibold">Thành tiền</span>
          <span className="font-extrabold text-slate-900">{total.toLocaleString("vi-VN")}₫</span>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <button
          onClick={() => router.push("/checkout")}
          disabled={subtotal <= 0}
          className="h-11 rounded-xl bg-[var(--secondary-color)] px-5 text-sm font-medium text-slate-900 hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Thanh toán
        </button>
        <button
          onClick={onClear}
          className="h-11 rounded-xl border bg-white px-5 text-sm hover:bg-slate-50"
        >
          Xóa giỏ hàng
        </button>
      </div>

      <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-slate-600">
        <li>Đơn hàng sẽ giữ trong 30 phút sau khi chuyển qua thanh toán.</li>
        <li>Áp dụng mã giảm giá ở bước thanh toán.</li>
      </ul>
    </aside>
  );
}
