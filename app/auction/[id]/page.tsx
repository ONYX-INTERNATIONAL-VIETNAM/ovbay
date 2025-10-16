import Header from "@/components/layout/client/Header";
import Footer from "@/components/layout/client/Footer";

import Breadcrumbs from "@/components/layout/client/category/Breadcrumbs";
import Gallery from "@/components/layout/client/item/Gallery";
import SellerCard from "@/components/layout/client/item/SellerCard";

import AuctionBidPanel from "@/components/layout/client/auction/AuctionBidPanel";
import AuctionHistory from "@/components/layout/client/auction/AuctionHistory";
import AuctionCountdown from "@/components/layout/client/auction/AuctionCountdown";

import { getAuctionById } from "@/lib/data";
import { notFound } from "next/navigation";

export default function AuctionDetailPage({ params }: { params: { id: string } }) {
  const a = getAuctionById(params.id);
  if (!a) return notFound();

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 md:px-16 py-8 space-y-6">
        <Breadcrumbs
          items={[
            { href: "/", label: "Trang chủ" },
            { href: "/auctions", label: "Đấu giá" },
            { href: `/auction/${a.id}`, label: a.title, current: true },
          ]}
        />

        <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          {/* Gallery trái */}
          <div className="rounded-2xl border bg-white/70 p-3 backdrop-blur">
            <Gallery images={a.images} />
          </div>

          {/* Bảng thông tin + Đặt giá */}
          <div className="space-y-4">
            <div className="rounded-2xl border bg-white/70 p-5 backdrop-blur">
              <h1 className="text-2xl font-bold tracking-tight">{a.title}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                <span>Mã phiên: <span className="font-medium text-slate-900">{a.id}</span></span>
                <span>•</span>
                <span>Tình trạng: {a.cond === "new" ? "Mới" : "Đã qua sử dụng"}</span>
                {a.sku && (<><span>•</span><span>SKU: {a.sku}</span></>)}
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border bg-white p-4">
                  <div className="text-xs uppercase tracking-wide text-slate-500">Giá hiện tại</div>
                  <div className="mt-1 text-3xl font-extrabold text-slate-900">
                    {a.current.toLocaleString("vi-VN")}₫
                  </div>
                  <div className="mt-2 text-sm text-slate-600">
                    Bước giá: <span className="font-medium">{a.increment.toLocaleString("vi-VN")}₫</span>
                  </div>
                  <div className="mt-2 text-sm text-slate-600">
                    Giá khởi điểm: {a.startPrice.toLocaleString("vi-VN")}₫
                  </div>
                </div>

                <div className="rounded-xl border bg-white p-4">
                  <div className="text-xs uppercase tracking-wide text-slate-500">Còn lại</div>
                  <AuctionCountdown endsAt={a.endsAt} />
                  <div className="mt-2 text-xs text-slate-500">
                    Kết thúc: {new Date(a.endsAt).toLocaleString("vi-VN")}
                  </div>
                </div>
              </div>

              {/* Panel đặt giá (Client) */}
              <div className="mt-4">
                <AuctionBidPanel
                  auctionId={a.id}
                  current={a.current}
                  increment={a.increment}
                  buyNow={a.buyNow}
                  endsAt={a.endsAt}
                  minBid={a.current + a.increment}
                />
              </div>

              {/* badge vận chuyển / đổi trả */}
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                {a.ship?.free && (
                  <span className="rounded-full border bg-white px-2.5 py-1">Freeship</span>
                )}
                {a.ship?.fast && (
                  <span className="rounded-full border bg-white px-2.5 py-1">Hỏa tốc</span>
                )}
                {a.returnDays && (
                  <span className="rounded-full border bg-white px-2.5 py-1">Đổi trả {a.returnDays} ngày</span>
                )}
              </div>
            </div>

            <SellerCard
              seller={{
                slug: a.storeSlug,
                name: a.store,
                rating: a.sellerRating,
                followers: a.sellerFollowers,
                since: a.sellerSince,
              }}
            />
          </div>
        </section>

        {/* Mô tả & Lịch sử bid */}
        <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-2xl border bg-white/70 p-5 backdrop-blur">
            <h2 className="text-lg font-semibold">Mô tả sản phẩm</h2>
            <div className="prose mt-2 max-w-none text-slate-700">
              <p>{a.description}</p>
            </div>
            {a.specs && (
              <div className="mt-4 grid gap-2 md:grid-cols-2">
                {Object.entries(a.specs).map(([k, v]) => (
                  <div key={k} className="rounded-xl border bg-white p-3">
                    <div className="text-xs uppercase tracking-wide text-slate-500">{k}</div>
                    <div className="text-sm text-slate-800">{String(v)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-2xl border bg-white/70 p-5 backdrop-blur">
            <h2 className="text-lg font-semibold">Lịch sử đặt giá</h2>
            <AuctionHistory auctionId={a.id} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
