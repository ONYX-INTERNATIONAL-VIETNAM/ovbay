import Link from "next/link";

type Auction = {
  id: string;
  title: string;
  current: number;
  image: string;
  endsIn: string;
};

export default function AuctionRail({
  title,
  items,
}: {
  title: string;
  items: Auction[];
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <Link href="/auctions" className="text-sm text-slate-600 hover:text-slate-900">
          Xem tất cả
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
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
              <div className="text-xs text-slate-500">Còn lại: {a.endsIn}</div>
              <div className="mt-auto text-base font-semibold">
                Giá hiện tại: {a.current.toLocaleString("vi-VN")}₫
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
