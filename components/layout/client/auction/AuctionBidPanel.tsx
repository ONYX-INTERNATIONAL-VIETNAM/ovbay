"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

export default function AuctionBidPanel({
  auctionId,
  increment,
  buyNow,
  endsAt,
  minBid,
}: {
  auctionId: string;
  current: number;
  increment: number;
  buyNow?: number;
  endsAt: string;
  minBid: number;
}) {
  const router = useRouter();
  const [bid, setBid] = React.useState(minBid);
  const [err, setErr] = React.useState<string | null>(null);

  const plusInc = () => setBid((v) => v + increment);
  const minusInc = () => setBid((v) => Math.max(minBid, v - increment));

  const submit = () => {
    if (Date.now() >= new Date(endsAt).getTime()) {
      setErr("Phiên đã kết thúc.");
      return;
    }
    if (bid < minBid) {
      setErr(`Giá đặt phải ≥ ${minBid.toLocaleString("vi-VN")}₫`);
      return;
    }
    // TODO: gọi API đặt giá; hiện mock:
    alert(`Đặt giá ${bid.toLocaleString("vi-VN")}₫ cho phiên #${auctionId} thành công (mock)`);
    // Có thể refresh dữ liệu:
    router.refresh();
    setErr(null);
  };

  const instantBuy = () => {
    if (!buyNow) return;
    alert(`Mua ngay ${buyNow.toLocaleString("vi-VN")}₫ (mock)`);
    router.push("/checkout");
  };

  return (
    <div className="rounded-2xl border bg-white p-4">
      <div className="text-sm text-slate-600">Đặt giá của bạn (tối thiểu {minBid.toLocaleString("vi-VN")}₫)</div>

      <div className="mt-2 flex flex-wrap items-center gap-3">
        <div className="flex items-center rounded-xl border bg-white">
          <button onClick={minusInc} className="h-10 w-10" aria-label="Giảm"><span>-</span></button>
          <input
            value={bid}
            onChange={(e) => {
              const n = Number(e.target.value);
              if (!Number.isNaN(n)) setBid(n);
            }}
            inputMode="numeric"
            className="h-10 w-28 border-x text-center outline-none"
            aria-label="Giá đặt"
          />
          <button onClick={plusInc} className="h-10 w-10" aria-label="Tăng"><span>+</span></button>
        </div>

        <button
          onClick={submit}
          className="h-11 rounded-xl bg-[var(--secondary-color)] px-5 text-sm font-medium text-slate-900 hover:bg-amber-400"
        >
          Đặt giá
        </button>

        {buyNow && (
          <button
            onClick={instantBuy}
            className="h-11 rounded-xl border bg-white px-5 text-sm hover:bg-slate-50"
          >
            Mua ngay {buyNow.toLocaleString("vi-VN")}₫
          </button>
        )}
      </div>

      {err && <div className="mt-2 text-sm text-rose-600">{err}</div>}

      <ul className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
        <li>• Bước giá tối thiểu: {increment.toLocaleString("vi-VN")}₫</li>
        <li>• Tự động từ chối nếu nhỏ hơn giá hiện tại + bước giá</li>
        <li>• Thời gian thực: có thể refresh để xem cập nhật</li>
      </ul>
    </div>
  );
}
