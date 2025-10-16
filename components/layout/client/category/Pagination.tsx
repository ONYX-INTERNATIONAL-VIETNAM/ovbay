"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Pagination({
  page,
  pageSize,
  total,
  baseHref,
}: {
  page: number;
  pageSize: number;
  total: number;
  baseHref: string;
}) {
  const sp = useSearchParams();
  const pages = Math.max(1, Math.ceil(total / pageSize));

  const urlFor = (p: number) => {
    const qp = new URLSearchParams(sp.toString());
    qp.set("page", String(p));
    return `${baseHref}?${qp.toString()}`;
    };

  if (pages <= 1) return null;

  const nums = Array.from({ length: pages }, (_, i) => i + 1).slice(
    Math.max(0, page - 3),
    Math.min(pages, page + 2)
  );

  return (
    <nav aria-label="Phân trang" className="mt-4 flex justify-center">
      <ul className="inline-flex items-center gap-2">
        <li>
          <Link
            href={urlFor(Math.max(1, page - 1))}
            className="rounded-xl border bg-white px-3 py-1.5 text-sm hover:bg-slate-50"
          >
            Trước
          </Link>
        </li>
        {nums.map((p) => (
          <li key={p}>
            <Link
              href={urlFor(p)}
              className={`rounded-xl border px-3 py-1.5 text-sm ${p === page ? "bg-[var(--secondary-color)] text-slate-900 border-amber-500" : "bg-white hover:bg-slate-50"}`}
            >
              {p}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href={urlFor(Math.min(pages, page + 1))}
            className="rounded-xl border bg-white px-3 py-1.5 text-sm hover:bg-slate-50"
          >
            Sau
          </Link>
        </li>
      </ul>
    </nav>
  );
}
