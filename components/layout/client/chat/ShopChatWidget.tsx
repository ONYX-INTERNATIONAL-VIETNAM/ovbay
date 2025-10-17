"use client";

import * as React from "react";
import DockButton from "./DockButton";
import ShopeeChatPanel from "./ShopChatPanel";
import type { Conv, Msg } from "@/lib/data";

// ===== Fake data =====
const CONVS: Conv[] = [
  { id: "bare",  name: "bare_official", avatar: "/img/avatar.png", last: "Đánh giá để nhận Sho...", dateLabel: "Ngày hôm qua" },
  { id: "flash", name: "Flash Titan",    avatar: "/img/avatar.png", last: "Còn nếu bạn thích gọ...", dateLabel: "17/09" },
  { id: "bala",  name: "balaenavn",      avatar: "/img/avatar.png", last: "Quý khách hàng hunh...", dateLabel: "14/09/24" },
];

const INIT_MSGS: Msg[] = [
  { id: "m1", from: "shop", type: "card", ts: Date.now() - 86400000, title: "Đánh giá để nhận 300 xu!", image: "/img/shirt.png", subtitle: "BARE_Áo sơ mi tay ngắn thêu xinh, áo sơ mi form rộng chất...", price: "Tổng cộng 1 sản phẩm: 66.750đ", cta: "Đánh giá ngay" },
];

const BOT_LINES = [
  "Shop xin chào ạ 👋",
  "Bạn cần tư vấn thêm về size hay màu không?",
  "Đơn trên 149K được freeship nhé!",
  "Bảo hành chính hãng 12 tháng ạ!",
  "Có mã giảm giá hôm nay nè 🎉",
];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function ShopChatWidget() {
  const [open, setOpen] = React.useState(false);
  const [max, setMax] = React.useState(false);
  const [active, setActive] = React.useState(CONVS[0].id);
  const [filter, setFilter] = React.useState("");
  const [typingFor, setTypingFor] = React.useState<string | null>(null);
  const [online, setOnline] = React.useState(true);

  const [msgs, setMsgs] = React.useState<Record<string, Msg[]>>({
    [CONVS[0].id]: INIT_MSGS,
    [CONVS[1].id]: [],
    [CONVS[2].id]: [],
  });

  const [unread, setUnread] = React.useState<Record<string, number>>({ bare: 0, flash: 0, bala: 0 });
  const [dockUnread, setDockUnread] = React.useState(false);
  const [input, setInput] = React.useState("");

  // presence fake
  React.useEffect(() => {
    const id = setInterval(() => setOnline((o) => !o), 8000);
    return () => clearInterval(id);
  }, []);

  // random incoming messages
  React.useEffect(() => {
    let alive = true;
    (async () => {
      while (alive) {
        await sleep(2500 + Math.random() * 3500);
        const pick = CONVS[Math.floor(Math.random() * CONVS.length)].id;
        setTypingFor(pick);
        await sleep(600 + Math.random() * 600);
        const text = BOT_LINES[Math.floor(Math.random() * BOT_LINES.length)];
        setMsgs((m) => ({ ...m, [pick]: [...(m[pick] ?? []), { id: crypto.randomUUID(), from: "shop", type: "text", text, ts: Date.now() }] }));
        setTypingFor(null);
        if (!open || pick !== active) { setUnread((u) => ({ ...u, [pick]: (u[pick] ?? 0) + 1 })); setDockUnread(true); }
      }
    })();
    return () => { alive = false; };
  }, [open, active]);

  // mark read on open/switch
  React.useEffect(() => {
    if (!open) return;
    setUnread((u) => ({ ...u, [active]: 0 }));
    setDockUnread(Object.entries(unread).some(([id, n]) => id !== active && n > 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, active]);

  const send = (text?: string) => {
    const t = (text ?? input).trim();
    if (!t) return;
    setMsgs((m) => ({ ...m, [active]: [...(m[active] ?? []), { id: crypto.randomUUID(), from: "me", type: "text", text: t, ts: Date.now() }] }));
    setInput("");
    (async () => {
      setTypingFor(active);
      await sleep(650);
      const reply = BOT_LINES[Math.floor(Math.random() * BOT_LINES.length)];
      setMsgs((m) => ({ ...m, [active]: [...(m[active] ?? []), { id: crypto.randomUUID(), from: "shop", type: "text", text: reply, ts: Date.now() }] }));
      setTypingFor(null);
    })();
  };

  const totalUnread = Object.values(unread).reduce((a, b) => a + b, 0);
  
  return (
    <>
{!open && (
  <DockButton
    unreadCount={totalUnread}
    onOpen={() => {
      setOpen(true);
      setUnread((u) => ({ ...u, [active]: 0 }));
    }}
  />
)}

      <ShopeeChatPanel
        open={open}
        max={max}
        setMax={setMax}
        onClose={() => setOpen(false)}
        convs={CONVS}
        active={active}
        setActive={(id) => { setActive(id); setUnread((u) => ({ ...u, [id]: 0 })); setDockUnread(false); }}
        msgs={msgs}
        typingFor={typingFor}
        online={online}
        filter={filter}
        setFilter={setFilter}
        input={input}
        setInput={setInput}
        onSend={() => send()}
      />
    </>
  );
}
