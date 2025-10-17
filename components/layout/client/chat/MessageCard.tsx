"use client";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default function MessageCard({
  title, image, subtitle, price, cta,
}: { title: string; image: string; subtitle: string; price: string; cta: string }) {
  return (
    <div className="ml-10 max-w-[85%] sm:max-w-[520px] overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-800 shadow-sm">
      <div className="px-3 pt-2 text-sm font-semibold">{title}</div>
      <div className="mt-2 flex min-w-0 items-center gap-3 px-3 pb-2">
        <div className="relative h-14 w-[72px] min-w-[56px] overflow-hidden rounded-lg bg-slate-100">
          <Image src={image} alt={subtitle} fill className="object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm">{subtitle}</div>
          <div className="mt-1 text-xs text-slate-500">{price}</div>
        </div>
      </div>
      <div className="border-t px-3 py-2">
        <button className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1 text-xs font-semibold text-[#ff5a1f]">
          <span className="grid h-4 w-4 place-items-center rounded-full bg-[#ffb74d] text-white">₴</span>
          {cta}
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
