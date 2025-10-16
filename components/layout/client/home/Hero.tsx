import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight, RefreshCcw, Headset } from "lucide-react";
import { FaHandshakeAngle, FaTruckFast } from "react-icons/fa6";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden pb-12 pt-8 sm:pb-14 sm:pt-10 lg:pb-20 lg:pt-16">
      {/* BG SVG */}
      <div className="pointer-events-none absolute inset-0 -z-10 hidden sm:block">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 750" className="h-full w-full" preserveAspectRatio="none">
          <path
            fill="url(#bgDesk)"
            d="M0 51v-70h1440v698.14c0 38.66-31.34 70-70 70h-72.3c-41.19 0-75.64-31.3-79.57-72.31l-2.79-29.08c-3.93-41-38.38-72.31-79.57-72.31H304.33c-41.17 0-75.6 31.26-79.57 72.24l-2.83 29.23c-3.97 40.97-38.4 72.24-79.57 72.24H70.15C31.57 749.15 0 717.58 0 679z"
          />
          <defs>
            <linearGradient id="bgDesk" x1="-39.69" x2="1479.72" y1="155.41" y2="574.67" gradientUnits="userSpaceOnUse">
              <stop offset=".16" stopColor="#f2f4ff" />
              <stop offset=".81" stopColor="#5a81fa" />
              <stop offset="1" stopColor="#cedeff" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* BG SVG MOBILE (< sm) */}
      <div className="pointer-events-none absolute inset-0 -z-10 sm:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 440 546"
          className="h-full w-full"
          preserveAspectRatio="none"
        >
          <path
            fill="url(#bgMobile)"
            d="M0 0h440v523.72c0 11.78-9.58 21.32-21.39 21.32h-22.09c-12.59 0-23.11-9.53-24.31-22.03l-.85-8.86c-1.2-12.49-11.73-22.03-24.31-22.03H92.99c-12.58 0-23.1 9.52-24.31 22.01l-.86 8.9c-1.21 12.48-11.73 22.01-24.31 22.01H21.43C9.64 545.04 0 535.42 0 523.67z"
          />
          <defs>
            <linearGradient id="bgMobile" x1="218.35" x2="223.3" y1="291.09" y2="669.43" gradientUnits="userSpaceOnUse">
              <stop offset=".16" stopColor="#f2f4ff" />
              <stop offset="1" stopColor="#5a81fa" />
            </linearGradient>
          </defs>
        </svg>

      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Card */}
        <div className="grid items-center gap-8 rounded-2xl bg-white/70 p-5 shadow-[0_10px_30px_rgba(17,24,39,0.08)] backdrop-blur sm:p-7 md:grid-cols-2 md:p-8 lg:p-10">
          {/* Copy */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs text-slate-600 backdrop-blur sm:text-sm md:text-base">
              <span className="inline-block h-2 w-2 rounded-full bg-[var(--secondary-color)]" />
              Realtime bidding • Mượt & an toàn
            </div>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl">
              Mua bán & Đấu giá <br />
              <span className="text-[var(--secondary-color)]">chuyên nghiệp</span>
            </h1>

            <p className="mt-4 max-w-xl text-base text-slate-600 sm:text-lg md:text-xl">
              Trải nghiệm chuẩn: tìm kiếm nhanh, đặt giá thông minh, thanh toán an toàn.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 sm:gap-4">
              <Button
                asChild
                className="h-11 rounded-xl bg-[var(--primary-color)] px-4 text-sm sm:h-12 sm:px-5 sm:text-base"
              >
                <Link href="/auctions" className="inline-flex items-center gap-2">
                  <span>Xem đấu giá</span>
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white">
                    <ChevronRight className="h-3.5 w-3.5 text-[var(--primary-color)]" />
                  </span>
                </Link>
              </Button>

              <Button
                variant="outline"
                asChild
                className="h-11 rounded-xl border-slate-300/80 bg-white/80 px-4 text-sm sm:h-12 sm:px-5 sm:text-base"
              >
                <Link href="/c/electronics" className="inline-flex items-center gap-2 text-slate-700">
                  <span>Khám phá</span>
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-300/80 bg-white">
                    <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Visual */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-[#F2F4FF] p-2 shadow-[0_10px_40px_rgba(17,24,39,0.08)] sm:p-3">
            <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-amber-200/60 blur-2xl sm:h-28 sm:w-28" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-24 w-24 rounded-full bg-indigo-200/50 blur-2xl sm:h-28 sm:w-28" />
            <div className="relative aspect-[4/3] w-full sm:aspect-[5/4] md:aspect-[4/3] lg:aspect-[16/10]">
              <Image
                src="/images/ovbay-robot.png"
                alt="Robot auction automation"
                fill
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 560px"
                className="object-contain p-6 sm:p-8 lg:p-10"
                priority
              />
            </div>
          </div>
        </div>

        {/* Feature strip */}
        <div className="relative mx-auto mt-8 max-w-6xl px-1 sm:mt-10 sm:px-2">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            <div className="pointer-events-none absolute -left-10 top-1/2 hidden h-20 w-20 -translate-y-1/2 rounded-full bg-white/50 blur-2xl md:block lg:-left-16 lg:h-24 lg:w-24" />
            <div className="pointer-events-none absolute -right-10 top-1/2 hidden h-20 w-20 -translate-y-1/2 rounded-full bg-white/50 blur-2xl md:block lg:-right-16 lg:h-24 lg:w-24" />

            <Feature icon={<FaHandshakeAngle className="h-full w-full" />} title="Giao dịch an toàn" />
            <Feature icon={<RefreshCcw className="h-full w-full" />} title="Hoàn tiền khi có vấn đề" />
            <Feature icon={<FaTruckFast className="h-full w-full" />} title="Vận chuyển toàn quốc" />
            <Feature icon={<Headset className="h-full w-full" />} title="Hỗ trợ 24/7" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Feature({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-[#F2F4FF] px-4 py-4 shadow-[0_4px_10px_rgba(0,0,0,0.12)] transition sm:px-5 sm:py-5">
      <div className="mb-2 flex h-12 w-12 items-center justify-center text-[#f59e0b] sm:mb-3 sm:h-14 sm:w-14">
        {icon}
      </div>
      <div className="text-center text-sm font-semibold leading-tight text-[#3A3146] sm:text-base md:text-lg">
        {title}
      </div>
    </div>
  );
}
