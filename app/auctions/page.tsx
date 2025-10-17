import Header from "@/components/layout/client/Header";
import Footer from "@/components/layout/client/Footer";

import StatusTabs from "@/components/layout/client/auctions/StatusTabs";
import AuctionsFilters from "@/components/layout/client/auctions/AuctionsFilters";
import AuctionsSortBar from "@/components/layout/client/auctions/AuctionsSortBar";
import AuctionsGrid from "@/components/layout/client/auctions/AuctionsGrid";
import Pagination from "@/components/layout/client/category/Pagination";

import { searchAuctions } from "@/lib/data";

type NextSearchParams = { [key: string]: string | string[] | undefined };

export default function AuctionsPage({ searchParams }: { searchParams?: NextSearchParams }) {
  const q = (searchParams?.q as string) || "";
  const cat = (searchParams?.cat as string) || "all";
  const status = (searchParams?.status as "all" | "live" | "upcoming" | "ended") || "live"; // live | upcoming | ended | all
  const sort = (searchParams?.sort as "ending-soon" | "newest" | "price-asc" | "price-desc" | "highest") || "ending-soon"; // ending-soon | newest | price-asc | price-desc | highest
  const page = Number(searchParams?.page || 1);

  const { items, total, pageSize } = searchAuctions({ q, cat, status, sort, page });

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 md:px-16 py-8 space-y-6">
        <section className="rounded-2xl border bg-white/70 p-5 backdrop-blur">
          <h1 className="text-2xl font-bold tracking-tight">Đấu giá</h1>
          <p className="mt-1 text-sm text-slate-600">
            Khám phá các phiên đấu giá đang hot. Đặt giá thông minh, theo dõi thời gian thực.
          </p>
        </section>

        <StatusTabs />

        <div className="grid gap-6 md:grid-cols-[260px_1fr]">
          {/* Filters trái */}
          <aside className="md:sticky md:top-20 h-max rounded-2xl border bg-white/70 p-4 backdrop-blur">
            <AuctionsFilters />
          </aside>

          {/* Nội dung */}
          <section className="space-y-4">
            <AuctionsSortBar total={total} />

            <AuctionsGrid items={items} />

            <Pagination
              page={page}
              pageSize={pageSize}
              total={total}
              baseHref={`/auctions?q=${encodeURIComponent(q)}&cat=${cat}&status=${status}&sort=${sort}`}
            />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
