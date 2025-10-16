"use client";

import Link from "next/link";
import * as React from "react";
import { MdAndroid  } from "react-icons/md"
import {  ImHammer2  } from "react-icons/im"
import { IoStorefrontSharp } from "react-icons/io5";

export type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/c/electronics", label: "Điện tử", icon: MdAndroid },
  { href: "/auctions", label: "Đấu giá", icon: ImHammer2 },
  { href: "/stores", label: "Cửa hàng", icon: IoStorefrontSharp },
];

export default function MainNav() {
  return (
    <nav aria-label="Chính" className="hidden md:block">
      <ul className="ml-1 flex items-center gap-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-white hover:bg-white/10"
            >
              <Icon className="h-4 w-4 opacity-90" aria-hidden="true" />
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
