// lib/chatBus.ts
export const CHAT_OPEN_EVENT = "ov:chat-open";

export type ChatOpenPayload = {
  /** id hoặc name/slug của seller cần mở */
  to?: string;
  /** text gợi ý để sẵn trong ô nhập (tuỳ chọn) */
  prefill?: string;
};

export function openChat(payload?: ChatOpenPayload) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CHAT_OPEN_EVENT, { detail: payload ?? {} }));
}
