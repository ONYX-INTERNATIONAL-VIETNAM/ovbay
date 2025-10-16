import Link from "next/link";

// Bạn có thể thay href của các mạng xã hội cho đúng URL thật
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 bg-[var(--primary-color)] text-white">
      <div className="container mx-auto px-4 md:px-16 pt-12">
        {/* 4 cột */}
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand + tagline */}
          <div>
            <div className="text-xl font-extrabold tracking-tight">
              <span className="text-[var(--secondary-color)]">OV</span>BAY
            </div>
            <p className="mt-3 text-sm leading-6 text-white">
              <span className="block">Nền tảng mua bán & đấu giá.</span>
              <span className="block">Nhanh - an toàn - minh bạch</span>
            </p>
          </div>

          {/* Cột link 1 */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-slate-100">Sản phẩm</h4>
            <ul className="space-y-2 text-sm">
              <li><Link className="hover:text-white" href="/c/electronics">Điện tử</Link></li>
              <li><Link className="hover:text-white" href="/c/fashion">Thời trang</Link></li>
              <li><Link className="hover:text-white" href="/c/home">Gia dụng</Link></li>
            </ul>
          </div>

          {/* Cột link 2 */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-slate-100">Tài khoản</h4>
            <ul className="space-y-2 text-sm">
              <li><Link className="hover:text-white" href="/auth/sign-in">Đăng nhập</Link></li>
              <li><Link className="hover:text-white" href="/account/orders">Đơn hàng</Link></li>
              <li><Link className="hover:text-white" href="/sell/onboarding">Bán hàng cùng OVBAY</Link></li>
            </ul>
          </div>

          {/* Cột link 3 */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-slate-100">Về chúng tôi</h4>
            <ul className="space-y-2 text-sm">
              <li><Link className="hover:text-white" href="/help">Trợ giúp</Link></li>
              <li><Link className="hover:text-white" href="/policies/terms">Điều khoản</Link></li>
              <li><Link className="hover:text-white" href="/policies/privacy">Bảo mật</Link></li>
            </ul>
          </div>
        </div>

        {/* Hàng icon mạng xã hội */}
        <div className="mt-8 flex items-center gap-3">
          <Social href="#" label="X (Twitter)">
            <span className="text-base font-semibold">X</span>
          </Social>
          <Social href="#" label="Facebook">
            {/* facebook glyph tối giản */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M22 12.06C22 6.55 17.52 2 12.06 2 6.55 2 2 6.55 2 12.06 2 17.05 5.66 21.2 10.4 22v-7.03H7.9v-2.9h2.5V9.4c0-2.47 1.47-3.84 3.73-3.84 1.08 0 2.2.2 2.2.2v2.43h-1.24c-1.22 0-1.6.76-1.6 1.54v1.84h2.72l-.44 2.9h-2.28V22C18.46 21.2 22 17.05 22 12.06z"/>
            </svg>
          </Social>
          <Social href="#" label="Instagram">
            {/* vòng tròn + ô vuông + chấm */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2"/>
              <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="2"/>
              <circle cx="17.35" cy="6.65" r="1.35" fill="currentColor"/>
            </svg>
          </Social>
          <Social href="#" label="TikTok">
            {/* note nhạc tối giản (thay thế biểu tượng TikTok) */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M14 3v10.5a3.5 3.5 0 1 1-2-3.15V5h2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 5c1.2 2.4 3.1 3.9 5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </Social>
        </div>

        {/* Đường kẻ mảnh và bản quyền */}
        <div className="mt-8 h-px w-full bg-[#4B4C4C]" />
        <div className="py-4 text-center text-xs">
          © {year} OVBAY. Tất cả bản quyền được bảo lưu
        </div>
      </div>
    </footer>
  );
}

/** Nút icon tròn dùng lại */
function Social({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#4B4C4C] bg-[#4B4C4C] text-slate-300 transition hover:border-[#4B4C4C] hover:bg-[#4B4C4C] hover:text-white"
    >
      {children}
    </Link>
  );
}
