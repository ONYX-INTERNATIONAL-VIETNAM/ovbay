import Header from "@/components/layout/client/Header";
import Footer from "@/components/layout/client/Footer";

import Hero from "@/components/layout/client/home/Hero";
import CategoryGrid from "@/components/layout/client/home/CategoryGrid";
import ProductRail from "@/components/layout/client/home/ProductRail";
import AuctionRail from "@/components/layout/client/home/AuctionRail";
import StoreShowcase from "@/components/layout/client/home/StoreShowcase";
import Newsletter from "@/components/layout/client/home/Newsletter";

import {
  featuredProducts,
  hotAuctions,
  categories,
  featuredStores,
} from "@/lib/data";

export default function HomePage() {
  // 🔧 Clone để chuyển từ readonly → mutable cho props các component cũ
  const catItems = categories.map(c => ({ ...c }));
  const productItems = featuredProducts.map(p => ({ ...p }));
  const auctionItems = hotAuctions.map(a => ({ ...a }));
  const storeItems = featuredStores.map(s => ({ ...s }));

  return (
    <>
      <Header />

      <main className="space-y-14 pb-12">
        {/* hero trên nền gradient + glass */}
        <Hero />

        {/* dải brand trust nhỏ */}
        <section className="container">
          <div className="grid grid-cols-2 gap-3 rounded-2xl border bg-white/70 p-4 text-xs text-slate-500 backdrop-blur md:grid-cols-4">
            <div className="rounded-xl bg-white px-3 py-2 shadow-sm">Giao dịch an toàn</div>
            <div className="rounded-xl bg-white px-3 py-2 shadow-sm">Hoàn tiền khi có vấn đề</div>
            <div className="rounded-xl bg-white px-3 py-2 shadow-sm">Vận chuyển toàn quốc</div>
            <div className="rounded-xl bg-white px-3 py-2 shadow-sm">Hỗ trợ 24/7</div>
          </div>
        </section>

        {/* danh mục */}
        <section className="container">
          <CategoryGrid items={catItems} />
        </section>

        {/* sản phẩm nổi bật */}
        <section className="bg-[linear-gradient(180deg,rgba(255,255,255,0),#fafafa_40%,#fff)] py-12">
          <div className="container space-y-8">
            <ProductRail title="Sản phẩm nổi bật" items={productItems} />
          </div>
        </section>

        {/* đấu giá hot */}
        <section className="container">
          <AuctionRail title="Đấu giá đang hot" items={auctionItems} />
        </section>

        {/* cửa hàng tiêu biểu */}
        <section className="container">
          <StoreShowcase stores={storeItems} />
        </section>

        {/* newsletter */}
        <section className="container">
          <Newsletter />
        </section>
      </main>

      <Footer />
    </>
  );
}
