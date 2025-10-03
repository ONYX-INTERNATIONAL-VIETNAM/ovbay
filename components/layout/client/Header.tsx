"use client";

import Link from "next/link";
import MainNav from "./MainNav";
import GlobalSearch from "./GlobalSearch";
import { ShoppingCart, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <div className="container mx-auto flex items-center gap-3 px-4 py-3">
        <Link href="/" className="shrink-0 text-xl font-extrabold tracking-tight">
          <span className="text-amber-500">OV</span>BAY
        </Link>

        <MainNav />

        <div className="hidden flex-1 md:block">
          <GlobalSearch />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" asChild className="hidden md:inline-flex">
            <Link href="/auth/sign-in">
              <UserRound className="mr-2 h-5 w-5" /> Đăng nhập
            </Link>
          </Button>
          <Button asChild className="bg-amber-500 text-slate-900 hover:bg-amber-400">
            <Link href="/cart">
              <ShoppingCart className="mr-2 h-5 w-5" /> Giỏ hàng
            </Link>
          </Button>
        </div>
      </div>

      {/* search bar mobile */}
      <div className="border-t px-4 pb-3 pt-2 md:hidden">
        <GlobalSearch />
      </div>
    </header>
  );
}
