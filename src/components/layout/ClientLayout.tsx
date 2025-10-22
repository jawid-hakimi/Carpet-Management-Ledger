// ✅ components/layout/ClientLayout.tsx
"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import MobileBottomBar from "@/components/layout/sidebar/MobileBottomBar"; // 👈 جدید

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex flex-row-reverse pt-[56px] h-screen overflow-hidden">
      {/* Sidebar فقط برای دسکتاپ */}
      <div className="fixed top-[56px] bottom-0 right-0 hidden sm:block z-10">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      {/* بخش محتوا */}
      <main
        className={`flex-1 overflow-y-auto transition-all duration-300 ${
          collapsed ? "sm:mr-[4rem]" : "sm:mr-[16rem]"
        } p-3 md:p-6 pb-36 md:pb-16 sm:pb-0`} 
      >
        {children}
      </main>

      {/* 🔹 نوار پایین فقط برای موبایل */}
      <MobileBottomBar />
    </div>
  );
}
