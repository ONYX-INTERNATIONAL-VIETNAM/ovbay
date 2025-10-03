// utils/addToCart.ts
export const CART_KEY = "ovcart";

type CartPayload = {
  id: string; title: string; price: number; image: string; stock: number; store?: string;
};

export function addToCart(item: CartPayload, qty: number) {
  if (typeof window === "undefined") return; // chỉ chạy client
  try {
    const raw = localStorage.getItem(CART_KEY);
    const arr: any[] = raw ? JSON.parse(raw) : [];
    const i = arr.findIndex((x) => x.id === item.id);
    if (i >= 0) {
      arr[i].qty = Math.min(arr[i].stock, (arr[i].qty ?? 0) + qty);
    } else {
      arr.push({ ...item, qty: Math.min(item.stock, Math.max(1, qty)) });
    }
    localStorage.setItem(CART_KEY, JSON.stringify(arr));
    console.log("[addToCart] saved", arr);
  } catch (e) {
    console.error("[addToCart] error", e);
  }
}
