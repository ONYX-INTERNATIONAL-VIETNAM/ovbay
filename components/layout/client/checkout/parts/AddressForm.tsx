"use client";

import * as React from "react";

export type AddressValues = {
  fullName: string;
  phone: string;
  email?: string;
  street: string;
  ward?: string;
  district: string;
  city: string;
  note?: string;
  saveInfo: boolean;
};

type AddressFormProps = {
  value: AddressValues;
  onChange: (v: AddressValues) => void;
};

export default function AddressForm({ value, onChange }: AddressFormProps) {
  // Load lại địa chỉ đã lưu (nếu có)
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem("ov_address");
      if (raw) {
        try {
          const v = JSON.parse(raw) as Partial<AddressValues>;
          onChange({ ...value, ...v });
        } catch {
          // ignore
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ Không dùng any: giá trị v sẽ khớp đúng kiểu của khóa k
  const set = <K extends keyof AddressValues>(k: K, v: AddressValues[K]) =>
    onChange({ ...value, [k]: v });

  return (
    <div className="mt-4 grid gap-3 md:grid-cols-2">
      <label className="space-y-1">
        <span className="text-sm text-slate-600">Họ và tên *</span>
        <input
          className="w-full rounded-xl border bg-white px-3 py-2"
          value={value.fullName}
          onChange={(e) => set("fullName", e.target.value)}
          placeholder="Nguyễn Văn A"
        />
      </label>

      <label className="space-y-1">
        <span className="text-sm text-slate-600">Số điện thoại *</span>
        <input
          className="w-full rounded-xl border bg-white px-3 py-2"
          value={value.phone}
          onChange={(e) => set("phone", e.target.value)}
          placeholder="090..."
        />
      </label>

      <label className="space-y-1 md:col-span-2">
        <span className="text-sm text-slate-600">Email</span>
        <input
          className="w-full rounded-xl border bg-white px-3 py-2"
          value={value.email ?? ""}
          onChange={(e) => set("email", e.target.value)}
          placeholder="you@example.com"
        />
      </label>

      <label className="space-y-1 md:col-span-2">
        <span className="text-sm text-slate-600">Địa chỉ *</span>
        <input
          className="w-full rounded-xl border bg-white px-3 py-2"
          value={value.street}
          onChange={(e) => set("street", e.target.value)}
          placeholder="Số nhà, đường..."
        />
      </label>

      <label className="space-y-1">
        <span className="text-sm text-slate-600">Phường/Xã</span>
        <input
          className="w-full rounded-xl border bg-white px-3 py-2"
          value={value.ward ?? ""}
          onChange={(e) => set("ward", e.target.value)}
          placeholder="Phường/Xã"
        />
      </label>

      <label className="space-y-1">
        <span className="text-sm text-slate-600">Quận/Huyện *</span>
        <input
          className="w-full rounded-xl border bg-white px-3 py-2"
          value={value.district}
          onChange={(e) => set("district", e.target.value)}
          placeholder="Quận/Huyện"
        />
      </label>

      <label className="space-y-1 md:col-span-2">
        <span className="text-sm text-slate-600">Tỉnh/Thành phố *</span>
        <input
          className="w-full rounded-xl border bg-white px-3 py-2"
          value={value.city}
          onChange={(e) => set("city", e.target.value)}
          placeholder="TP. Hồ Chí Minh"
        />
      </label>

      <label className="space-y-1 md:col-span-2">
        <span className="text-sm text-slate-600">Ghi chú</span>
        <textarea
          rows={3}
          className="w-full rounded-xl border bg-white px-3 py-2"
          value={value.note ?? ""}
          onChange={(e) => set("note", e.target.value)}
          placeholder="Ghi chú cho shipper (nếu có)"
        />
      </label>

      <label className="md:col-span-2 mt-1 flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={value.saveInfo}
          onChange={(e) => set("saveInfo", e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 accent-amber-500"
        />
        Lưu thông tin cho lần sau
      </label>
    </div>
  );
}
