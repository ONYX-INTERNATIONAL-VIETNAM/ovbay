import ProductCard from "@/components/layout/client/home/ProductCard";

type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  store?: string;
  featured?: boolean;
};

export default function ProductGrid({ items }: { items: Product[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-4">
      {items.map((p) => (
        <ProductCard key={p.id} item={p} />
      ))}
    </div>
  );
}
