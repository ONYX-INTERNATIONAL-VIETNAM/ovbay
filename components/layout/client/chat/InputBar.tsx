"use client";
import { Button } from "@/components/ui/button";
import { Paperclip, Smile, ImageIcon, Film, Mic, FileText, Send } from "lucide-react";
import * as React from "react";

export default function InputBar({
  value, setValue, onSend,
}: { value: string; setValue: (v: string) => void; onSend: () => void }) {
  return (
    <div className="border-t bg-white p-2">
      <div className="flex items-center gap-2">
        {[Smile, ImageIcon, Film, Mic, FileText, Paperclip].map((Icon, i) => (
          <button key={i} title={`Icon ${i}`} className="grid h-8 w-8 place-items-center rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-50">
            <Icon className="h-4 w-4" />
          </button>
        ))}

        <textarea
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onSend(); }
          }}
          placeholder="Nhập nội dung tin nhắn"
          className="min-h-[2.25rem] max-h-24 h-9 w-full flex-1 resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none placeholder:text-slate-400"
        />

        <Button onClick={onSend} className="h-9 rounded-lg bg-[#111827] px-4 text-white hover:bg-[#111827]/90">
          Gửi <Send className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
