import Header from "@/components/layout/client/Header";
import Footer from "@/components/layout/client/Footer";

import Breadcrumbs from "@/components/layout/client/category/Breadcrumbs";
import Gallery from "@/components/layout/client/item/Gallery";
import BuyBox from "@/components/layout/client/item/BuyBox";
import SellerCard from "@/components/layout/client/item/SellerCard";
import InfoTabs from "@/components/layout/client/item/InfoTabs";

import { getProductById } from "@/lib/data";
import { notFound } from "next/navigation";

// ✅ Khai báo kiểu tối thiểu cho những gì component đang dùng
type Product = {
  id: string;
  title: string;
  images: string[];
  price: number;
  compareAt?: number;
  stock: number;
  store: string;
  storeSlug: string;

  brand?: string;
  sku?: string;
  cond: "new" | "used";

  category: string;
  categoryName?: string;
  sub?: string;
  subName?: string;

  ship?: { free?: boolean; fast?: boolean };
  returnDays?: number;

  sellerRating?: number;
  sellerFollowers?: number;
  sellerSince?: string;

  description: string;
  specs?: Record<string, string>;
  reviews?: { user: string; rating: number; comment: string; date: string }[];
};

export default function ItemDetailPage({ params }: { params: { id: string } }) {
  // ✅ Ép kiểu về Product | undefined để TS hiểu
  const p = getProductById(params.id) as unknown as Product | undefined;
  if (!p) return notFound();

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 space-y-6">
        <Breadcrumbs
          items={[
            { href: "/", label: "Trang chủ" },
            { href: `/c/${p.category}`, label: p.categoryName || p.category },
            // ✅ Chỉ thêm crumb phụ khi có p.sub
            ...(p.sub
              ? [
                  {
                    href: `/c/${p.category}/${p.sub}`,
                    label: p.subName || p.sub,
                  },
                ]
              : []),
            { href: `/item/${p.id}`, label: p.title, current: true },
          ]}
        />

        <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          {/* Gallery trái */}
          <div className="rounded-2xl border bg-white/70 p-3 backdrop-blur">
            <Gallery images={p.images} />
          </div>

          {/* Buy box phải */}
          <div className="space-y-4">
            <div className="rounded-2xl border bg-white/70 p-5 backdrop-blur">
              <h1 className="text-2xl font-bold tracking-tight">{p.title}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                <span>
                  Thương hiệu:{" "}
                  <span className="font-medium text-slate-900">
                    {p.brand}
                  </span>
                </span>
                <span>•</span>
                <span>Tình trạng: {p.cond === "new" ? "Mới" : "Đã qua sử dụng"}</span>
                {p.sku && (
                  <>
                    <span>•</span>
                    <span>SKU: {p.sku}</span>
                  </>
                )}
              </div>

              <div className="mt-4 flex items-end gap-3">
                <div className="text-3xl font-extrabold text-slate-900">
                  {p.price.toLocaleString("vi-VN")}₫
                </div>
                {p.compareAt && (
                  <div className="text-sm text-slate-500 line-through">
                    {p.compareAt.toLocaleString("vi-VN")}₫
                  </div>
                )}
              </div>

              <div className="mt-4">
                <BuyBox
                  product={{
                    id: p.id,
                    title: p.title,
                    price: p.price,
                    image: p.images[0],
                    stock: p.stock,
                    store: p.store,
                  }}
                  min={1}
                  max={Math.min(10, p.stock)}
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                {p.ship?.free && (
                  <span className="rounded-full border bg-white px-2.5 py-1">
                    Freeship
                  </span>
                )}
                {p.ship?.fast && (
                  <span className="rounded-full border bg-white px-2.5 py-1">
                    Hỏa tốc
                  </span>
                )}
                {p.returnDays && (
                  <span className="rounded-full border bg-white px-2.5 py-1">
                    Đổi trả {p.returnDays} ngày
                  </span>
                )}
              </div>
            </div>

            <SellerCard
              seller={{
                slug: p.storeSlug,
                name: p.store,
                rating: p.sellerRating,
                followers: p.sellerFollowers,
                since: p.sellerSince,
              }}
            />
          </div>
        </section>

        <section className="rounded-2xl border bg-white/70 p-5 backdrop-blur">
          <InfoTabs
            description={p.description}
            specs={p.specs}
            reviews={p.reviews}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
