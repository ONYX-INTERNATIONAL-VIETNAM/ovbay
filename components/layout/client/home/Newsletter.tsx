"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  return (
    <section
      className="relative isolate overflow-hidden rounded-[28px] md:rounded-[40px] p-4 sm:p-6 md:p-8"
      aria-label="Đăng ký nhận ưu đãi"
    >
      {/* nền gradient giống mockup */}
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-[28px] md:rounded-[40px]
      bg-[linear-gradient(90deg,#F2F4FF_16%,#5A81FA_81%,#CEDEFF_100%)]" />
      {/* glow nhẹ */}
      <div className="pointer-events-none absolute -left-10 top-[-20%] -z-10 h-72 w-72 rounded-full bg-white/30 blur-3xl opacity-40" />
      <div className="pointer-events-none absolute -right-10 -bottom-10 -z-10 h-72 w-72 rounded-full bg-white/30 blur-3xl opacity-40" />

      <div className="grid items-center gap-6 md:grid-cols-[minmax(280px,420px)_1fr]">
        {/* Ảnh bên trái */}
        <div className="overflow-hidden rounded-[28px]">
          <Image
            src="/images/newsletter.png" // đổi đường dẫn ảnh của bạn ở đây
            alt="Khách hàng vui vẻ nhận ưu đãi"
            width={900}
            height={600}
            className="h-full w-full max-h-60 object-cover md:max-h-none"
            priority
          />
        </div>

        {/* Nội dung bên phải */}
        <div className="text-center md:text-right">
          <h3 className="text-[22px] font-extrabold leading-tight text-white sm:text-2xl md:text-3xl lg:text-4xl">
            Nhận thông tin ưu đãi
            <br className="hidden sm:block" /> mỗi ngày
          </h3>
          <p className="mt-2 text-sm text-white/85 md:text-base">
            Mỗi tuần một bản tin, deal hot &amp; phiên đấu giá hấp dẫn
          </p>

          {/* Form: input pill trắng + nút cam */}
          <form
            className="mt-5 flex w-full items-center gap-3 md:justify-end"
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
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn..."
              className="h-11 flex-1 max-w-[560px] rounded-full border-0 bg-white px-5 text-slate-700 placeholder:text-slate-400 shadow-sm focus-visible:ring-0"
            />
            <Button
              type="submit"
              className="h-11 shrink-0 rounded-full bg-[#FF9013] px-5 text-white hover:bg-orange-400"
            >
              Đăng ký
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
