import ProductCard from "@/components/layout/client/home/ProductCard";

type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  store?: string;
  featured?: boolean;
};

export default function ProductRail({
  title,
  items,
}: {
  title: string;
  items: Product[];
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <a href="/search" className="text-sm text-slate-600 hover:text-slate-900">Xem tất cả</a>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        {items.map((p) => (
          <ProductCard key={p.id} item={p} />
        ))}
      </div>
    </section>
  );
}
