"use client";

import * as React from "react";
import Link from "next/link";

type Item = { id: string; title: string; price: number; image: string; qty: number; stock: number; store?: string };

export type PricingChange = {
  couponCode: string;
  couponDiscount: number; // VND
  pointsUse: number;      // số xu dùng
  pointsDiscount: number; // VND
  total: number;          // tổng sau giảm
};

export type PricingInput = PricingChange;

export default function OrderSummary({
  items,
  subtotal,
  shipping = 0,
  discount = 0,           // legacy: nếu bạn đã truyền giảm giá ngoài
  // --- mới thêm ---
  pointsBalance = 0,      // tổng xu người dùng đang có
  ratePerPoint = 100,     // 1 xu = 100đ
  maxPointsRate = 0.2,    // tối đa 20% subtotal được trừ bằng xu
  initialCouponCode = "", // nếu muốn prefill mã
  onPricingChange,        // callback báo ngược ra ngoài (tuỳ chọn)
}: {
  items: Item[];
  subtotal: number;
  shipping?: number;
  discount?: number;

  // mới thêm (tùy chọn)
  pointsBalance?: number;
  ratePerPoint?: number;
  maxPointsRate?: number;
  initialCouponCode?: string;
  onPricingChange?: (p: PricingChange) => void;
}) {
  // --- state coupon ---
  const [couponCode, setCouponCode] = React.useState(initialCouponCode);
  const [couponMsg, setCouponMsg] = React.useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = React.useState(0);

  // --- state points ---
  const [pointsUse, setPointsUse] = React.useState(0);
  const [pointsDiscount, setPointsDiscount] = React.useState(0);

  // Áp dụng mã đơn giản (demo): OV10 (-10% tối đa 200k) & FREESHIP (chỉ hiển thị note)
  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    let off = 0;
    let msg: string | null = null;

    if (!code) {
      setCouponMsg("Nhập mã trước khi áp dụng.");
      setCouponDiscount(0);
      return;
    }

    if (code === "OV10") {
      off = Math.min(Math.round(subtotal * 0.1), 200_000);
      msg = `Áp dụng -10% (tối đa 200.000đ): -${off.toLocaleString("vi-VN")}₫`;
    } else if (code === "FREESHIP") {
      off = 0;
      msg = "Miễn phí vận chuyển (áp dụng ở bước vận chuyển).";
    } else {
      off = 0;
      msg = "Mã không hợp lệ.";
    }

    setCouponDiscount(off);
    setCouponMsg(msg);
  };

  // Tính giới hạn xu có thể dùng
  const maxPointVND = Math.floor(subtotal * maxPointsRate);
  const maxPointByBalance = pointsBalance * ratePerPoint;
  const maxVND = Math.min(maxPointVND, maxPointByBalance);

  const onChangePoints = (nextPoints: number) => {
    const clampedPoints = Math.max(0, Math.min(pointsBalance, nextPoints));
    const discountVND = Math.min(maxVND, clampedPoints * ratePerPoint);
    setPointsUse(clampedPoints);
    setPointsDiscount(discountVND);
  };

  // Tổng cuối
  const total = Math.max(0, subtotal + shipping - discount - couponDiscount - pointsDiscount);

  // Báo ngược ra ngoài khi thay đổi
  React.useEffect(() => {
    onPricingChange?.({
      couponCode,
      couponDiscount,
      pointsUse,
      pointsDiscount,
      total,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [couponCode, couponDiscount, pointsUse, pointsDiscount, total]);

  return (
    <div>
      <h2 className="text-lg font-semibold">Đơn hàng của bạn</h2>

      <div className="mt-3 space-y-2">
        {items.map((it) => (
          <div key={it.id} className="flex items-start justify-between rounded-xl border bg-white p-3">
            <div className="flex-1 pr-3">
              <div className="line-clamp-2 text-sm font-medium">{it.title}</div>
              {it.store && <div className="text-xs text-slate-500">{it.store}</div>}
              <div className="mt-1 text-xs text-slate-500">Số lượng: {it.qty}</div>
            </div>
            <div className="text-sm font-semibold">{(it.price * it.qty).toLocaleString("vi-VN")}₫</div>
          </div>
        ))}
      </div>

      {/* Coupon */}
      <div className="mt-4 rounded-xl border bg-white p-3">
        <div className="text-sm font-medium">Mã giảm giá</div>
        <div className="mt-2 flex gap-2">
          <input
            className="flex-1 rounded-xl border bg-white px-3 py-2 text-sm"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Nhập mã (VD: OV10)"
          />
          <button
            onClick={applyCoupon}
            className="rounded-xl border bg-white px-3 py-2 text-sm hover:bg-slate-50"
            type="button"
          >
            Áp dụng
          </button>
        </div>
        {couponMsg && <div className="mt-2 text-xs text-slate-600">{couponMsg}</div>}
      </div>

      {/* Points */}
      <div className="mt-3 rounded-xl border bg-white p-3">
        <div className="text-sm font-medium">Dùng xu OVBAY</div>
        <div className="mt-1 text-xs text-slate-500">
          Số dư: <b>{pointsBalance.toLocaleString("vi-VN")}</b> xu · 1 xu = {ratePerPoint.toLocaleString("vi-VN")}₫ ·
          {" "}Tối đa {Math.floor(maxVND / ratePerPoint).toLocaleString("vi-VN")} xu ({maxVND.toLocaleString("vi-VN")}₫)
        </div>
        <div className="mt-2 flex items-center gap-2">
          <input
            type="number"
            min={0}
            className="w-32 rounded-xl border bg-white px-3 py-2 text-sm"
            value={pointsUse}
            onChange={(e) => onChangePoints(Number(e.target.value))}
          />
          <div className="text-sm text-slate-600">
            Giảm: <b>{pointsDiscount.toLocaleString("vi-VN")}₫</b>
          </div>
          <button
            type="button"
            onClick={() => onChangePoints(0)}
            className="ml-auto rounded-xl border bg-white px-3 py-2 text-sm hover:bg-slate-50"
          >
            Xóa
          </button>
        </div>
      </div>

      {/* Totals */}
      <div className="mt-3 space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Tạm tính</span>
          <span className="font-medium">{subtotal.toLocaleString("vi-VN")}₫</span>
        </div>
        {discount > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Giảm giá (khác)</span>
            <span className="font-medium">- {discount.toLocaleString("vi-VN")}₫</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Giảm giá (coupon)</span>
          <span className="font-medium">- {couponDiscount.toLocaleString("vi-VN")}₫</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Giảm giá (xu)</span>
          <span className="font-medium">- {pointsDiscount.toLocaleString("vi-VN")}₫</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Vận chuyển</span>
          <span className="font-medium">{shipping === 0 ? "Miễn phí" : `${shipping.toLocaleString("vi-VN")}₫`}</span>
        </div>
        <div className="my-2 border-t" />
        <div className="flex items-center justify-between text-base">
          <span className="font-semibold">Thành tiền</span>
          <span className="font-extrabold text-slate-900">{total.toLocaleString("vi-VN")}₫</span>
        </div>
      </div>

      <div className="mt-3 text-xs text-slate-500">
        <Link href="/cart" className="hover:underline">
          Quay lại giỏ hàng
        </Link>{" "}
        để chỉnh sửa sản phẩm.
      </div>
    </div>
  );
}
