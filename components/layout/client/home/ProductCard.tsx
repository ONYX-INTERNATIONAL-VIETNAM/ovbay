import Link from "next/link";
import { Badge } from "@/components/ui/badge";

type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  store?: string;
  featured?: boolean;
};

export default function ProductCard({ item }: { item: Product }) {
  return (
    <Link
      href={`/item/${item.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-white/70 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div
        className="h-40 bg-cover bg-center transition-transform duration-300 group-hover:scale-[1.03]"
        style={{ backgroundImage: `url(${item.image})` }}
        aria-hidden
      />
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="line-clamp-2 text-sm font-medium">{item.title}</div>
        <div className="text-xs text-slate-500">{item.store}</div>
        <div className="mt-auto flex items-center justify-between">
          <div className="text-base font-semibold">
            {item.price.toLocaleString("vi-VN")}₫
          </div>
          {item.featured && (
            <Badge className="bg-amber-500 text-slate-900">Featured</Badge>
          )}
        </div>
      </div>
    </Link>
  );
}
