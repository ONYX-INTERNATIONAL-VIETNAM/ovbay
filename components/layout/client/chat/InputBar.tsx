"use client";
import { Button } from "@/components/ui/button";
import { Paperclip, Smile, ImageIcon, Film, Mic, FileText, Send } from "lucide-react";
import * as React from "react";

export default function InputBar({
  value,
  setValue,
  onSend,
}: { value: string; setValue: (v: string) => void; onSend: () => void }) {
  const disabled = value.trim().length === 0;

  return (
    <div className="border-t bg-white p-2">
      <div className="flex items-end md:items-center gap-2">
        {/* Icons: ẩn trên mobile, giữ trên desktop để input mobile được full */}
        <div className="hidden md:flex items-center gap-2">
          {[Smile, ImageIcon, Film, Mic, FileText, Paperclip].map((Icon, i) => (
            <button
              key={i}
              title={`Icon ${i}`}
              className="grid h-8 w-8 place-items-center rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>

        <textarea
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (!disabled) onSend();
            }
          }}
          placeholder="Nhập nội dung tin nhắn"
          className={[
            // Mobile: cao hơn và font 16 để dễ bấm + tránh iOS zoom
            "h-11 min-h-[44px] text-[16px]",
            // Desktop: giữ nguyên như cũ
            "md:h-9 md:min-h-[2.25rem] md:text-sm",
            // Full width (lấy hết phần còn lại), không absolute nên không lệch
            "w-full flex-1 max-h-24 resize-none rounded-lg border border-slate-200 bg-white",
            "px-3 py-2.5 md:py-2 placeholder:text-slate-400 outline-none",
          ].join(" ")}
        />

        <Button
          onClick={onSend}
          disabled={disabled}
          className="h-11 md:h-9 rounded-lg bg-[#111827] px-4 text-white hover:bg-[#111827]/90 disabled:opacity-50"
        >
          Gửi <Send className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
