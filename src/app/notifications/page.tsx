// app/admin/notifications/page.tsx
'use client';

import React, { useState } from 'react';
import {
  Bell,
  Check,
  Trash2,
  Info,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Package,
  ShoppingBag,
  Tag,
  Filter,
  AlertCircle
} from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Select } from '@/components/ui/Select';
import { Button, PrimaryButton, OutlineButton, DestructiveButton } from '@/components/ui/Button';

// انواع اعلان‌ها
type NotificationType = 'info' | 'warning' | 'success' | 'error' | 'inventory' | 'sales';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  date: string;
  time: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  relatedItem?: string;
}

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'کمبود موجودی',
      message: 'موجودی محصول "لپ‌تاپ اپل مک‌بوک پرو" به کمتر از ۱۰ عدد رسیده است. لطفاً موجودی را تکمیل کنید.',
      type: 'inventory',
      date: '1402/10/15',
      time: '14:30',
      read: false,
      priority: 'high',
      relatedItem: 'محصولات'
    },
    {
      id: '2',
      title: 'فروش جدید',
      message: 'یک سفارش جدید با مبلغ ۱۲,۵۰۰,۰۰۰ تومان ثبت شد. شماره سفارش: #ORD-2456',
      type: 'sales',
      date: '1402/10/15',
      time: '14:25',
      read: false,
      priority: 'medium',
      relatedItem: 'فروش'
    },
    {
      id: '3',
      title: 'بروزرسانی سیستم',
      message: 'بروزرسانی جدید سیستم در تاریخ 1402/10/16 انجام خواهد شد. زمان تقریبی: 2 ساعت',
      type: 'info',
      date: '1402/10/15',
      time: '13:45',
      read: true,
      priority: 'low'
    },
    {
      id: '4',
      title: 'هشدار امنیتی',
      message: 'تلاش برای ورود غیرمجاز به سیستم از IP: 192.168.1.100 شناسایی شد',
      type: 'warning',
      date: '1402/10/15',
      time: '12:20',
      read: false,
      priority: 'high'
    },
    {
      id: '5',
      title: 'پرداخت موفق',
      message: 'پرداخت سفارش #2456 با مبلغ ۸,۳۰۰,۰۰۰ تومان با موفقیت انجام شد',
      type: 'success',
      date: '1402/10/15',
      time: '11:15',
      read: true,
      priority: 'medium',
      relatedItem: 'پرداخت‌ها'
    },
    {
      id: '6',
      title: 'خطای سرور',
      message: 'خطای موقت در سرویس پرداخت رخ داده است. تیم فنی در حال بررسی است',
      type: 'error',
      date: '1402/10/15',
      time: '10:30',
      read: false,
      priority: 'high'
    }
  ]);

  const [filter, setFilter] = useState<NotificationType | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [readFilter, setReadFilter] = useState<'all' | 'read' | 'unread'>('all');

  // فیلتر کردن اعلان‌ها
  const filteredNotifications = notifications.filter(notification => {
    const typeMatch = filter === 'all' || notification.type === filter;
    const priorityMatch = priorityFilter === 'all' || notification.priority === priorityFilter;
    const readMatch = readFilter === 'all' ||
      (readFilter === 'read' && notification.read) ||
      (readFilter === 'unread' && !notification.read);

    return typeMatch && priorityMatch && readMatch;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  // علامت‌گذاری به عنوان خوانده شده
  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  // علامت‌گذاری همه به عنوان خوانده شده
  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  // حذف اعلان
  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  // دریافت آیکن بر اساس نوع اعلان
  const getNotificationIcon = (type: NotificationType) => {
    const iconClass = "w-6 h-6";

    switch (type) {
      case 'info':
        return <Info className={iconClass} />;
      case 'warning':
        return <AlertTriangle className={iconClass} />;
      case 'success':
        return <CheckCircle className={iconClass} />;
      case 'error':
        return <XCircle className={iconClass} />;
      case 'inventory':
        return <Package className={iconClass} />;
      case 'sales':
        return <ShoppingBag className={iconClass} />;
      default:
        return <Bell className={iconClass} />;
    }
  };

  // دریافت کلاس رنگ بر اساس نوع اعلان
  const getNotificationColor = (type: NotificationType) => {
    switch (type) {
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-600';
      case 'warning':
        return 'bg-amber-50 border-amber-200 text-amber-600';
      case 'success':
        return 'bg-emerald-50 border-emerald-200 text-emerald-600';
      case 'error':
        return 'bg-rose-50 border-rose-200 text-rose-600';
      case 'inventory':
        return 'bg-violet-50 border-violet-200 text-violet-600';
      case 'sales':
        return 'bg-indigo-50 border-indigo-200 text-indigo-600';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-600';
    }
  };

  // دریافت کلاس اولویت
  const getPriorityBadge = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'high':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'medium':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // دریافت متن اولویت
  const getPriorityText = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'high':
        return 'بالا';
      case 'medium':
        return 'متوسط';
      case 'low':
        return 'پایین';
      default:
        return 'نامشخص';
    }
  };

  // آپشن‌های فیلتر
  const typeOptions = [
    { value: 'all', label: 'همه انواع' },
    { value: 'info', label: 'اطلاعات' },
    { value: 'warning', label: 'هشدار' },
    { value: 'success', label: 'موفقیت' },
    { value: 'error', label: 'خطا' },
    { value: 'inventory', label: 'موجودی' },
    { value: 'sales', label: 'فروش' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'همه' },
    { value: 'high', label: 'بالا' },
    { value: 'medium', label: 'متوسط' },
    { value: 'low', label: 'پایین' }
  ];

  const readStatusOptions = [
    { value: 'all', label: 'همه' },
    { value: 'unread', label: 'خوانده نشده' },
    { value: 'read', label: 'خوانده شده' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="max-w-6xl mx-auto">

        {/* هدر صفحه با کامپوننت PageHeader */}
        <PageHeader
          title="اعلان‌ها"
          description={`مدیریت و مشاهده تمام اطلاعیه‌های سیستم • ${unreadCount} اعلان خوانده نشده`}
          showBackButton={true}
          showHomeIcon={true}
          backUrl="/dashboard"
        />

        {/* کارت آمار و اقدامات */}
        <div className="bg-white rounded-lg shadow-xs border border-gray-200/60 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg shadow-lg">
                <Bell className="w-8 h-8 text-white" />
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{notifications.length}</div>
                  <div className="text-sm text-gray-600">کل اعلان‌ها</div>
                </div>
                <div className="w-px h-12 bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-rose-500">{unreadCount}</div>
                  <div className="text-sm text-gray-600">خوانده نشده</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <PrimaryButton
                icon={<Check className="w-5 h-5" />}
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
                size="md"
                className='font-normal'
              >
                علامت‌گذاری همه به عنوان خوانده شده
              </PrimaryButton>
            </div>
          </div>
        </div>

        {/* فیلترها با کامپوننت Select */}
        <div className="bg-white rounded-lg shadow-xs border border-gray-200/60 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-gray-500" />
              <h3 className="text-lg font-semibold text-gray-800">فیلترها</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1 max-w-2xl z-20">
              {/* فیلتر وضعیت خواندن */}
              <Select
                options={readStatusOptions}
                value={readFilter}
                onChange={(value) => setReadFilter(value as 'all' | 'read' | 'unread')}
                placeholder="وضعیت"
                size="md"
              />

              {/* فیلتر نوع */}
              <Select
                options={typeOptions}
                value={filter}
                onChange={(value) => setFilter(value as NotificationType | 'all')}
                placeholder="نوع اعلان"
                size="md"
              />

              {/* فیلتر اولویت */}
              <Select
                options={priorityOptions}
                value={priorityFilter}
                onChange={(value) => setPriorityFilter(value as 'all' | 'high' | 'medium' | 'low')}
                placeholder="اولویت"
                size="md"
              />
            </div>

            <div className="text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-lg">
              نمایش <span className="font-bold text-gray-800">{filteredNotifications.length}</span> از <span className="font-bold text-gray-800">{notifications.length}</span> اعلان
            </div>
          </div>
        </div>

        {/* لیست اعلان‌ها */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-lg shadow-xs border border-gray-200/60 p-12 text-center">
              <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">اعلانی یافت نشد</h3>
              <p className="text-gray-500">هیچ اعلانی با فیلترهای انتخاب شده مطابقت ندارد.</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`group bg-white rounded-lg shadow-xs border-2 transition-all duration-300 hover:shadow-md ${notification.read
                  ? 'border-gray-200/60 opacity-90'
                  : 'border-blue-200 bg-blue-50/50'
                  }`}
              >
                <div className="p-6">
                  <div className="flex gap-4">
                    {/* آیکن اعلان */}
                    <div className={`p-3 rounded-xl border-2 h-fit ${getNotificationColor(notification.type)}`}>
                      {getNotificationIcon(notification.type)}
                    </div>

                    {/* محتوای اعلان */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className={`text-lg font-semibold ${notification.read ? 'text-gray-700' : 'text-gray-900'
                            }`}>
                            {notification.title}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityBadge(notification.priority)}`}>
                            {getPriorityText(notification.priority)}
                          </span>
                          {!notification.read && (
                            <span className="flex items-center gap-1 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium animate-pulse">
                              <AlertCircle className="w-3 h-3" />
                              جدید
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-lg w-fit">
                          {notification.date} - {notification.time}
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4 leading-relaxed text-justify">
                        {notification.message}
                      </p>

                      {notification.relatedItem && (
                        <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm">
                          <Tag className="w-4 h-4" />
                          {notification.relatedItem}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* دکمه‌های اقدام با کامپوننت Button */}
                  <div className="flex justify-end gap-4 mt-4 pt-4 border-t border-gray-200/60">
                    {!notification.read && (
                      <OutlineButton
                        icon={<Check className="w-4 h-4" />}
                        onClick={() => markAsRead(notification.id)}
                        size="sm"
                      >
                        خوانده شد
                      </OutlineButton>
                    )}
                    <DestructiveButton
                      icon={<Trash2 className="w-4 h-4" />}
                      onClick={() => deleteNotification(notification.id)}
                      size="sm"
                    >
                      حذف
                    </DestructiveButton>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;