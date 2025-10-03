import Header from "@/components/layout/client/Header";
import Footer from "@/components/layout/client/Footer";
import StoreShowcase from "@/components/layout/client/home/StoreShowcase";
import { featuredStores, getAllStores } from "@/lib/data";

export default function StoresIndexPage() {
  const all = getAllStores(); // [{slug,name,banner},...]

  // Chuyển featuredStores (readonly) -> mutable
  const featuredMutable = featuredStores.map(s => ({ ...s }));

  // (nếu all cũng có khả năng readonly trong tương lai, có thể clone tương tự)
  // const allMutable = all.map(s => ({ ...s }))

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <section className="rounded-2xl border bg-white/70 p-5 backdrop-blur">
          <h1 className="text-2xl font-bold tracking-tight">Cửa hàng</h1>
          <p className="mt-1 text-sm text-slate-600">
            Khám phá các cửa hàng uy tín và sản phẩm mới nhất.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Cửa hàng tiêu biểu</h2>
          <StoreShowcase stores={featuredMutable} />
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Tất cả cửa hàng</h2>
          <StoreShowcase stores={all} />
        </section>
      </main>
      <Footer />
    </>
  );
}
