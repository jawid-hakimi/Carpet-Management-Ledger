"use client";

import { Card } from "@/components/ui/Card";
import { Bell, AlertTriangle, Clock, Package, User, ArrowLeft } from "lucide-react";

const notifications = [
  {
    id: 1,
    message: "موجودی کم برای فرش A",
    type: "warning",
    time: "۵ دقیقه قبل",
    icon: Package,
    unread: true
  },
  {
    id: 2,
    message: "بل #1002 موعد پرداخت دارد",
    type: "urgent",
    time: "۱ ساعت قبل",
    icon: Clock,
    unread: true
  },
  {
    id: 3,
    message: "درخواست سفارش عقب‌افتاده جدید از سارا",
    type: "info",
    time: "۲ ساعت قبل",
    icon: User,
    unread: false
  },
  {
    id: 4,
    message: "سیستم بروزرسانی شد به نسخه ۲.۱.۰",
    type: "success",
    time: "۱ روز قبل",
    icon: Bell,
    unread: false
  },
];

export default function Notifications() {
  const getNotificationColor = (type: string) => {
    switch (type) {
      case "warning":
        return "bg-amber-50 border-amber-200 text-amber-700";
      case "urgent":
        return "bg-rose-50 border-rose-200 text-rose-700";
      case "success":
        return "bg-emerald-50 border-emerald-200 text-emerald-700";
      case "info":
        return "bg-blue-50 border-blue-200 text-blue-700";
      default:
        return "bg-gray-50 border-gray-200 text-gray-700";
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="w-4 h-4" />;
      case "urgent":
        return <Clock className="w-4 h-4" />;
      case "success":
        return <Bell className="w-4 h-4" />;
      case "info":
        return <User className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const unreadCount = notifications.filter(note => note.unread).length;

  return (
    <Card className="bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm border border-gray-200/60 shadow-xs hover:shadow-md transition-all duration-300">
      <div className="p-6">
        {/* سربرگ */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow-lg">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">آگاه‌سازی‌ها</h2>
              <p className="text-sm text-gray-600 mt-1">
                {unreadCount > 0 ? `${unreadCount} آگاه‌سازی خوانده نشده` : "همه آگاه‌سازی‌ها خوانده شده"}
              </p>
            </div>
          </div>
          
          {unreadCount > 0 && (
            <div className="bg-rose-500 text-white text-sm font-medium px-3 py-1 rounded-full animate-pulse">
              {unreadCount}
            </div>
          )}
        </div>

        {/* لیست آگاه‌سازی‌ها */}
        <div className="space-y-3">
          {notifications.map((notification) => {
            const IconComponent = notification.icon;
            
            return (
              <div
                key={notification.id}
                className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all duration-200 hover:shadow-sm group ${
                  notification.unread 
                    ? 'border-blue-200 bg-blue-50/50' 
                    : 'border-gray-200/60 bg-white'
                }`}
              >
                {/* آیکون */}
                <div className={`p-2 rounded-xl border-2 ${getNotificationColor(notification.type)}`}>
                  {getNotificationIcon(notification.type)}
                </div>

                {/* محتوا */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className={`text-sm font-medium leading-relaxed ${
                      notification.unread ? 'text-gray-900' : 'text-gray-700'
                    }`}>
                      {notification.message}
                    </p>
                    {notification.unread && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2 animate-pulse"></div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{notification.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* پاورقی */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200/60">
          <div className="text-sm text-gray-600">
            نمایش {notifications.length} آگاه‌سازی
          </div>
          <button className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200 group">
            دیدن همه آگاه‌سازی‌ها
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
          </button>
        </div>
      
      </div>
    </Card>
  );
}