import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";

export type VideoItem = {
  id: string;
  title: string;
  thumbnail: string;
  views: number;
  live?: boolean;        // hiển thị viền gradient + badge "Live"
  highlighted?: boolean; // viền xanh dương (thẻ đang được chọn)
};

const formatViews = (n: number) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return `${n}`;
};

export default function VideoCard({ item }: { item: VideoItem }) {
  // Lớp viền theo trạng thái
  const wrapperClass = item.live
    ? "bg-gradient-to-br from-violet-500 to-orange-500 p-[2px] rounded-2xl"
    : item.highlighted
    ? "rounded-2xl ring-2 ring-blue-500"
    : "rounded-2xl border border-slate-200";

  return (
    <div className={`h-full`}>
      <div className={wrapperClass}>
        <Link
          href={`/video/${item.id}`}
          className="group min-w-0 flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-0.5"
        >
          {/* Ảnh + overlay nút Play */}
          <div className="relative grid aspect-[4/3] place-items-center bg-slate-50">
            <Image
              src={item.thumbnail}
              alt={item.title}
              width={480}
              height={360}
              sizes="(max-width: 640px) 60vw, (max-width: 1024px) 36vw, 22vw"
              className="h-24 w-auto object-contain sm:h-28 lg:h-32"
            />

            {/* Nút play tròn giữa ảnh */}
            <span className="absolute inset-0 grid place-items-center">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-slate-900/80 shadow-md transition group-hover:scale-105">
                <Play className="h-6 w-6 text-white" />
              </span>
            </span>

            {/* Badge Live */}
            {item.live && (
              <span className="absolute right-2 bottom-2 rounded-full bg-gradient-to-br from-orange-500 to-red-500 px-2 py-0.5 text-[11px] font-semibold text-white shadow">
                Live
              </span>
            )}
          </div>

          {/* Title + Views */}
          <div className="min-w-0 flex flex-1 flex-col p-3">
            <div className="min-w-0 break-words line-clamp-2 text-sm font-semibold text-slate-800">
              {item.title}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              {formatViews(item.views)} lượt xem
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
