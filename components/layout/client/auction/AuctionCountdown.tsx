"use client";

import * as React from "react";

export default function AuctionCountdown({ endsAt }: { endsAt: string }) {
  const end = new Date(endsAt).getTime();
  const [t, setT] = React.useState(end - Date.now());

  React.useEffect(() => {
    const id = setInterval(() => setT(end - Date.now()), 1000);
    return () => clearInterval(id);
  }, [end]);

  if (t <= 0) return <div className="mt-1 text-xl font-bold text-rose-600">ĐÃ KẾT THÚC</div>;

  const sec = Math.floor(t / 1000);
  const h = String(Math.floor(sec / 3600)).padStart(2, "0");
  const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");

  return <div className="mt-1 text-3xl font-extrabold text-slate-900">{h}:{m}:{s}</div>;
}
