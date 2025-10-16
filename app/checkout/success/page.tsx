import Header from "@/components/layout/client/Header";
import Footer from "@/components/layout/client/Footer";
import Link from "next/link";

// Kiểu props cho trang
type PageProps = {
  searchParams?: {
    orderId?: string;
    [key: string]: string | string[] | undefined;
  };
};

export default function CheckoutSuccessPage({ searchParams }: PageProps) {
  const orderId = (searchParams?.orderId as string) || "OV00000000";

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-16">
        <section className="mx-auto max-w-xl rounded-2xl border bg-white/70 p-8 text-center backdrop-blur">
          <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-emerald-100 text-2xl text-emerald-700">
            ✓
          </div>
          <h1 className="text-2xl font-bold">Thanh toán thành công</h1>
          <p className="mt-2 text-slate-600">
            Cảm ơn bạn! Đơn hàng của bạn đã được xác nhận.
          </p>
          <div className="mt-3 rounded-xl border bg-white px-4 py-2 text-sm">
            Mã đơn hàng: <span className="font-semibold">{orderId}</span>
          </div>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/orders" className="rounded-xl border bg-white px-4 py-2 text-sm hover:bg-slate-50">
              Xem đơn hàng
            </Link>
            <Link href="/" className="rounded-xl bg-[var(--secondary-color)] px-4 py-2 text-sm font-medium text-slate-900 hover:bg-amber-400">
              Tiếp tục mua sắm
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
