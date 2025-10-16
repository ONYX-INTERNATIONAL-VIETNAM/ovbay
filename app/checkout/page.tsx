"use client"

import Header from "@/components/layout/client/Header";
import Footer from "@/components/layout/client/Footer";
import CheckoutView from "@/components/layout/client/checkout/CheckoutView";

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 md:px-16 py-8 space-y-6">
        <section className="rounded-2xl border bg-white/70 p-5 backdrop-blur">
          <h1 className="text-2xl font-bold tracking-tight">Thanh toán</h1>
          <p className="mt-1 text-sm text-slate-600">
            Nhập thông tin giao hàng và chọn phương thức thanh toán để hoàn tất đơn hàng.
          </p>
        </section>

        <CheckoutView
          onPlaceOrder={async (payload) => {
            console.log("[UI] payload gửi về backend của bạn:", payload);
            // TODO: gọi API backend của bạn ở đây
            window.location.href = `/checkout/success?orderId=OV${Math.floor(Math.random()*1e8).toString().padStart(8,"0")}`;
          }}
          // có thể lấy từ .env (NEXT_PUBLIC_STRIPE_PUBLIC_KEY) hoặc bỏ trống nếu chưa
          stripePublishableKey={process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || ""}
          userPointsBalance={1200} // mock: số xu đang có
        />
      </main>
      <Footer />
    </>
  );
}
