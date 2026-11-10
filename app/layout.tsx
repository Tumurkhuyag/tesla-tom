import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Electric Cars, Solar & Clean Energy | Tesla (clone)",
  description: "Next.js + Tailwind CSS learning clone of the tesla.com home page.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {/* Learning clone built from a Firecrawl scrape of https://www.tesla.com/ (Nov 2026).
            Images are hot-linked from Tesla's public CDN. Not affiliated with Tesla, Inc. */}
        <a
          href="#main-content"
          className="absolute -top-12 left-4 z-100 rounded-btn bg-white px-4 py-2 shadow-[0_0_0_2px_var(--color-ink)] focus:top-2"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
