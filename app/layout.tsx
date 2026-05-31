import type { Metadata, Viewport } from "next";
import "./globals.css";

// 1. دي الإعدادات اللي بتجبر الموبايل يعرض الموقع بحجم الشاشة الحقيقي وتمنع الزووم
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // دي اللي بتمنع الـ Pinch to zoom
};

export const metadata: Metadata = {
  title: "MotoVroom",
  description: "Raw Power & Speed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 2. ضفنا overflow-x-hidden هنا عشان نمنع أي سكرول بالعرض (بيعمل شريط أبيض)
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-zinc-950 overflow-x-hidden text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}