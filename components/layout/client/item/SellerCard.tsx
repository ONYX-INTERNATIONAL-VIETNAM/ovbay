import Link from "next/link";

export default function SellerCard({
  seller,
}: {
  seller: { slug: string; name: string; rating?: number; followers?: number; since?: string };
}) {
  return (
    <section className="rounded-2xl border bg-white/70 p-5 backdrop-blur">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-sm text-slate-500">Người bán</div>
          <Link href={`/store/${seller.slug}`} className="text-lg font-semibold hover:underline">
            {seller.name}
          </Link>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-slate-600">
            {seller.rating && <span>⭐ {seller.rating.toFixed(1)}</span>}
            {seller.followers && <span>• {seller.followers.toLocaleString()} theo dõi</span>}
            {seller.since && <span>• Hoạt động từ {seller.since}</span>}
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            href={`/messages/new?to=${seller.slug}`}
            className="rounded-xl border bg-white px-4 py-2 text-sm hover:bg-slate-50"
          >
            Nhắn tin
          </Link>
          <Link
            href={`/store/${seller.slug}`}
            className="rounded-xl bg-[var(--secondary-color)] px-4 py-2 text-sm font-medium text-slate-900 hover:bg-amber-400"
          >
            Vào cửa hàng
          </Link>
        </div>
      </div>
    </section>
  );
}
