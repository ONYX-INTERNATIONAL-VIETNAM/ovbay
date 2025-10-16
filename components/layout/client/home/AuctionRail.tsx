"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { IoIosArrowRoundForward } from "react-icons/io";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

type Auction = {
  id: string;
  title: string;
  current: number;
  image: string;
  endsIn: string; // ví dụ: "01:22:09"
};

export default function AuctionRail({
  title,
  items,
}: {
  title: string;
  items: Auction[];
}) {
  const [api, setApi] = React.useState<CarouselApi | undefined>();
  const showNav = items.length > 5;

  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      api.canScrollPrev();
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
      {/* Tiêu đề giữa */}
      <h2 className="md:my-6 text-center font-bold text-[#2E353F] my-8 text-2xl md:text-3xl">
        {title}
      </h2>

      {/* Carousel */}
      <Carousel setApi={setApi} opts={{ align: "start", loop: false }} className="relative">
        <CarouselContent className="-ml-3 sm:-ml-4">
          {items.map((a) => (
            <CarouselItem
              key={a.id}
              // xs: peeking ~85%, sm: 2 ô, md: 3 ô, lg: 4 ô, xl: 5 ô
              className="pl-3 sm:pl-4 basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <Link
                href={`/auction/${a.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                {/* Ảnh nền xám nhạt, ảnh nổi có bóng */}
                <div className="grid aspect-[4/3] place-items-center bg-[var(--background-color)] p-3 sm:p-4">
                  <Image
                    src={a.image}
                    alt={a.title}
                    width={360}
                    height={360}
                    sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 20vw"
                    className="h-24 w-auto object-contain drop-shadow-md sm:h-28 lg:h-32"
                  />
                </div>

                {/* Nội dung giống bố cục ảnh mẫu */}
                <div className="flex flex-1 flex-col gap-1.5 p-3">
                  <div className="line-clamp-2 text-sm font-medium text-slate-800">
                    {a.title}
                  </div>
                  <div className="text-xs text-slate-500">Còn lại: {a.endsIn}</div>
                  <div className="mt-auto text-sm font-semibold text-slate-900">
                    Giá hiện tại: {a.current.toLocaleString("vi-VN")} VND
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Nút điều hướng 2 bên – chỉ hiện khi >5 mục */}
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
          href="/auctions"
          className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-95"
        >
          Xem thêm
          <IoIosArrowRoundForward className="h-6 w-6" />
        </Link>
      </div>
    </section>
  );
}
