"use client";

export default function MessageBubble({
  from,
  children,
}: {
  from: "me" | "shop";
  children: React.ReactNode;
}) {
  const isMe = from === "me";
  return (
    <div className={`mt-1 flex gap-2 ${isMe ? "justify-end" : ""}`}>
      {!isMe && (
        <div className="grid h-7 w-7 place-items-center rounded-full bg-slate-300 text-[11px] font-semibold text-slate-700">
          S
        </div>
      )}
      <div
        className={`max-w-[80%] md:max-w-[65%] rounded-2xl px-3 py-2 text-sm leading-snug ${
          isMe
            ? "rounded-br-md bg-slate-900 text-white"
            : "rounded-bl-md border border-slate-200 bg-white text-slate-800"
        } break-words whitespace-pre-wrap`}
        style={{ overflowWrap: "anywhere" }}
      >
        {children}
      </div>
    </div>
  );
}
