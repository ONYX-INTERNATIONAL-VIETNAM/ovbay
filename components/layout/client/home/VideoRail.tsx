"use client";

import * as React from "react";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";
import VideoCard, { type VideoItem } from "./VideoCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

export default function VideoRail({
  title = "Video nổi bật",
  items,
}: {
  title?: string;
  items: VideoItem[];
}) {
  const [api, setApi] = React.useState<CarouselApi | undefined>();

  // Tính số card hiển thị theo breakpoint để quyết định có hiện nút hay không
  const [slidesPerView, setSlidesPerView] = React.useState(1);
  React.useEffect(() => {
    const update = () => {
      if (window.matchMedia("(min-width:1280px)").matches) setSlidesPerView(5);
      else if (window.matchMedia("(min-width:1024px)").matches) setSlidesPerView(4);
      else if (window.matchMedia("(min-width:768px)").matches) setSlidesPerView(3);
      else if (window.matchMedia("(min-width:640px)").matches) setSlidesPerView(2);
      else setSlidesPerView(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const showNav = (items?.length || 0) > slidesPerView;

  if (!items?.length) return null;

  return (
    <section className="space-y-5">
      <h2 className="my-8 text-center text-2xl font-bold text-[#2E353F] md:my-6 md:text-3xl">
        {title}
      </h2>

      <Carousel setApi={setApi} opts={{ align: "start", loop: false }} className="relative">
        <CarouselContent className="-ml-3 sm:-ml-4">
          {items.map((v) => (
            <CarouselItem
              key={v.id}
              className="min-w-0 basis-[85%] pl-3 sm:basis-1/2 sm:pl-4 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <VideoCard item={v} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {showNav && (
          <>
            <CarouselPrevious
              aria-label="Trước"
              className="absolute -left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-slate-200 bg-white shadow-md transition hover:shadow-lg data-[disabled]:pointer-events-none data-[disabled]:opacity-40 md:-left-5 md:h-10 md:w-10"
            />
            <CarouselNext
              aria-label="Sau"
              className="absolute -right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-slate-200 bg-white shadow-md transition hover:shadow-lg data-[disabled]:pointer-events-none data-[disabled]:opacity-40 md:-right-5 md:h-10 md:w-10"
            />
          </>
        )}
      </Carousel>

      {/* Nút Xem thêm ở giữa */}
      <div className="flex justify-center pt-1">
        <Link
          href="/videos"
          className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-95"
        >
          Xem thêm <IoIosArrowRoundForward className="h-6 w-6" />
        </Link>
      </div>
    </section>
  );
}
