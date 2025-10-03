import Link from "next/link";

type Auction = {
  id: string;
  title: string;
  current: number;
  image: string;
  endsIn: string; // "02:14:51"
};

export default function AuctionCard({ item }: { item: Auction }) {
  return (
    <Link
      href={`/auction/${item.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border bg-white"
    >
      <div
        className="h-40 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
        style={{ backgroundImage: `url(${item.image})` }}
        aria-hidden
      />
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="line-clamp-2 text-sm font-semibold">{item.title}</div>
        <div className="text-xs text-slate-500">Còn lại: {item.endsIn}</div>
        <div className="mt-auto text-base font-semibold">
          Giá hiện tại: {item.current.toLocaleString("vi-VN")}₫
        </div>
      </div>
    </Link>
  );
}
