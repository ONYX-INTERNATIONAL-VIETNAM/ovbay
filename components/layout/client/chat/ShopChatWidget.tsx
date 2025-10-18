"use client";

import * as React from "react";
import DockButton from "./DockButton";
import ShopeeChatPanel from "./ShopChatPanel";
import type { Conv, Msg } from "@/lib/data";
import { CHAT_OPEN_EVENT, type ChatOpenPayload } from "@/lib/chatBus";

// ===== Fake data gốc =====
const CONVS_SEED: Conv[] = [
  { id: "bare",  name: "bare_official", avatar: "/images/p1.png", last: "Đánh giá để nhận Sho...", dateLabel: "Ngày hôm qua" },
  { id: "flash", name: "Flash Titan",    avatar: "/images/a2.webp", last: "Còn nếu bạn thích gọ...", dateLabel: "17/09" },
  { id: "bala",  name: "balaenavn",      avatar: "/images/a3.webp", last: "Quý khách hàng hunh...", dateLabel: "14/09/24" },
];

const INIT_MSGS: Msg[] = [
  {
    id: "m1",
    from: "shop",
    type: "card",
    ts: Date.now() - 86400000,
    title: "Đánh giá để nhận 300 xu!",
    image: "/images/p1.png",
    subtitle: "BARE_Áo sơ mi tay ngắn thêu xinh, áo sơ mi form rộng chất...",
    price: "Tổng cộng 1 sản phẩm: 66.750đ",
    cta: "Đánh giá ngay",
  },
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

  // CHÚ Ý: convs bây giờ là STATE để có thể thêm mới từ outside
  const [convs, setConvs] = React.useState<Conv[]>(CONVS_SEED);
  const [active, setActive] = React.useState(convs[0]?.id ?? "");
  const [filter, setFilter] = React.useState("");
  const [typingFor, setTypingFor] = React.useState<string | null>(null);
  const [online, setOnline] = React.useState(true);
  const [input, setInput] = React.useState("");

  const [msgs, setMsgs] = React.useState<Record<string, Msg[]>>({
    [convs[0]?.id ?? ""]: INIT_MSGS,
  });

  const [unread, setUnread] = React.useState<Record<string, number>>({
    [convs[0]?.id ?? ""]: 0,
  });

  // presence fake
  React.useEffect(() => {
    const id = setInterval(() => setOnline((o) => !o), 8000);
    return () => clearInterval(id);
  }, []);

  // random incoming messages (demo)
  React.useEffect(() => {
    let alive = true;
    (async () => {
      while (alive) {
        await sleep(2500 + Math.random() * 3500);
        if (!convs.length) continue;
        const pick = convs[Math.floor(Math.random() * convs.length)].id;

        setTypingFor(pick);
        await sleep(600 + Math.random() * 600);

        const text = BOT_LINES[Math.floor(Math.random() * BOT_LINES.length)];
        setMsgs((m) => ({
          ...m,
          [pick]: [
            ...(m[pick] ?? []),
            { id: crypto.randomUUID(), from: "shop", type: "text", text, ts: Date.now() },
          ],
        }));
        setTypingFor(null);

        if (!open || pick !== active) {
          setUnread((u) => ({ ...u, [pick]: (u[pick] ?? 0) + 1 }));
        }
      }
    })();
    return () => {
      alive = false;
    };
  }, [open, active, convs]);

  // mark read khi mở/switch
  React.useEffect(() => {
    if (!open) return;
    setUnread((u) => ({ ...u, [active]: 0 }));
  }, [open, active]);

  // LẮNG NGHE: openChat từ nơi khác (nút "Nhắn tin")
  React.useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<ChatOpenPayload>).detail || {};
      const to = (detail.to || "").trim();
      setOpen(true);
      setMax(false);

      if (to) {
        // tìm theo id HOẶC theo name
        setConvs((prev) => {
          const found = prev.find((c) => c.id === to || c.name === to);
          if (found) return prev;
          const newbie: Conv = {
            id: to,
            name: to,
            avatar: "/images/p1.png",
            last: "",
            dateLabel: "Hôm nay",
          };
          // thêm lên đầu danh sách
          return [newbie, ...prev];
        });

        // đảm bảo có thread rỗng nếu chưa có
        setMsgs((m) => (m[to] ? m : { ...m, [to]: [] }));
        setUnread((u) => ({ ...u, [to]: 0 }));
        setActive(to);
      }

      // prefill text nếu có
      if (detail.prefill) setInput(detail.prefill);
    };

    window.addEventListener(CHAT_OPEN_EVENT, handler as EventListener);
    return () => window.removeEventListener(CHAT_OPEN_EVENT, handler as EventListener);
  }, []);

  const send = (text?: string) => {
    const t = (text ?? input).trim();
    if (!t) return;

    setMsgs((m) => ({
      ...m,
      [active]: [
        ...(m[active] ?? []),
        { id: crypto.randomUUID(), from: "me", type: "text", text: t, ts: Date.now() },
      ],
    }));
    setInput("");

    // reply demo
    (async () => {
      setTypingFor(active);
      await sleep(650);
      const reply = BOT_LINES[Math.floor(Math.random() * BOT_LINES.length)];
      setMsgs((m) => ({
        ...m,
        [active]: [
          ...(m[active] ?? []),
          { id: crypto.randomUUID(), from: "shop", type: "text", text: reply, ts: Date.now() },
        ],
      }));
      setTypingFor(null);
    })();
  };

  const totalUnread = Object.values(unread).reduce((a, b) => a + b, 0);

  return (
    <>
      {!open && (
        <DockButton
          side="right"
          x={16}
          bottom={16}
          unreadCount={totalUnread}
          onOpen={() => {
            setOpen(true);
            setMax(false);
            setUnread((u) => ({ ...u, [active]: 0 }));
          }}
        />
      )}

      <ShopeeChatPanel
        open={open}
        max={max}
        setMax={setMax}
        onClose={() => {
          setOpen(false);
          setMax(false);
        }}
        convs={convs}
        active={active}
        setActive={(id) => {
          setActive(id);
          setUnread((u) => ({ ...u, [id]: 0 }));
        }}
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
