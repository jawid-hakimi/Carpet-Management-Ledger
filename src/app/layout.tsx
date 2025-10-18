// app/layout.tsx
import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { SyncProvider } from "@/offline/SyncProvider";
import Header from "@/components/layout/topbar/TopBar";
import DynamicColors from "@/components/dynamic-colors.tsx/DynamicColors";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Management Ledger",
  description: "This app created for management",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${vazirmatn.variable} font-sans antialiased`}>
        <DynamicColors />
        <Header />
        <SyncProvider />
        <div className="my-20  w-[90%] mx-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
