"use client";

import * as React from "react";
import Link from "next/link";
import ProductCard from "@/components/layout/client/home/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { IoIosArrowRoundForward } from "react-icons/io";

type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  store?: string;
  featured?: boolean;
  compareAt?: number;
};

export default function ProductRail({
  title,
  items,
}: {
  title: string;
  items: Product[];
}) {
  const [api, setApi] = React.useState<CarouselApi | undefined>();
  const showNav = items.length > 5; // chỉ hiện nút khi > 5 sản phẩm

  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      api.canScrollPrev(); // cập nhật data-[disabled] cho nút
      api.canScrollNext();
    };
    onSelect();
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    return () => {
      api.off("reInit", onSelect);
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section className="space-y-5">
      <h2 className="md:my-6 text-center font-bold text-[#2E353F] my-8 text-2xl md:text-3xl">
        {title}
      </h2>

      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: false }}
        className="relative"
      >
        <CarouselContent className="-ml-3 sm:-ml-4">
          {items.map((p) => (
            <CarouselItem
              key={p.id}
              // Responsive: peeking trên xs, 2 (sm), 3 (md), 4 (lg), 5 (xl)
              className="pl-3 sm:pl-4 basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <ProductCard item={p} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {showNav && (
          <>
            <CarouselPrevious
              aria-label="Trước"
              className="absolute -left-3 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white shadow-md transition hover:shadow-lg data-[disabled]:opacity-40 data-[disabled]:pointer-events-none md:-left-5 md:h-10 md:w-10"
            />
            <CarouselNext
              aria-label="Sau"
              className="absolute -right-3 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white shadow-md transition hover:shadow-lg data-[disabled]:opacity-40 data-[disabled]:pointer-events-none md:-right-5 md:h-10 md:w-10"
            />
          </>
        )}
      </Carousel>

      {/* Nút Xem thêm ở giữa */}
      <div className="flex justify-center pt-1">
        <Link
          href="/search"
          className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-95"
        >
          Xem thêm <IoIosArrowRoundForward className="w-6 h-6"/>
        </Link>
      </div>
    </section>
  );
}
