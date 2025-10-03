// app/search/page.tsx
import Header from "@/components/layout/client/Header";
import Footer from "@/components/layout/client/Footer";

import SearchHero from "@/components/layout/client/search/SearchHero";
import FilterChips from "@/components/layout/client/search/FilterChips";
import SortBar from "@/components/layout/client/search/SortBar";
import ProductGrid from "@/components/layout/client/category/ProductGrid";
import Pagination from "@/components/layout/client/category/Pagination";
import AdvancedSearch from "@/components/layout/client/search/AdvancedSearch";

import { searchProducts } from "@/lib/data";

// Kiểu chuẩn cho searchParams trong App Router:
type SearchParamsInput = {
  [key: string]: string | string[] | undefined;
};

type SortKey = "relevance" | "new" | "price-asc" | "price-desc";
type CategoryKey = "all" | "electronics" | "fashion" | "home" | "collectibles" | string;

interface SearchPageProps {
  searchParams?: SearchParamsInput;
}

// Helper lấy giá trị đầu tiên nếu là mảng
const first = (v: string | string[] | undefined): string | undefined =>
  Array.isArray(v) ? v[0] : v;

export default function SearchPage({ searchParams }: SearchPageProps) {
  const q = first(searchParams?.q) ?? "";
  const cat = (first(searchParams?.cat) as CategoryKey) ?? "all";
  const sort = (first(searchParams?.sort) as SortKey) ?? "relevance";
  const page = Number(first(searchParams?.page) ?? "1");

  const { items, total, pageSize } = searchProducts({ q, cat, sort, page });

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 space-y-6">
        {/* Ô tìm lớn + gợi ý */}
        <SearchHero defaultQuery={q} />

        {/* Filter chips theo danh mục */}
        <FilterChips active={cat} />

        <div className="flex items-center justify-between gap-3">
          <AdvancedSearch />
          <SortBar total={total} />
        </div>

        {/* Kết quả */}
        {items.length > 0 ? (
          <>
            <ProductGrid items={items} />
            <Pagination
              page={page}
              pageSize={pageSize}
              total={total}
              baseHref={`/search?q=${encodeURIComponent(q)}&cat=${cat}&sort=${sort}`}
            />
          </>
        ) : (
          <div className="rounded-2xl border bg-white/70 p-12 text-center text-slate-600 backdrop-blur">
            <div className="text-lg font-semibold text-slate-900">Không tìm thấy kết quả</div>
            <p className="mt-2">Thử từ khóa khác hoặc chọn danh mục khác.</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
