import Header from "@/components/layout/client/Header";
import Footer from "@/components/layout/client/Footer";
import CartView from "@/components/layout/client/cart/CartView";

export default function CartPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 md:px-16 py-8 space-y-6">
        <section className="rounded-2xl border bg-white/70 p-5 backdrop-blur">
          <h1 className="text-2xl font-bold tracking-tight">Giỏ hàng</h1>
          <p className="mt-1 text-sm text-slate-600">Kiểm tra sản phẩm trước khi thanh toán.</p>
        </section>

        <CartView />
      </main>
      <Footer />
    </>
  );
}
