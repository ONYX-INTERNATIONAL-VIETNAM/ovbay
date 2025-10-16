"use client";

import * as React from "react";

type Review = { user: string; rating: number; comment: string; date: string };
type TabKey = "desc" | "specs" | "reviews";

export default function InfoTabs({
  description,
  specs,
  reviews,
}: {
  description: string;
  specs?: Record<string, string>;
  reviews?: Review[];
}) {
  const [tab, setTab] = React.useState<TabKey>("desc");

  const tabs: ReadonlyArray<{ k: TabKey; label: string }> = [
    { k: "desc", label: "Mô tả" },
    { k: "specs", label: "Thông số" },
    { k: "reviews", label: `Đánh giá (${reviews?.length ?? 0})` },
  ] as const;

  return (
    <div>
      <div className="flex gap-2">
        {tabs.map((t) => (
          <button
            key={t.k}
            onClick={() => setTab(t.k)}
            className={`rounded-xl border px-4 py-2 text-sm ${
              tab === t.k
                ? "bg-[var(--secondary-color)] text-slate-900 border-amber-500"
                : "bg-white hover:bg-slate-50"
            }`}
            type="button"
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {tab === "desc" && (
          <div className="prose max-w-none text-slate-700">
            <p>{description}</p>
          </div>
        )}

        {tab === "specs" && (
          <div className="grid gap-2 md:grid-cols-2">
            {specs ? (
              Object.entries(specs).map(([k, v]) => (
                <div key={k} className="rounded-xl border bg-white p-3">
                  <div className="text-xs uppercase tracking-wide text-slate-500">
                    {k}
                  </div>
                  <div className="text-sm text-slate-800">{v}</div>
                </div>
              ))
            ) : (
              <div className="text-sm text-slate-600">Chưa có thông số.</div>
            )}
          </div>
        )}

        {tab === "reviews" && (
          <div className="space-y-3">
            {reviews && reviews.length > 0 ? (
              reviews.map((r, i) => (
                <div key={i} className="rounded-xl border bg-white p-3">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{r.user}</div>
                    <div className="text-xs text-slate-500">{r.date}</div>
                  </div>
                  <div className="mt-1 text-sm text-amber-600">
                    {"★".repeat(r.rating)}
                    {"☆".repeat(5 - r.rating)}
                  </div>
                  <p className="mt-1 text-sm text-slate-700">{r.comment}</p>
                </div>
              ))
            ) : (
              <div className="text-sm text-slate-600">
                Chưa có đánh giá. (Sẽ mở cho người mua sau khi hoàn tất đơn)
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
