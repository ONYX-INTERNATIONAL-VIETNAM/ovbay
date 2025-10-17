"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Volume2,
  Eye,
  Share2,
  Bell,
  ArrowRight,
  Send,
  Paperclip,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import VideoCard from "@/components/layout/client/home/VideoCard";
import type { VideoItem } from "@/lib/data";
import { VIDEOS as BASE_VIDEOS } from "@/lib/data";
import Header from "@/components/layout/client/Header";
import Footer from "@/components/layout/client/Footer";
import AdvancedSearch from "@/components/layout/client/search/AdvancedSearch";
import SortBar from "@/components/layout/client/search/SortBar";

// ===== Mock dữ liệu =====
const HERO_SLIDES = [
  { id: "s25", src: "/img/galaxy-s25.jpg", alt: "Samsung Galaxy S25" },
  { id: "buds", src: "/img/earbuds.jpg", alt: "Wireless Earbuds" },
  { id: "watch", src: "/img/smartwatch.jpg", alt: "Smart Watch" },
] as const;

const STORE = {
  name: "SoundX Official Store",
  avatar: "/img/avatar.png",
  viewers: 12700,
};

type Featured = { id: string; title: string; price: string; img: string; added?: boolean };
const FEATURED_ITEMS_INIT: Featured[] = [
  { id: "f1", title: "Tai nghe Bluetooth ANC Pro", price: "1.690.000 VND", img: "/img/headphone.png" },
  { id: "f2", title: "Ốp lưng S25", price: "149.000 VND", img: "/img/case.png" },
];

const AUTO_CHAT = [
  "Hàng có sẵn không ạ?",
  "Ship HN bao lâu vậy shop?",
  "Có màu đen không?",
  "Đang có mã freeship nè!",
  "Cho xin giá khuyến mãi!",
  "Xịn quá!",
  "Bao test 1 đổi 1 chứ?",
];

function fmtViews(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return `${n}`;
}
function fmtTime(sec: number) {
  const m = Math.floor(sec / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

export default function ShopeeLikeLivePage() {
  // ===== hero / player state =====
  const [slide, setSlide] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);
  const durationSec = 28 * 60 + 9; // 28:09
  const [progress, setProgress] = React.useState(0); // 0..100

  // reduce motion detection
  const prefersReducedMotion = React.useMemo(
    () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    []
  );

  // auto progress khi playing
  React.useEffect(() => {
    if (!playing || prefersReducedMotion) return;
    const id = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 0.25)); // ~7 phút ảo cho demo
    }, 250);
    return () => clearInterval(id);
  }, [playing, prefersReducedMotion]);

  const currentSec = React.useMemo(() => (progress / 100) * durationSec, [progress]);
  const onSeek = (pct: number) => setProgress(Math.min(100, Math.max(0, pct)));

  // slide auto đổi nhẹ
  React.useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  // ===== viewers fake tăng/giảm =====
  const [viewers, setViewers] = React.useState(STORE.viewers);
  React.useEffect(() => {
    if (prefersReducedMotion) return;
    const tick = () => setViewers((v) => Math.max(1, v + Math.floor(Math.random() * 120 - 60)));
    const id = setInterval(tick, 2200 + Math.random() * 1200);
    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  // ===== chat fake =====
  type ChatMsg = { id: string; user: string; text: string };
  const [chat, setChat] = React.useState<ChatMsg[]>([
    { id: "c1", user: "Mark_25", text: "Hi!" },
    { id: "c2", user: "Emma", text: "Có freeship không shop?" },
  ]);
  const [input, setInput] = React.useState("");
  const chatBoxRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setInterval(() => {
      const text = AUTO_CHAT[Math.floor(Math.random() * AUTO_CHAT.length)];
      setChat((c) => [...c, { id: crypto.randomUUID?.() ?? String(Date.now() + Math.random()), user: "User_" + (c.length + 1), text }]);
    }, 3000);
    return () => clearInterval(id);
  }, [prefersReducedMotion]);
  React.useEffect(() => {
    chatBoxRef.current?.scrollTo({ top: chatBoxRef.current.scrollHeight, behavior: "smooth" });
  }, [chat]);
  const sendChat = () => {
    const t = input.trim();
    if (!t) return;
    setChat((c) => [...c, { id: crypto.randomUUID?.() ?? String(Date.now() + Math.random()), user: "Bạn", text: t }]);
    setInput("");
  };

  // ===== featured items + giỏ hàng =====
  const [cartCount, setCartCount] = React.useState(0);
  const [featured, setFeatured] = React.useState<Featured[]>(FEATURED_ITEMS_INIT);
  const addToCart = (fid: string) => {
    setCartCount((c) => c + 1);
    setFeatured((arr) => arr.map((it) => (it.id === fid ? { ...it, added: true } : it)));
    setTimeout(() => setFeatured((arr) => arr.map((it) => (it.id === fid ? { ...it, added: false } : it))), 1200);
  };

  // ===== grid gợi ý =====
  const GRID_VIDEOS: VideoItem[] = React.useMemo(
    () =>
      [
        { ...BASE_VIDEOS[0], live: true },
        { ...BASE_VIDEOS[1] },
        { ...BASE_VIDEOS[2] },
        { ...BASE_VIDEOS[3], live: true },
        { ...BASE_VIDEOS[4] },
        { ...BASE_VIDEOS[0], live: true },
        { ...BASE_VIDEOS[1] },
        { ...BASE_VIDEOS[2] },
        { ...BASE_VIDEOS[3], live: true },
        { ...BASE_VIDEOS[4] },
      ] as VideoItem[],
    []
  );

  // ===== progress drag (desktop & mobile) =====
  const trackRef = React.useRef<HTMLDivElement>(null);
  const draggingRef = React.useRef(false);
  const updatePctFromEvent = (clientX: number) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    onSeek(pct);
  };
  React.useEffect(() => {
    const move = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      updatePctFromEvent(e.clientX);
    };
    const up = () => {
      draggingRef.current = false;
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    const down = (e: PointerEvent) => {
      draggingRef.current = true;
      updatePctFromEvent(e.clientX);
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    };
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("pointerdown", down);
    return () => {
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <>
      <Header />
      <main className="container mx-auto max-w-screen-2xl px-3 sm:px-4 md:px-8 lg:px-12 py-4 md:py-8 space-y-6">
        <div className="space-y-4">
          {/* breadcrumb */}
          <nav className="text-xs sm:text-sm text-slate-500">
            <Link href="/">Trang chủ</Link> /{" "}
            <span className="font-medium text-slate-700">Video nổi bật</span>
          </nav>

          {/* thanh info shop */}
          <section className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-3 sm:p-4">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 sm:h-12 sm:w-12 overflow-hidden rounded-full bg-slate-200">
                <Image
                  src={STORE.avatar}
                  alt={STORE.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 40px, 48px"
                />
              </div>
              <div>
                <div className="text-sm sm:text-base font-semibold text-slate-900">{STORE.name}</div>
                <div className="mt-0.5 inline-flex items-center gap-1 text-[11px] sm:text-xs text-slate-500">
                  <Eye className="h-3.5 w-3.5" />
                  {fmtViews(viewers)} đang xem
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" className="rounded-full h-9 px-3 sm:px-4 text-sm">
                <Bell className="mr-1 h-4 w-4" />
                Nhận thông báo
              </Button>
              <Button variant="outline" className="rounded-full h-9 px-3 sm:px-4 text-sm">
                Theo dõi
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* HERO + SIDEBAR */}
          <section className="grid gap-4 lg:gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(300px,360px)]">
            {/* LEFT: Player */}
            <div className="relative">
              {/* arrows – ẩn trên mobile nhỏ để tránh che UI */}
              <div className="hidden sm:block">
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute -left-3 sm:-left-4 top-1/2 z-10 -translate-y-1/2 h-9 w-9 rounded-full border-slate-300 bg-white/95 shadow"
                  aria-label="Prev"
                  onClick={() => setSlide((s) => (s - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute -right-3 sm:-right-4 top-1/2 z-10 -translate-y-1/2 h-9 w-9 rounded-full border-slate-300 bg-white/95 shadow"
                  aria-label="Next"
                  onClick={() => setSlide((s) => (s + 1) % HERO_SLIDES.length)}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>

              <div className="overflow-hidden rounded-2xl sm:rounded-[28px] bg-slate-900 shadow-xl">
                <div className="relative aspect-video">
                  <Image
                    key={HERO_SLIDES[slide].id}
                    src={HERO_SLIDES[slide].src}
                    alt={HERO_SLIDES[slide].alt}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 70vw"
                  />

                  {/* badges */}
                  <div className="absolute left-2 sm:left-3 top-2 sm:top-3 flex items-center gap-2">
                    <span className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold text-white">
                      Live
                    </span>
                  </div>
                  <div className="absolute right-2 sm:right-3 top-2 sm:top-3 rounded-full bg-black/50 px-2 py-0.5 text-[10px] sm:text-[11px] font-medium text-white backdrop-blur">
                    <Eye className="mr-1 inline h-3.5 w-3.5" />
                    {fmtViews(viewers)}
                  </div>

                  {/* Play/Pause overlay (glass) */}
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="rounded-xl sm:rounded-2xl bg-white/45 p-2 sm:p-3 backdrop-blur-md">
                      <Button
                        size="icon"
                        className="h-14 w-14 sm:h-20 sm:w-20 rounded-full bg-slate-900 text-white hover:bg-slate-900/90 shadow-xl"
                        onClick={() => setPlaying((p) => !p)}
                        aria-label={playing ? "Tạm dừng" : "Phát"}
                      >
                        {playing ? <Pause className="h-8 w-8 sm:h-10 sm:w-10" /> : <Play className="h-8 w-8 sm:h-10 sm:w-10" />}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* progress */}
              <div className="mt-3 flex items-center gap-2 sm:gap-3">
                <Button
                  size="icon"
                  className="h-9 w-9 sm:h-8 sm:w-8 rounded-full bg-slate-900 text-white hover:bg-slate-900/90"
                  aria-label="Volume"
                >
                  <Volume2 className="h-4 w-4" />
                </Button>

                <div
                  ref={trackRef}
                  className="relative h-3 w-full cursor-pointer rounded-full bg-slate-200 touch-none"
                  role="slider"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(progress)}
                  aria-label="Tiến độ phát"
                >
                  <div
                    className="absolute left-0 top-0 h-3 rounded-full bg-amber-500"
                    style={{ width: `${progress}%` }}
                  />
                  <div
                    className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-slate-400 bg-white"
                    style={{ left: `calc(${progress}% - 8px)` }}
                  />
                </div>

                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] sm:text-xs text-slate-700">
                  {fmtTime(currentSec)} / {fmtTime(durationSec)}
                </span>
              </div>
            </div>

            {/* RIGHT: Sidebar (xuống dưới trên mobile) */}
            <div className="space-y-3">
              <Button className="w-max rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white hover:opacity-95 h-9 px-4 text-sm">
                Live Show
              </Button>

              <aside className="rounded-2xl sm:rounded-[26px] bg-[#2B2E39] p-3 sm:p-4 text-white shadow-lg">
                {/* Chat */}
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-sm sm:text-[15px] font-semibold">Chat box</div>
                  <div className="h-6 w-6 rounded-full bg-white/10" />
                </div>

                <div
                  ref={chatBoxRef}
                  className="max-h-[min(60vh,28rem)] sm:max-h-64 space-y-2 overflow-y-auto pr-1"
                >
                  {chat.map((m) => (
                    <div key={m.id} className="flex items-center gap-2">
                      <div className="grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-full bg-white/15 text-[10px] sm:text-[11px] font-semibold">
                        {m.user.charAt(0)}
                      </div>
                      <div className="flex-1 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs sm:text-sm">
                        <span className="text-white/70">{m.user}:</span> {m.text}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      placeholder="Text..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendChat()}
                      className="h-10 w-full rounded-full border border-white/10 bg-white pl-9 pr-20 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                    />
                    <Paperclip className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                      <Button
                        size="sm"
                        className="h-8 sm:h-7 rounded-full bg-indigo-600 px-3 text-white hover:bg-indigo-600/90"
                        onClick={sendChat}
                        aria-label="Gửi"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Featured Items */}
                <div className="mt-5">
                  <div className="text-sm font-medium text-slate-200">Featured Items</div>
                  <ul className="mt-2 space-y-3">
                    {featured.map((it) => (
                      <li key={it.id} className="flex items-center gap-3 rounded-2xl bg-white/5 p-2 ring-1 ring-white/10">
                        <div className="relative h-12 w-12 sm:h-14 sm:w-14 overflow-hidden rounded-xl bg-white">
                          <Image
                            src={it.img}
                            alt={it.title}
                            fill
                            className="object-contain"
                            sizes="56px"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-xs sm:text-sm">{it.title}</div>
                          <div className="text-[11px] sm:text-xs text-violet-300">{it.price}</div>
                        </div>
                        <Button
                          className="h-8 sm:h-7 rounded-full bg-orange-500 px-3 text-xs font-semibold text-white hover:bg-orange-500/90"
                          onClick={() => addToCart(it.id)}
                        >
                          {it.added ? "Đã thêm" : "Mua ngay"}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </section>

          {/* toolbar */}
          <div className="md:flex md:items-center md:justify-between gap-3 space-y-3 md:space-y-0">
            <AdvancedSearch />
            <SortBar total={GRID_VIDEOS.length} />
          </div>

          {/* grid gợi ý */}
          <section className="mt-2 sm:mt-4">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
              {GRID_VIDEOS.map((v, i) => (
                <VideoCard key={`${v.id}-${i}`} item={v} />
              ))}
            </div>

            <div className="mt-6 sm:mt-8 flex justify-center">
              <Button
                asChild
                className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-900/90"
              >
                <Link href="/videos">
                  Xem thêm <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
