"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Mode = "personal" | "business";

export default function RegisterPage() {
  return (
    <div className="min-h-[100svh] grid grid-cols-1 lg:grid-cols-2">
      {/* Left hero */}
      <div className="relative hidden lg:block">
        <Image
          src="/images/auth/ovbay-auth-hero.jpg"
          alt="OVBAY"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent" />
      </div>

      {/* Right card */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-xl ring-1 ring-black/5">
          <div className="mb-6 space-y-1">
            <h1 className="text-2xl font-bold">
              Đăng ký <span className="text-muted-foreground">/ Create account</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Chọn Cá nhân (mua/bid) hoặc Doanh nghiệp (bán hàng)
            </p>
          </div>

          <RegisterForm />

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Đã có tài khoản?{" "}
            <Link className="underline" href="/login">
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function RegisterForm() {
  const [mode, setMode] = useState<Mode>("personal");
  const [form, setForm] = useState({
    // personal
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    acceptTos: false,
    // business
    businessName: "",
    businessPhone: "",
    businessCountry: "",
    businessCity: "",
    businessState: "",
    businessZip: "",
    businessAddress: "",
    contactFirstName: "",
    contactLastName: "",
    contactEmail: "",
    contactPhone: "",
  });

  const onChange = (key: keyof typeof form, value: string | boolean) =>
    setForm((s) => ({ ...s, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI demo only
    console.log("Register payload (UI only):", { mode, ...form });
    alert("Submitted UI (demo). Check console.log()");
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Mode switch */}
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setMode("personal")}
          className={`rounded-md border p-2 text-sm ${
            mode === "personal" ? "border-primary ring-2 ring-primary/20" : ""
          }`}
        >
          Cá nhân / Personal
        </button>
        <button
          type="button"
          onClick={() => setMode("business")}
          className={`rounded-md border p-2 text-sm ${
            mode === "business" ? "border-primary ring-2 ring-primary/20" : ""
          }`}
        >
          Doanh nghiệp / Business
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field
          label="Họ / Last name"
          placeholder="Nguyễn"
          value={form.lastName}
          onChange={(v) => onChange("lastName", v)}
        />
        <Field
          label="Tên / First name"
          placeholder="An"
          value={form.firstName}
          onChange={(v) => onChange("firstName", v)}
        />
      </div>

      <Field
        label="Email"
        type="email"
        placeholder="you@ovbay.com"
        value={form.email}
        onChange={(v) => onChange("email", v)}
      />

      {/* password */}
      <div className="grid gap-1">
        <Label htmlFor="password">Mật khẩu / Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Tối thiểu 8 ký tự"
          value={form.password}
          onChange={(e) => onChange("password", e.target.value)}
        />
        <PasswordStrength value={form.password} />
      </div>

      {mode === "business" && (
        <div className="rounded-lg border p-3 space-y-3">
          <p className="text-sm font-medium">Thông tin doanh nghiệp</p>
          <Field
            label="Tên doanh nghiệp"
            placeholder="Công ty TNHH…"
            value={form.businessName}
            onChange={(v) => onChange("businessName", v)}
          />
          <Field
            label="Điện thoại DN"
            placeholder="0123 456 789"
            value={form.businessPhone}
            onChange={(v) => onChange("businessPhone", v)}
          />
          <Field
            label="Quốc gia"
            placeholder="Việt Nam"
            value={form.businessCountry}
            onChange={(v) => onChange("businessCountry", v)}
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Field
              label="Tỉnh/Thành"
              placeholder="Hà Nội"
              value={form.businessCity}
              onChange={(v) => onChange("businessCity", v)}
            />
            <Field
              label="Bang/Tỉnh"
              placeholder="—"
              value={form.businessState}
              onChange={(v) => onChange("businessState", v)}
            />
            <Field
              label="Mã bưu chính"
              placeholder="100000"
              value={form.businessZip}
              onChange={(v) => onChange("businessZip", v)}
            />
          </div>
          <Field
            label="Địa chỉ"
            placeholder="Số nhà, đường…"
            value={form.businessAddress}
            onChange={(v) => onChange("businessAddress", v)}
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field
              label="Họ liên hệ"
              placeholder="Nguyễn"
              value={form.contactLastName}
              onChange={(v) => onChange("contactLastName", v)}
            />
            <Field
              label="Tên liên hệ"
              placeholder="An"
              value={form.contactFirstName}
              onChange={(v) => onChange("contactFirstName", v)}
            />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field
              label="Email liên hệ"
              type="email"
              placeholder="contact@company.com"
              value={form.contactEmail}
              onChange={(v) => onChange("contactEmail", v)}
            />
            <Field
              label="SĐT liên hệ"
              placeholder="0912 345 678"
              value={form.contactPhone}
              onChange={(v) => onChange("contactPhone", v)}
            />
          </div>
        </div>
      )}

      {/* acceptTos */}
      <label className="mt-2 inline-flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          className="h-4 w-4"
          checked={form.acceptTos}
          onChange={(e) => onChange("acceptTos", e.target.checked)}
        />
        Tôi đồng ý Điều khoản &amp; Quyền riêng tư
      </label>

      <Button type="submit" className="w-full">
        Tạo tài khoản
      </Button>
    </form>
  );
}

/* ---------- Reusable Field (UI only) ---------- */
function Field({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const id = label.replace(/\s+/g, "-").toLowerCase();
  return (
    <div className="grid gap-1">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

/* ---------- Password strength (UI only) ---------- */
function PasswordStrength({ value }: { value: string }) {
  let score = 0;
  if (value.length >= 8) score++;
  if (/[A-Z]/.test(value)) score++;
  if (/[a-z]/.test(value)) score++;
  if (/\d/.test(value)) score++;
  if (/[^\w]/.test(value)) score++;

  return (
    <div className="mt-1 h-1.5 w-full rounded bg-muted">
      <div
        className="h-1.5 rounded bg-primary transition-all"
        style={{ width: `${(Math.min(score, 5) / 5) * 100}%` }}
      />
    </div>
  );
}
