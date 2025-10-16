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

      <main className="pb-12">
        {/* hero trên nền gradient + glass */}
        <Hero />


        <div className="mx-6 md:mx-16 space-y-14">
          {/* danh mục */}
          <section className="container my-10">
            <hr className="bg-[#2E353F] border-none h-[1px]" />
            <CategoryGrid items={catItems} />
          </section>

          <hr className="bg-[#2E353F] border-none h-[1px]" />

          {/* sản phẩm nổi bật */}
          <section className="bg-[linear-gradient(180deg,rgba(255,255,255,0),#fafafa_40%,#fff)]">
            <div className="container space-y-8">
              <ProductRail title="Sản phẩm nổi bật" items={productItems} />
            </div>
          </section>

          <hr className="bg-[#2E353F] border-none h-[1px]" />

          {/* đấu giá hot */}
          <section className="container">
            <AuctionRail title="Đấu giá đang hot" items={auctionItems} />
          </section>

          <hr className="bg-[#2E353F] border-none h-[1px]" />

          {/* cửa hàng tiêu biểu */}
          <section className="container">
            <StoreShowcase stores={storeItems} />
          </section>

          <hr className="bg-[#2E353F] border-none h-[1px]" />

          {/* newsletter */}
          <section className="container">
            <Newsletter />
          </section>

          <hr className="bg-[#2E353F] border-none h-[1px]" />

        </div>

      </main>

      <Footer />
    </>
  );
}
