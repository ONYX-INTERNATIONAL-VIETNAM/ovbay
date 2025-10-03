import Link from "next/link";

type Props = { items: { slug: string; name: string; cover: string }[] };

export default function CategoryGrid({ items }: Props) {
  return (
    <section aria-labelledby="cat-heading" className="space-y-4">
      <div className="flex items-end justify-between">
        <h2 id="cat-heading" className="text-lg font-semibold">Danh mục nổi bật</h2>
        <Link href="/search" className="text-sm text-slate-600 hover:text-slate-900">Xem tất cả</Link>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
        {items.map((c) => (
          <Link
            key={c.slug}
            href={`/c/${c.slug}`}
            className="group overflow-hidden rounded-2xl border bg-white/70 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div
              className="h-28 w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-[1.03]"
              style={{ backgroundImage: `url(${c.cover})` }}
              aria-hidden
            />
            <div className="flex items-center justify-between px-3 py-2">
              <div className="text-sm font-medium">{c.name}</div>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600">
                Xem
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
