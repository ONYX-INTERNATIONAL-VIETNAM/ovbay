"use client";

import * as React from "react";
import { CART_KEY } from "@/utils/addToCart";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  qty: number;
  stock: number;
  store?: string;
};

// ✅ 1) Khởi tạo state từ localStorage ngay lập tức (không dùng effect để load)
function initFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    console.log("[useCart]init", arr);
    return Array.isArray(arr) ? arr : [];
  } catch (e) {
    console.error("[useCart]init error", e);
    return [];
  }
}

export function useCart() {
  const [items, setItems] = React.useState<CartItem[]>(initFromStorage);

  // ✅ 2) Chặn “save” ở lần mount đầu để không overwrite dữ liệu mới load
  const didMountRef = React.useRef(false);
  React.useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return; // skip save lần đầu
    }
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
      console.log("[useCart] saved", items);
    } catch (e) {
      console.error("[useCart] save error", e);
    }
  }, [items]);

  // (tuỳ chọn) đồng bộ giữa nhiều tab
  React.useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === CART_KEY) {
        try {
          const arr = e.newValue ? JSON.parse(e.newValue) : [];
          setItems(Array.isArray(arr) ? arr : []);
          console.log("[useCart] storage sync", arr);
        } catch {}
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setQty = (id: string, qty: number) =>
    setItems((arr) =>
      arr.map((x) => (x.id === id ? { ...x, qty: Math.max(1, Math.min(x.stock, qty)) } : x))
    );
  const inc = (id: string) => setItems((arr) => arr.map((x) => (x.id === id ? { ...x, qty: Math.min(x.stock, x.qty + 1) } : x)));
  const dec = (id: string) => setItems((arr) => arr.map((x) => (x.id === id ? { ...x, qty: Math.max(1, x.qty - 1) } : x)));
  const remove = (id: string) => setItems((arr) => arr.filter((x) => x.id !== id));
  const clear = () => setItems([]);

  const subtotal = items.reduce((s, x) => s + x.price * x.qty, 0);
  return { items, setItems, setQty, inc, dec, remove, clear, subtotal };
}
