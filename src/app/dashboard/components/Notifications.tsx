"use client";

import { Card } from "@/components/ui/Card";
import { Bell } from "lucide-react";

const notifications = [
  "موجودی کم برای فرش A",
  "بل #1002 موعد پرداخت دارد",
  "درخواست سفارش عقب‌افتاده جدید از سارا",
];

export default function Notifications() {
  return (
    <Card>
      <div className="flex items-center gap-2">
        <Bell className="h-5 w-5" />
        <h1>نوتیفیکیشن‌ها</h1>
      </div>
      <div>
        <ul className="space-y-2">
          {notifications.map((note, i) => (
            <li key={i} className="p-2 rounded-lg bg-muted/50 hover:bg-muted transition">
              {note}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}