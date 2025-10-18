"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/layout/client/cart/useCart";
import AddressForm, { AddressValues } from "./parts/AddressForm";
import PaymentMethods, { PaymentValues } from "./parts/PaymentMethods";
import OrderSummary, { PricingInput } from "./parts/OrderSummary";

export type CheckoutPayload = {
  address: AddressValues;
  payment: PaymentValues & {
    // nếu chọn stripe, bạn sẽ cần đọc cardElement từ Stripe (ở component con)
    // và gọi API backend để tạo PaymentIntent + confirm server-side (tuỳ kiến trúc)
  };
  pricing: (PricingInput & { subtotal: number; shipping: number; total: number });
  items: Array<{ id: string; title: string; price: number; qty: number }>;
};

type Props = {
  onPlaceOrder?: (payload: CheckoutPayload) => Promise<void> | void;
  stripePublishableKey?: string;
  userPointsBalance?: number;
};

// Helper an toàn để lấy message từ unknown
function getErrorMessage(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (typeof e === "string") return e;
  try {
    return JSON.stringify(e);
  } catch {
    return "Đã xảy ra lỗi không xác định.";
  }
}

export default function CheckoutView({
  onPlaceOrder,
  stripePublishableKey,
  userPointsBalance = 0,
}: Props) {
  const router = useRouter();
  const cart = useCart();

  React.useEffect(() => {
    if (cart.items.length === 0) router.push("/cart", { scroll: false });
  }, [cart.items.length, router]);

  const [address, setAddress] = React.useState<AddressValues>({
    fullName: "",
    phone: "",
    email: "",
    street: "",
    ward: "",
    district: "",
    city: "",
    note: "",
    saveInfo: true,
  });

  const [payment, setPayment] = React.useState<PaymentValues>({
    method: "stripe", // stripe | paypal | (card optional)
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    paypalEmail: "",
    stripeName: "",
    stripeEmail: "",
  });

  // mở rộng type để có 'total'
  const [pricing] = React.useState<PricingInput & { total: number }>({
    couponCode: "",
    couponDiscount: 0,
    pointsUse: 0,
    pointsDiscount: 0,
    total: 0,
  });

  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const shipping = cart.subtotal > 0 ? 0 : 0;
  const payAmount = Math.max(
    0,
    cart.subtotal + shipping - pricing.couponDiscount - pricing.pointsDiscount
  );

  function validate(): string | null {
    const rq: (keyof AddressValues)[] = ["fullName", "phone", "street", "district", "city"];
    for (const k of rq) if (!String(address[k] ?? "").trim()) return "Vui lòng nhập đầy đủ thông tin nhận hàng.";
    if (payment.method === "paypal") {
      if (!/^\S+@\S+\.\S+$/.test(payment.paypalEmail)) return "Email PayPal không hợp lệ.";
    }
    if (payment.method === "stripe" && !payment.stripeName) {
      return "Nhập tên chủ thẻ cho Stripe.";
    }
    return null;
  }

  const placeOrder = async () => {
    setError(null);
    const msg = validate();
    if (msg) return setError(msg);
    setSubmitting(true);

    try {
      // Lưu address local (tuỳ chọn)
      if (address.saveInfo && typeof window !== "undefined") {
        localStorage.setItem("ov_address", JSON.stringify(address));
        if (pricing.pointsUse > 0) {
          const now = Math.max(0, (userPointsBalance || 0) - pricing.pointsUse);
          localStorage.setItem("ov_points", String(now));
        }
      }

      const payload: CheckoutPayload = {
        address,
        payment,
        pricing: {
          ...pricing,
          subtotal: cart.subtotal,
          shipping,
          total: payAmount,
        },
        items: cart.items.map((i) => ({
          id: i.id,
          title: i.title,
          price: i.price,
          qty: i.qty,
        })),
      };

      await onPlaceOrder?.(payload);

      // Clear cart sau khi backend xác nhận thành công
      cart.clear();
    } catch (e: unknown) {
      setError(getErrorMessage(e) || "Không thể hoàn tất thanh toán.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <div className="space-y-6">
        <div className="rounded-2xl border bg-white/70 p-5 backdrop-blur">
          <h2 className="text-lg font-semibold">Địa chỉ nhận hàng</h2>
          <AddressForm value={address} onChange={setAddress} />
        </div>

        <div className="rounded-2xl border bg-white/70 p-5 backdrop-blur">
          <h2 className="text-lg font-semibold">Phương thức thanh toán</h2>
          <PaymentMethods
            value={payment}
            onChange={setPayment}
            stripePk={stripePublishableKey || ""} // chỉ để render UI Stripe Elements; confirm để backend xử lý
          />
          <p className="mt-2 text-xs text-slate-500">
            Lưu ý: Đây là giao diện. Xử lý tạo/confirm thanh toán sẽ do API backend của bạn đảm nhiệm.
          </p>
        </div>

        {error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
            {error}
          </div>
        )}
      </div>

      <aside className="rounded-2xl border bg-white/70 p-5 backdrop-blur">
        <OrderSummary
          items={cart.items}
          subtotal={cart.subtotal}
          shipping={0}
          pointsBalance={1200}
          ratePerPoint={100}
          maxPointsRate={0.2}
          initialCouponCode=""
          onPricingChange={(p) => {
            // p.total là số tiền cuối cùng sau coupon + xu
            // bạn có thể dùng p.total để gửi qua API thanh toán/backend
            console.log("pricing:", p);
          }}
        />

        <button
          onClick={placeOrder}
          disabled={submitting || cart.items.length === 0}
          className="mt-4 h-11 w-full rounded-xl bg-[var(--secondary-color)] px-5 text-sm font-medium text-white hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting
            ? "Đang xử lý…"
            : `Xác nhận thanh toán (${payAmount.toLocaleString("vi-VN")}₫)`}
        </button>
        <p className="mt-2 text-xs text-slate-500">
          Bằng cách tiếp tục, bạn đồng ý với Điều khoản & Chính sách bảo mật của OVBAY.
        </p>
      </aside>
    </section>
  );
}
