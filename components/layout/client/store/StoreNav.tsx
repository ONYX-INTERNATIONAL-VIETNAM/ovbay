import Link from "next/link";

export default function StoreNav({
  baseHref,
  active,
  total,
}: {
  baseHref: string;
  active: string; // all | featured | best
  total: number;
}) {
  const tabs = [
    { key: "all", label: `Tất cả (${total})` },
    { key: "featured", label: "Featured" },
    { key: "best", label: "Best Sellers" },
  ];

  const urlFor = (k: string) => {
    const u = new URL(baseHref, "http://x");
    const search = new URLSearchParams();
    search.set("tab", k);
    return `${u.pathname}?${search.toString()}`;
  };

  return (
    <nav className="rounded-2xl border bg-white/70 p-1 backdrop-blur">
      <ul className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <li key={t.key}>
            <Link
              href={urlFor(t.key)}
              className={`block rounded-xl px-4 py-2 text-sm ${
                active === t.key
                  ? "bg-amber-500 text-slate-900"
                  : "bg-white hover:bg-slate-50 border"
              }`}
            >
              {t.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
