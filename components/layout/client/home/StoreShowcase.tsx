import Link from "next/link";

export default function StoreShowcase({
  stores,
}: {
  stores: { slug: string; name: string; banner: string }[];
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between">
        <h2 className="text-lg font-semibold">Cửa hàng tiêu biểu</h2>
        <Link href="/stores" className="text-sm text-slate-600 hover:text-slate-900">
          Xem tất cả
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {stores.map((s) => (
          <Link
            key={s.slug}
            href={`/store/${s.slug}`}
            className="group overflow-hidden rounded-2xl border bg-white/70 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div
              className="h-28 bg-cover bg-center transition-transform duration-300 group-hover:scale-[1.03]"
              style={{ backgroundImage: `url(${s.banner})` }}
              aria-hidden
            />
            <div className="px-3 py-2 text-sm font-medium">{s.name}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
