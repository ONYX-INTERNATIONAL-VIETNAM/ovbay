"use client";

import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validators/auth";
import type { LoginInput } from "@/lib/validators/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <div className="min-h-[100svh] grid grid-cols-1 lg:grid-cols-2 bg-[linear-gradient(135deg,#F2F4FF_28%,#92ADFF_100%)] md:bg-none">
      {/* Visual chỉ hiển thị ở lg+ và đã có gradient riêng */}
      <div className="relative hidden lg:block">
        <div
          className="relative h-full w-full overflow-hidden ring-1 ring-black/5 shadow-[0_10px_30px_rgba(17,24,39,0.12)]"
          style={{ backgroundImage: "linear-gradient(135deg,#F2F4FF 28%,#92ADFF 100%)" }}
        >
          <div className="absolute inset-0 grid place-items-center p-10 text-center">
            <div className="space-y-4">
              {/* đổi src này sang logo của bạn */}
              <Image
                src="/images/logo.png"
                alt="OVBAY"
                width={200}
                height={200}
                className="mx-auto"
                priority
              />
              <h2 className="text-5xl font-extrabold tracking-tight">
                <span className="text-[#FFA20A]">OV</span>
                <span className="text-white">BAY</span>
              </h2>
              <p className="text-white/90 text-xl font-extrabold">
                Mua bán &amp; Đấu giá{" "}
                <span className="text-[#FFA20A]">chuyên nghiệp</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-xl ring-1 ring-black/5">
          <div className="mb-6 space-y-1">
            <h1 className="text-2xl font-bold">Đăng nhập <span className="text-muted-foreground">/ Sign in</span></h1>
            <p className="text-sm text-muted-foreground">Chào mừng quay lại OVBAY</p>
          </div>
          <LoginForm />
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Chưa có tài khoản?{" "}
            <Link className="underline" href="/auth/register">Tạo tài khoản</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<LoginInput>({
      resolver: zodResolver(loginSchema),
      defaultValues: { email: "", password: "", remember: true }
    });

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit(async (values) => {
        // TODO: call real auth action
        console.log("login", values);
      })}
    >
      <div className="grid gap-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
        {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
      </div>
      <div className="grid gap-1">
        <Label htmlFor="password">Mật khẩu / Password</Label>
        <Input id="password" type="password" placeholder="••••••••" {...register("password")} />
        {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}
      </div>
      <div className="flex items-center justify-between text-sm">
        <label className="inline-flex items-center gap-2 select-none">
          <input type="checkbox" className="h-4 w-4" {...register("remember")} />
          Ghi nhớ / Remember me
        </label>
        <Link href="#" className="underline">Quên mật khẩu?</Link>
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Đang xử lý…" : "Đăng nhập"}
      </Button>
    </form>
  );
}
