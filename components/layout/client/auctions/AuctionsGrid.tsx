import Link from "next/link";

type Auction = {
  id: string;
  title: string;
  current: number;
  image: string;
  endsAt: string;     // ISO
  bids: number;
  category?: string;
};

function timeLeft(iso: string) {
  const t = new Date(iso).getTime() - Date.now();
  if (t <= 0) return "Đã kết thúc";
  const s = Math.floor(t/1000);
  const h = Math.floor(s/3600); const m = Math.floor((s%3600)/60);
  return `${h}h ${m}m`;
}

export default function AuctionsGrid({ items }: { items: Auction[] }) {
  if (!items.length)
    return <div className="rounded-2xl border bg-white/70 p-12 text-center text-slate-600 backdrop-blur">Không có phiên phù hợp bộ lọc.</div>;

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
      {items.map((a) => (
        <Link
          key={a.id}
          href={`/auction/${a.id}`}
          className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-white/70 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          <div
            className="h-40 bg-cover bg-center transition-transform duration-300 group-hover:scale-[1.03]"
            style={{ backgroundImage: `url(${a.image})` }}
            aria-hidden
          />
          <div className="flex flex-1 flex-col gap-2 p-3">
            <div className="line-clamp-2 text-sm font-semibold">{a.title}</div>
            <div className="text-xs text-slate-500">Còn lại: {timeLeft(a.endsAt)}</div>
            <div className="mt-auto flex items-center justify-between">
              <div className="text-base font-semibold">{a.current.toLocaleString("vi-VN")}₫</div>
              <div className="text-xs text-slate-500">{a.bids} bid</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
