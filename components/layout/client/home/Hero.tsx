import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative isolate">
      {/* glow decor */}
      <div className="pointer-events-none absolute inset-x-0 -top-6 -z-10 h-[260px] bg-[radial-gradient(600px_220px_at_60%_0%,rgba(245,192,42,.28),transparent_60%)]" />
      <div className="container">
        <div className="grid items-center gap-8 rounded-2xl border bg-white/70 p-6 shadow-[0_10px_30px_rgba(17,24,39,0.08)] backdrop-blur md:grid-cols-2 md:p-10">
          {/* copy */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-1 text-xs text-slate-600 backdrop-blur">
              <span className="inline-block h-2 w-2 rounded-full bg-amber-500" />
              Realtime bidding • Mượt & an toàn
            </div>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              Mua bán & Đấu giá <span className="text-amber-500">chuyên nghiệp</span>
            </h1>
            <p className="mt-3 max-w-xl text-slate-600">
              Trải nghiệm như eBay: tìm kiếm nhanh, đặt giá thông minh, thanh toán an toàn.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="h-11 rounded-xl bg-amber-500 text-slate-900 hover:bg-amber-400">
                <Link href="/auctions">Xem đấu giá</Link>
              </Button>
              <Button variant="outline" asChild className="h-11 rounded-xl">
                <Link href="/c/electronics">Khám phá danh mục</Link>
              </Button>
            </div>
          </div>

          {/* visual */}
          <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-white to-amber-50 p-2">
            <div
              className="h-64 rounded-xl bg-[url('/images/hero-ovbay.jpg')] bg-cover bg-center md:h-72"
              aria-hidden
            />
            <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-amber-200/60 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-6 -left-6 h-28 w-28 rounded-full bg-amber-100/60 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
