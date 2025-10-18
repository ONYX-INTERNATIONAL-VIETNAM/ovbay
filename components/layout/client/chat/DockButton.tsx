"use client";
import * as React from "react";
import { MessageSquare } from "lucide-react";

type Side = "left" | "right";

export default function DockButton({
  onOpen,
  unreadCount = 0,
  side = "right",      // Shopee: góc phải
  bottom = 16,         // px offset từ đáy
  x = 16,              // px offset từ mép
  label = "Chat",
}: {
  onOpen: () => void;
  unreadCount?: number;
  side?: Side;
  bottom?: number;
  x?: number;
  label?: string;
}) {
  const hasUnread = unreadCount > 0;

  const posStyle: React.CSSProperties =
    side === "left"
      ? {
          left: `calc(env(safe-area-inset-left, 0px) + ${x}px)`,
          bottom: `calc(env(safe-area-inset-bottom, 0px) + ${bottom}px)`,
        }
      : {
          right: `calc(env(safe-area-inset-right, 0px) + ${x}px)`,
          bottom: `calc(env(safe-area-inset-bottom, 0px) + ${bottom}px)`,
        };

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={label}
      style={posStyle}
      className={[
        "fixed z-[100] pointer-events-auto",
        // Hình dạng & màu giống Shopee
        "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2",
        "bg-[#ee4d2d] text-white shadow-[0_10px_30px_rgba(0,0,0,0.18)]",
        "hover:brightness-110 active:scale-[0.99] transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#ee4d2d]",
      ].join(" ")}
    >
      {/* badge unread */}
      {hasUnread && (
        <span
          className="absolute -top-2 -right-2 grid h-5 min-w-[20px] place-items-center rounded-full bg-red-500 px-1 text-[10px] font-bold"
          style={{ lineHeight: 1 }}
          aria-live="polite"
        >
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}

      <span className="grid h-6 w-6 place-items-center rounded-full bg-white/15">
        <MessageSquare className="h-4 w-4" />
      </span>
      <span className="text-[14px] font-semibold">{label}</span>
    </button>
  );
}
