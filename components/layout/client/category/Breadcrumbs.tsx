import Link from "next/link";

type Crumb = { href: string; label: string; current?: boolean };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((c, i) => (
          <li key={c.href} className="flex items-center gap-1">
            {i > 0 && <span className="text-slate-400">/</span>}
            {c.current ? (
              <span className="font-medium text-slate-900">{c.label}</span>
            ) : (
              <Link href={c.href} className="hover:text-slate-900">
                {c.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
