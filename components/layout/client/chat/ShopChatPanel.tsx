"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Maximize2, Minimize2, X, CircleDot } from "lucide-react";
import type { Conv, Msg } from "@/lib/data";
import Sidebar from "./Sidebar";
import MessageBubble from "./MessageBubble";
import MessageCard from "./MessageCard";
import InputBar from "./InputBar";

function TypingDots() {
  return (
    <span className="inline-flex gap-1">
      <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500" />
      <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500 [animation-delay:120ms]" />
      <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500 [animation-delay:240ms]" />
    </span>
  );
}

export default function ShopChatPanel({
  open, max, setMax, onClose,
  convs, active, setActive,
  msgs, typingFor, online,
  filter, setFilter,
  input, setInput, onSend,
}: {
  open: boolean;
  max: boolean;
  setMax: (v: boolean) => void;
  onClose: () => void;
  convs: Conv[];
  active: string;
  setActive: (id: string) => void;
  msgs: Record<string, Msg[]>;
  typingFor: string | null;
  online: boolean;
  filter: string;
  setFilter: (v: string) => void;
  input: string;
  setInput: (v: string) => void;
  onSend: () => void;
}) {
  const list = convs.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()));
  const cur = convs.find(c => c.id === active)!;

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [atBottom, setAtBottom] = React.useState(true);

  // theo dõi cuộn để show nút "Xuống cuối"
  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      setAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 16);
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // auto scroll khi có tin mới
  React.useEffect(() => {
    if (!open) return;
    const el = scrollRef.current;
    if (!el) return;
    // chỉ auto-scroll nếu đang ở gần cuối
    if (atBottom) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msgs, active, open]);

  const isTypingHere = typingFor === active;

  return (
    <div
      className={[
        // container quan trọng: flex-col + max h theo viewport
        "fixed right-4 bottom-4 z-[75] overflow-hidden rounded-xl border border-slate-200 text-black bg-white shadow-2xl transition-all",
        "flex max-h-[90vh] w-[880px] max-w-[95vw] flex-col",
        open ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-2",
        max ? "inset-x-4 top-4 bottom-4 right-4 w-auto max-w-none" : "",
      ].join(" ")}
    >
      {/* thanh đỏ trên */}
      <div className="h-2 w-full flex-none bg-[var(--secondary-color)]" />

      {/* Header */}
      <div className="flex flex-none items-center justify-between border-b px-3 py-2">
        <div className="flex items-center gap-2 text-sm font-semibold">
          {cur.name}
          <ChevronDown className="ml-1 h-4 w-4 text-slate-500" />
          <span className={`ml-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] ${online ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}`}>
            <CircleDot className={`h-3 w-3 ${online ? "text-green-600" : "text-slate-400"}`} />
            {online ? "Online" : "Offline"}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="rounded-full px-3" onClick={onClose}>
            Thu gọn
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setMax(!max)} aria-label={max ? "Thu nhỏ" : "Phóng to"}>
            {max ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose} aria-label="Đóng">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* BODY: dùng flex-1 + min-h-0 để phần list có thể cuộn */}
      <div className="grid flex-1 min-h-0 grid-cols-1 md:grid-cols-[280px_1fr]">
        {/* Sidebar (ẩn trên mobile) */}
        <div className="hidden min-h-0 border-r md:block">
          <Sidebar items={list} activeId={active} onSelect={setActive} filter={filter} setFilter={setFilter} />
        </div>

        {/* Cột chat */}
        <div className="flex min-h-0 flex-col">
          {/* nhãn ngày */}
          <div className="flex flex-none justify-center py-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] text-slate-600">
              {(msgs[active]?.length ?? 0) > 0 ? "Ngày hôm qua" : "Hôm nay"}
            </span>
          </div>

          {/* danh sách tin: CHỖ CUỘN CHÍNH */}
          <div ref={scrollRef} className="relative flex-1 min-h-0 space-y-2 overflow-y-auto px-4">
            {(msgs[active] ?? []).map((m) =>
              m.type === "text" ? (
                <MessageBubble key={m.id} from={m.from}>{m.text}</MessageBubble>
              ) : (
                <MessageCard key={m.id} title={m.title} image={m.image} subtitle={m.subtitle} price={m.price} cta={m.cta} />
              ),
            )}

            {/* typing */}
            {isTypingHere && (
              <div className="ml-10 mt-1 flex items-center gap-2">
                <div className="grid h-7 w-7 place-items-center rounded-full bg-slate-300 text-[11px] font-semibold text-slate-700">S</div>
                <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700">
                  <TypingDots />
                </div>
              </div>
            )}

            {/* nút xuống cuối */}
            {!atBottom && (
              <button
                onClick={() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })}
                className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full border bg-white px-3 py-1 text-xs shadow"
              >
                Xuống cuối
              </button>
            )}

            <div className="pb-2 text-right text-[11px] text-slate-400">17:38</div>
          </div>

          {/* input */}
          <InputBar value={input} setValue={setInput} onSend={onSend} />
        </div>
      </div>

      {/* footer panel */}
      <div className="flex flex-none items-center justify-between border-t bg-slate-50 px-3 py-1 text-[11px] text-slate-600">
        <div>Hỗ trợ khách hàng • Trả lời nhanh</div>
        <button onClick={onClose} className="inline-flex items-center gap-1">
          <ChevronUp className="h-3.5 w-3.5" />
          Thu gọn
        </button>
      </div>
    </div>
  );
}
