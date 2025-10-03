"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  return (
    <section className="rounded-2xl border bg-white/70 p-5 shadow-sm backdrop-blur md:p-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h3 className="text-lg font-semibold">Nhận thông tin ưu đãi</h3>
          <p className="text-sm text-slate-500">
            Mỗi tuần một bản tin: deal hot & phiên đấu giá hấp dẫn.
          </p>
        </div>
        <form
          className="flex w-full max-w-md gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            alert(`Đăng ký: ${email}`);
            setEmail("");
          }}
        >
          <Input
            type="email"
            required
            value={email}
            placeholder="Nhập email của bạn"
            onChange={(e) => setEmail(e.target.value)}
            className="h-10"
          />
          <Button
            type="submit"
            className="h-10 rounded-xl bg-amber-500 text-slate-900 hover:bg-amber-400"
          >
            Đăng ký
          </Button>
        </form>
      </div>
    </section>
  );
}
