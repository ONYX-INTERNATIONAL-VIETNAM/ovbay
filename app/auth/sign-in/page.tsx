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
    <div className="min-h-[100svh] grid grid-cols-1 lg:grid-cols-2">
      {/* Visual */}
      <div className="relative hidden lg:block">
        <Image
          src="/images/auth/ovbay-auth-hero.jpg"
          alt="OVBAY"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-10 text-white">
          <h2 className="text-3xl font-bold tracking-tight">OVBAY</h2>
          <p className="mt-2 text-white/80">Mua sắm & đấu giá thông minh.</p>
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
    useForm<LoginInput>({ resolver: zodResolver(loginSchema),
      defaultValues: { email: "", password: "", remember: true } });

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
