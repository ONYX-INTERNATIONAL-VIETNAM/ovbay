import Link from "next/link";
import Image from "next/image";

type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  store?: string;
  featured?: boolean;
  compareAt?: number; // giá gốc (tuỳ chọn)
};

const formatVND = (n: number) => `${n.toLocaleString("vi-VN")} VND`;

export default function ProductCard({ item }: { item: Product }) {
  return (
    <Link
      href={`/item/${item.id}`}
      className="group flex h-full min-w-[220px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5"
    >
      {/* Khung ảnh xám nhạt, ảnh nổi có đổ bóng */}
      <div className="grid aspect-[4/3] place-items-center bg-[var(--background-color)] p-3 sm:p-4">
        <Image
          src={item.image}
          alt={item.title}
          width={360}
          height={360}
          priority={false}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="h-24 w-auto object-contain drop-shadow-md sm:h-28 lg:h-32"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="line-clamp-2 text-sm font-medium text-slate-800">
          {item.title}
        </div>

        <div className="mt-auto flex items-baseline gap-2">
          <span className="text-sm font-semibold text-slate-900">
            {formatVND(item.price)}
          </span>
          {item.compareAt && item.compareAt > item.price && (
            <span className="text-xs text-slate-400 line-through">
              {formatVND(item.compareAt)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
