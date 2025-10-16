import Header from "@/components/layout/client/Header";
import Footer from "@/components/layout/client/Footer";

import StoreHeader from "@/components/layout/client/store/StoreHeader";
import StoreNav from "@/components/layout/client/store/StoreNav";
import StoreFilters from "@/components/layout/client/store/StoreFilters";
import StoreSortBar from "@/components/layout/client/store/StoreSortBar";
import ProductGrid from "@/components/layout/client/category/ProductGrid";
import Pagination from "@/components/layout/client/category/Pagination";

import { getStoreMeta, getProductsByStore } from "@/lib/data";

// ===== URL types =====
type TabKey = "all" | "featured" | "best";
type UrlSortKey = "popular" | "newest" | "price-asc" | "price-desc";

// ===== Helpers =====
const STORE_SLUGS = ["soundx", "keylab", "retrohub", "camzone", "homeplus", "fashio"] as const;
type StoreSlug = (typeof STORE_SLUGS)[number];

function isStoreSlug(v: string): v is StoreSlug {
  return (STORE_SLUGS as readonly string[]).includes(v);
}

// Map sort từ UI -> data layer ("newest" -> "new")
function mapSort(v?: UrlSortKey | string) {
  switch (v) {
    case "popular":
      return "popular" as const;
    case "newest":
      return "new" as const;
    case "price-asc":
      return "price-asc" as const;
    case "price-desc":
      return "price-desc" as const;
    default:
      return "popular" as const;
  }
}

type PageProps = {
  params: { store: string };
  searchParams?: {
    tab?: TabKey | string;
    page?: string;
    sort?: UrlSortKey | string;
    [k: string]: string | string[] | undefined;
  };
};

export default function StorePage({ params, searchParams }: PageProps) {
  const storeParam = params.store;

  const tab = (searchParams?.tab as TabKey) ?? "all";
  const sort = mapSort(searchParams?.sort);
  const pageNum = Number(searchParams?.page ?? "1");
  const page = Number.isFinite(pageNum) && pageNum > 0 ? pageNum : 1;

  const meta = getStoreMeta(storeParam);

  // ✅ Narrow string -> StoreSlug trước khi gọi data layer
  const store = isStoreSlug(storeParam) ? storeParam : null;

  const { items, total, pageSize } = store
    ? getProductsByStore({ store, tab, page, sort })
    : { items: [], total: 0, pageSize: 12 };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 md:px-16 py-8 space-y-6">
        <StoreHeader meta={meta} />

        <div className="grid gap-6 md:grid-cols-[260px_1fr]">
          <aside className="md:sticky md:top-20 h-max rounded-2xl border bg-white/70 p-4 backdrop-blur">
            <StoreFilters />
          </aside>

          <section className="space-y-4">
            <StoreNav baseHref={`/store/${storeParam}`} active={tab} total={total} />
            <StoreSortBar total={total} />
            <ProductGrid items={items} />
            <Pagination
              page={page}
              pageSize={pageSize}
              total={total}
              baseHref={`/store/${storeParam}?tab=${tab}`}
            />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
