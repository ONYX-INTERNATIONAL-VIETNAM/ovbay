import Link from "next/link";
import Image from "next/image";

type Props = { items: { slug: string; name: string; cover: string }[] };

export default function CategoryGrid({ items }: Props) {
  return (
    <section aria-labelledby="cat-heading" className="py-6">
      {/* Tiêu đề giữa, co giãn kích thước */}
      <h2
        className="my-6 text-center font-bold text-[#2E353F] sm:my-8 text-2xl md:text-3xl"
      >
        Danh mục nổi bật
      </h2>

      {/* 2 → 3 → 4 cột; gap theo breakpoint */}
      <div className="mx-auto grid max-w-6xl grid-cols-2 px-2 sm:grid-cols-3 gap-4 md:grid-cols-4 md:gap-6 lg:gap-10">
        {items.map((c) => (
          <Link
            key={c.slug}
            href={`/c/${c.slug}`}
            className="group block rounded-[22px] bg-[var(--background-color,white)] p-3 shadow-[0_6px_18px_rgba(0,0,0,0.08)] ring-1 ring-black/5 transition md:hover:-translate-y-1 md:hover:shadow-[0_14px_34px_rgba(0,0,0,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--secondary-color,#6366f1)]"
          >
            {/* Khung ảnh: giữ tỉ lệ vuông, không nhảy layout */}
            <div className="overflow-hidden rounded-[18px]">
              <div className="relative aspect-square w-full">
                <Image
                  src={c.cover}
                  alt={c.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1280px) 25vw, 220px"
                  className="object-contain p-3 sm:p-4 transition-transform duration-300 md:group-hover:scale-[1.03]"
                />
              </div>
            </div>

            {/* Tên danh mục giữa, cỡ chữ thích ứng */}
            <div className="mt-3 text-center text-sm font-semibold text-slate-700 sm:text-base md:text-lg">
              {c.name}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
