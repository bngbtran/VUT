import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, JetBrains_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "vietnamese"],
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "VÚT — Theo dõi chuyến bay",
    template: "%s · VÚT",
  },
  description:
    "Theo dõi chuyến bay theo thời gian thực: giờ bay, cổng, trạng thái, băng chuyền hành lý.",
  applicationName: "VÚT",
};

export const viewport: Viewport = {
  themeColor: "#1C1F22",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${beVietnam.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-ink-800 py-6 text-sm text-ink-500">
          <div className="mx-auto flex max-w-6xl flex-col items-center px-4 justify-between gap-2 text-center sm:flex-row sm:text-left">
            <span>VÚT · Theo dõi chuyến bay. Vút.</span>
            <span>
              Thiết kế & phát triển bởi{" "}
              <a
                href="https://github.com/bngbtran"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-bone underline decoration-terracotta decoration-2 underline-offset-4 hover:text-clay"
              >
                Bùi Ngọc Bảo Trân
              </a>
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
