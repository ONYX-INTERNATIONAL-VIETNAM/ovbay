"use client";

import * as React from "react";
import { getAuctionBids } from "@/lib/data";

export default function AuctionHistory({ auctionId }: { auctionId: string }) {
  const [bids, setBids] = React.useState(getAuctionBids(auctionId));

  // giả lập poll mỗi 10s để lấy lịch sử mới (mock)
  React.useEffect(() => {
    const id = setInterval(() => {
      setBids(getAuctionBids(auctionId));
    }, 10000);
    return () => clearInterval(id);
  }, [auctionId]);

  if (!bids?.length) {
    return <div className="text-sm text-slate-600">Chưa có lượt đặt giá nào.</div>;
  }

  return (
    <div className="space-y-2">
      {bids.map((b, i) => (
        <div
          key={`${b.user}-${b.amount}-${i}`}
          className="flex items-center justify-between rounded-xl border bg-white px-3 py-2 text-sm"
        >
          <div className="flex items-center gap-2">
            <span className="font-medium">{b.user}</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600">{new Date(b.time).toLocaleString("vi-VN")}</span>
          </div>
          <div className="font-semibold">{b.amount.toLocaleString("vi-VN")}₫</div>
        </div>
      ))}
    </div>
  );
}
