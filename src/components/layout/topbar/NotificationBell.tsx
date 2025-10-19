"use client";
import { Bell } from "lucide-react";

interface NotificationBellProps {
  count?: number;
}

export default function NotificationBell({ count = 0 }: NotificationBellProps) {
  return (
    <div className="relative cursor-pointer">
      <Bell size={20} className="text-slate-600" />
      {count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
          {count}
        </span>
      )}
    </div>
  );
}
