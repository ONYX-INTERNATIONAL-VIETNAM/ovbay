import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-white">
      <div className="container mx-auto grid gap-8 px-4 py-10 md:grid-cols-4">
        <div>
          <div className="text-xl font-extrabold"><span className="text-amber-500">OV</span>BAY</div>
          <p className="mt-2 text-sm text-slate-500">
            Nền tảng mua bán & đấu giá. Nhanh – an toàn – minh bạch.
          </p>
        </div>
        <div>
          <h4 className="mb-2 font-semibold">Sản phẩm</h4>
          <ul className="space-y-1 text-sm">
            <li><Link href="/c/electronics">Điện tử</Link></li>
            <li><Link href="/c/fashion">Thời trang</Link></li>
            <li><Link href="/c/home">Gia dụng</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-2 font-semibold">Tài khoản</h4>
          <ul className="space-y-1 text-sm">
            <li><Link href="/auth/sign-in">Đăng nhập</Link></li>
            <li><Link href="/account/orders">Đơn hàng</Link></li>
            <li><Link href="/sell/onboarding">Bán hàng cùng OVBAY</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-2 font-semibold">Về chúng tôi</h4>
          <ul className="space-y-1 text-sm">
            <li><Link href="/help">Trợ giúp</Link></li>
            <li><Link href="/policies/terms">Điều khoản</Link></li>
            <li><Link href="/policies/privacy">Bảo mật</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} OVBAY. All rights reserved.
      </div>
    </footer>
  );
}
