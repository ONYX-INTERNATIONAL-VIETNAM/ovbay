import Link from "next/link";
import { Button } from "@/components/ui/button";

type Meta = {
  slug: string;
  name: string;
  banner: string;
  avatar: string;
  rating: number; // 4.8
  reviews: number; // 1280
  followers: number; // 15.2k
  since?: string; // 2021
  description?: string;
};

export default function StoreHeader({ meta }: { meta: Meta | null }) {
  if (!meta) {
    return (
      <div className="rounded-2xl border bg-white/70 p-6 text-slate-600 backdrop-blur">
        Cửa hàng không tồn tại hoặc đã bị ẩn.
      </div>
    );
  }

  return (
    <section className="overflow-hidden rounded-2xl border bg-white/70 shadow-sm backdrop-blur">
      <div
        className="h-36 w-full bg-cover bg-center md:h-48"
        style={{ backgroundImage: `url(${meta.banner})` }}
        aria-hidden
      />
      <div className="flex flex-col gap-4 p-4 md:flex-row md:items-end md:justify-between md:p-6">
        <div className="flex items-end gap-4">
          <div
            className="h-20 w-20 -mt-16 rounded-2xl border-4 border-white bg-cover bg-center shadow-md"
            style={{ backgroundImage: `url(${meta.avatar})` }}
            aria-hidden
          />
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">{meta.name}</h1>
            <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-slate-600">
              <span>⭐ {meta.rating.toFixed(1)} ({meta.reviews.toLocaleString()} đánh giá)</span>
              <span>•</span>
              <span>{meta.followers.toLocaleString()} theo dõi</span>
              {meta.since && (
                <>
                  <span>•</span>
                  <span>Hoạt động từ {meta.since}</span>
                </>
              )}
            </div>
            {meta.description && (
              <p className="mt-2 max-w-2xl text-sm text-slate-600">{meta.description}</p>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <Button className="rounded-xl bg-amber-500 text-slate-900 hover:bg-amber-400">
            Theo dõi
          </Button>
          <Button variant="outline" asChild className="rounded-xl">
            <Link href={`/messages/new?to=${meta.slug}`}>Nhắn tin</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
