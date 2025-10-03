import Header from "@/components/layout/client/Header";
import Footer from "@/components/layout/client/Footer";

import Breadcrumbs from "@/components/layout/client/category/Breadcrumbs";
import Filters from "@/components/layout/client/category/Filters";
import SortBar from "@/components/layout/client/category/SortBar";
import ProductGrid from "@/components/layout/client/category/ProductGrid";
import Pagination from "@/components/layout/client/category/Pagination";

import { getProductsByCategory, getCategoryMeta } from "@/lib/data";

// ---- Local types (URL) ----
type UrlSortKey = "popular" | "newest" | "price-asc" | "price-desc";

type PageProps = {
  params: {
    category: string;
    subcategory: string;
  };
  searchParams?: {
    sort?: UrlSortKey | string;
    page?: string; // URL luôn là string
    q?: string;
    min?: string;
    max?: string;
    [k: string]: string | string[] | undefined;
  };
};

// ---- Helpers ----
const CATEGORY_SLUGS = ["electronics", "fashion", "home", "collectibles"] as const;
type CategorySlug = (typeof CATEGORY_SLUGS)[number];

function isCategorySlug(v: string): v is CategorySlug {
  return (CATEGORY_SLUGS as readonly string[]).includes(v);
}

// map "newest" (UI) -> "new" (data layer)
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

export default function SubcategoryPage({ params, searchParams }: PageProps) {
  const { category, subcategory } = params;

  const sort = mapSort(searchParams?.sort);
  const pageStr = searchParams?.page ?? "1";
  const page = Number.isFinite(Number(pageStr)) && Number(pageStr) > 0 ? Number(pageStr) : 1;

  // Lấy meta để render breadcrumb/description
  const meta = getCategoryMeta(category, subcategory);

  // Narrow type cho category trước khi gọi data layer
  const cat = isCategorySlug(category) ? category : null;

  const { items, total, pageSize } = cat
    ? getProductsByCategory({
        category: cat, // đã narrow thành CategorySlug
        subcategory,
        page,
        sort,
      })
    : { items: [], total: 0, pageSize: 12 };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 space-y-6">
        <Breadcrumbs
          items={[
            { href: "/", label: "Trang chủ" },
            { href: `/c/${category}`, label: meta?.parent?.name || category },
            { href: `/c/${category}/${subcategory}`, label: meta?.name || subcategory, current: true },
          ]}
        />

        <div className="rounded-2xl border bg-white/70 p-4 backdrop-blur">
          <h1 className="text-2xl font-bold tracking-tight">{meta?.name || subcategory}</h1>
          {meta?.description && <p className="mt-1 text-sm text-slate-600">{meta.description}</p>}
        </div>

        <div className="grid gap-6 md:grid-cols-[260px_1fr]">
          {/* Filters (trái) */}
          <aside className="md:sticky md:top-20 h-max rounded-2xl border bg-white/70 p-4 backdrop-blur">
            <Filters category={category} subcategory={subcategory} />
          </aside>

          {/* Nội dung (phải) */}
          <section className="space-y-4">
            <SortBar total={total} />
            <ProductGrid items={items} />
            <Pagination
              page={page}
              pageSize={pageSize}
              total={total}
              baseHref={`/c/${category}/${subcategory}`}
            />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
