"use client";
import Image from "next/image";
import { Search, ChevronDown } from "lucide-react";
import { Conv } from "@/lib/data";

export default function Sidebar({
  items, activeId, onSelect, filter, setFilter,
}: {
  items: Conv[];
  activeId: string;
  onSelect: (id: string) => void;
  filter: string;
  setFilter: (v: string) => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 p-3">
        <div className="relative flex-1">
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Tìm theo tên"
            className="h-9 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none placeholder:text-slate-400"
          />
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
        <button className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs">
          Tất cả <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="h-[calc(100%-52px)] overflow-y-auto">
        {items.map((c) => {
          const active = c.id === activeId;
          return (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              className={`flex w-full items-center gap-3 border-t px-3 py-2 text-left hover:bg-slate-50 ${active ? "bg-orange-50/60" : ""}`}
            >
              <div className="relative h-9 w-9 overflow-hidden rounded-full bg-slate-200">
                <Image src={c.avatar} alt={c.name} fill className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">{c.name}</div>
                <div className="truncate text-xs text-slate-500">{c.last}</div>
              </div>
              <div className="text-[11px] text-slate-400">{c.dateLabel}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
