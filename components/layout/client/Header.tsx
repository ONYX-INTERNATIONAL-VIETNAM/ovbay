"use client";

import * as React from "react";
import Link from "next/link";
import MainNav, { NAV_ITEMS } from "./MainNav";
import GlobalSearch from "./GlobalSearch";
import { ShoppingCart, UserRound, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [open, setOpen] = React.useState(false);

  // TODO: thay bằng state thực tế từ store/context
  const cartCount = 0;

  // Đóng menu bằng phím Esc
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Khóa scroll nền khi mở menu
  React.useEffect(() => {
    const cls = "overflow-hidden";
    const root = document.documentElement;
    if (open) root.classList.add(cls);
    else root.classList.remove(cls);
    return () => root.classList.remove(cls);
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-white/10 bg-[var(--primary-color)] text-slate-100 backdrop-blur supports-[backdrop-filter]:backdrop-blur">
        <div className="container mx-auto flex items-center gap-3 px-4 py-2.5">
          {/* LEFT (mobile): hamburger + logo */}
          <div className="flex flex-1 items-center gap-2 md:flex-none">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center justify-center rounded-lg p-2 hover:bg-white/10 md:hidden"
              aria-label="Mở menu"
              aria-expanded={open}
              aria-controls="mobile-drawer"
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link
              href="/"
              className="shrink-0 text-[20px] font-extrabold leading-none tracking-tight"
              aria-label="OVBAY - Trang chủ"
            >
              <span className="text-amber-500">OV</span>BAY
            </Link>
          </div>

          {/* NAV desktop */}
          <MainNav />

          {/* SEARCH desktop */}
          <div className="hidden flex-1 md:block">
            <GlobalSearch />
          </div>

          {/* RIGHT: actions */}
          {/* Desktop actions giữ nguyên */}
          <div className="ml-auto hidden items-center gap-2 md:flex">
            <Button
              variant="ghost"
              asChild
              className="rounded-full border border-white/30 bg-transparent px-3 py-1.5 text-sm text-slate-100 hover:bg-[var(--secondary-color)]"
            >
              <Link href="/auth/sign-in" aria-label="Đăng nhập">
                <UserRound className="mr-2 h-4 w-4" />
                Đăng nhập
              </Link>
            </Button>

            <Button
              asChild
              className="rounded-full bg-[var(--secondary-color)] px-3 py-1.5 text-sm font-medium text-slate-100 hover:bg-transparent border border-[var(--secondary-color)]  hover:border-white/30"
            >
              <Link href="/cart" aria-label="Giỏ hàng">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Giỏ hàng
              </Link>
            </Button>
          </div>

          {/* Mobile actions: icon-only để phần phải không trống */}
          <div className="ml-auto flex items-center gap-1 md:hidden">
            <Link
              href="/auth/sign-in"
              aria-label="Đăng nhập"
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 hover:bg-white/10"
            >
              <UserRound className="h-5 w-5" />
            </Link>

            <Link
              href="/cart"
              aria-label="Giỏ hàng"
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-amber-500 text-slate-900 hover:bg-amber-400"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* SEARCH mobile */}
        <div className="border-t border-white/10 px-4 pb-3 pt-2 md:hidden">
          <GlobalSearch />
        </div>
      </div>

      {/* ===== Drawer Mobile ===== */}
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/50 transition-opacity duration-200 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      />

      {/* Panel */}
      <aside
        id="mobile-drawer"
        className={`fixed inset-y-0 left-0 z-[61] w-[84%] max-w-[20rem] transform bg-slate-900 text-slate-100 shadow-2xl transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header panel */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="text-xl font-extrabold tracking-tight"
            aria-label="OVBAY - Trang chủ"
          >
            <span className="text-amber-500">OV</span>BAY
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-lg p-2 hover:bg-white/10"
            aria-label="Đóng menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search trong menu */}
        <div className="border-b border-white/10 px-4 py-3">
          <GlobalSearch />
        </div>

        {/* Nav items */}
        <nav aria-label="Menu di động" className="px-2 py-2">
          <ul className="space-y-1">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 text-[15px] text-slate-100 hover:bg-white/10"
                >
                  <Icon className="h-5 w-5 opacity-90" aria-hidden="true" />
                  <span>{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions trong drawer */}
        <div className="mt-auto border-t border-white/10 px-4 py-3">
          <div className="flex items-center gap-2">
            <Link
              href="/auth/sign-in"
              onClick={() => setOpen(false)}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/30 px-3 py-2 text-sm hover:bg-white/10"
            >
              <UserRound className="h-4 w-4" />
              <span>Đăng nhập</span>
            </Link>
            <Link
              href="/cart"
              onClick={() => setOpen(false)}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-amber-500 px-3 py-2 text-sm font-medium text-slate-900 hover:bg-amber-400"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Giỏ hàng</span>
            </Link>
          </div>
        </div>
      </aside>
    </header>
  );
}
