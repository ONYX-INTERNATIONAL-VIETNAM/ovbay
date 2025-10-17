import * as React from "react";

import Header from "@/components/layout/client/Header";
import Footer from "@/components/layout/client/Footer";

import Breadcrumbs from "@/components/layout/client/category/Breadcrumbs";
import Filters from "@/components/layout/client/category/Filters";
import SortBar from "@/components/layout/client/category/SortBar";
import ProductGrid from "@/components/layout/client/category/ProductGrid";
import Pagination from "@/components/layout/client/category/Pagination";

import { getProductsByCategory, getCategoryMeta } from "@/lib/data";

// ---- URL types ----
type UrlSortKey = "popular" | "newest" | "price-asc" | "price-desc";

const CATEGORY_SLUGS = ["electronics", "fashion", "home", "collectibles"] as const;
type CategorySlug = (typeof CATEGORY_SLUGS)[number];

function isCategorySlug(v: string): v is CategorySlug {
  return (CATEGORY_SLUGS as readonly string[]).includes(v);
}

// Map UI sort -> data layer sort
function mapSort(v?: UrlSortKey | string) {
  switch (v) {
    case "popular":
      return "popular" as const;
    case "newest":
      return "new" as const; // data layer dùng "new"
    case "price-asc":
      return "price-asc" as const;
    case "price-desc":
      return "price-desc" as const;
    default:
      return "popular" as const;
  }
}

type PageParams = Promise<{ category: string }>;
type PageSearchParams = Promise<{
  sort?: UrlSortKey | string;
  page?: string;
  q?: string;
  min?: string;
  max?: string;
  [key: string]: string | string[] | undefined;
}>;

export default function CategoryPage({
  params,
  searchParams,
}: {
  params: PageParams;
  searchParams: PageSearchParams;
}) {
  // ✅ unwrap Promise bằng React.use()
  const { category } = React.use(params);
  const sp = React.use(searchParams) ?? {};

  const sort = mapSort(sp.sort);
  const pageStr = sp.page ?? "1";
  const pageNum = Number(pageStr);
  const page = Number.isFinite(pageNum) && pageNum > 0 ? pageNum : 1;

  const meta = getCategoryMeta(category);

  // ✅ Narrow string -> CategorySlug trước khi gọi data layer
  const cat = isCategorySlug(category) ? category : null;

  const { items, total, pageSize } = cat
    ? getProductsByCategory({ category: cat, page, sort })
    : { items: [], total: 0, pageSize: 12 };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 md:px-16 py-8 space-y-6">
        <Breadcrumbs
          items={[
            { href: "/", label: "Trang chủ" },
            { href: `/c/${category}`, label: meta?.name || category, current: true },
          ]}
        />

        <div className="rounded-2xl border bg-white/70 p-4 backdrop-blur">
          <h1 className="text-2xl font-bold tracking-tight">{meta?.name || category}</h1>
          {meta?.description && <p className="mt-1 text-sm text-slate-600">{meta.description}</p>}
        </div>

        <div className="grid gap-6 md:grid-cols-[260px_1fr]">
          {/* Filters (left) */}
          <aside className="md:sticky md:top-20 h-max rounded-2xl border bg-white/70 p-4 backdrop-blur">
            <Filters category={category} />
          </aside>

          {/* Content (right) */}
          <section className="space-y-4">
            <SortBar total={total} />
            <ProductGrid items={items} />
            <Pagination page={page} pageSize={pageSize} total={total} baseHref={`/c/${category}`} />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
