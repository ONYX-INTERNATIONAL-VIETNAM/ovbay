"use client";
import { MessageSquare } from "lucide-react";

export default function DockButton({
    onOpen,
    unreadCount = 0,
    side = "right",            // "left" | "right"
    bottom = 16,               // px offset từ đáy
  }: {
    onOpen: () => void;
    unreadCount?: number;
    side?: "left" | "right";
    bottom?: number;
  }) {
    const hasUnread = unreadCount > 0;
  
    const sideClass =
      side === "left"
        ? "left-[env(safe-area-inset-left,1rem)] rounded-r-xl"
        : "right-[env(safe-area-inset-right,1rem)] rounded-l-xl";
  
    const badgeSideClass = side === "left" ? "-right-2" : "-left-2";
  
    return (
      <button
        type="button"
        onClick={onOpen}
        aria-label="Mở chat"
        className={[
          "fixed",
          sideClass,
          `bottom-[calc(env(safe-area-inset-bottom,0px)+${bottom}px)] md:bottom-6 z-[100]`,
          "relative flex items-center gap-2 px-3 py-2",
          "bg-[#ff5722] text-white shadow-[0_8px_30px_rgba(0,0,0,.18)]",
          "hover:brightness-110 active:scale-[0.99] transition",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#ff5722]",
        ].join(" ")}
      >
        {hasUnread && (
          <span
            className={`absolute -top-2 ${badgeSideClass} grid h-5 min-w-[20px] place-items-center rounded-full bg-red-500 px-1 text-[10px] font-bold`}
            style={{ lineHeight: 1 }}
          >
            {unreadCount}
          </span>
        )}
        <span className="grid h-7 w-7 place-items-center rounded-md bg-white/15">
          <MessageSquare className="h-4 w-4" />
        </span>
        <span className="pr-1 text-[15px] font-semibold">Chat</span>
      </button>
    );
  }