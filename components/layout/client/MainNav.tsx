"use client";

import Link from "next/link";
import { Hammer, Store, Shapes } from "lucide-react";

const items = [
  { href: "/c/electronics", label: "Điện tử", icon: Shapes },
  { href: "/auctions", label: "Đấu giá", icon: Hammer },
  { href: "/stores", label: "Cửa hàng", icon: Store },
];

export default function MainNav() {
  return (
    <nav aria-label="Chính" className="hidden md:block">
      <ul className="flex items-center gap-2">
        {items.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-slate-100"
            >
              <Icon className="h-4 w-4" /> {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
