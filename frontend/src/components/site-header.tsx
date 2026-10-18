import Link from "next/link";
import { LogoWordmark } from "@/components/logo";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-ink-800 bg-ink-950/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" aria-label="VÚT — Trang chủ" className="text-bone">
          <LogoWordmark className="h-8 w-auto" />
        </Link>
        <nav className="flex items-center gap-6 text-sm text-ink-300">
          <Link href="/" className="hover:text-bone">
            Chuyến bay
          </Link>
          <Link href="/brand" className="hover:text-bone">
            Thương hiệu
          </Link>
        </nav>
      </div>
    </header>
  );
}
