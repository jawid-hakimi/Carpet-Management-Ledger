// app/layout.tsx
import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { SyncProvider } from "@/offline/SyncProvider";
import TopBar from "@/components/layout/topbar/TopBar";
import DynamicColors from "@/components/dynamic-colors.tsx/DynamicColors";
import Sidebar from "@/components/layout/sidebar/Sidebar";

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
      <body className={`${vazirmatn.variable} font-sans antialiased bg-gray-50`}>
        <DynamicColors />
        <SyncProvider />

        {/* 🔹 Header ثابت در بالا */}
        <TopBar />

        {/* 🔹 کانتینر اصلی داشبورد */}
        <div className="flex flex-row-reverse pt-[60px] h-screen overflow-hidden">
          {/* Sidebar ثابت */}
          <div className="fixed top-[60px] bottom-0 right-0">
            <Sidebar />
          </div>

          {/* بخش محتوا - فقط این بخش اسکرول شود */}
          <main className="flex-1 overflow-y-auto mr-[16rem] p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
