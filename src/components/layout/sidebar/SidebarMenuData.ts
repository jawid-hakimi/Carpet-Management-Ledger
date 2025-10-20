import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users ,
  FileText,
} from 'lucide-react';

export const sidebarMenu = [
  {
    title: 'داشبورد',
    icon: LayoutDashboard,
    link: '/dashboard',
  },
  {
    title: 'محصولات',
    icon: Package,
    submenu: [
      { title: 'اضافه نمودن محصول', link: '/products/add' },
      { title: 'لیست محصول', link: '/products/list' },
    ],
  },
  {
    title: 'فروشات',
    icon: ShoppingBag,
    submenu: [
      { title: 'فروش مورد جدید', link: '/sales/create' },
      { title: 'لیست فروشات', link: '/sales/list' },
    ],
  },
  {
    title: 'کاربران',
    icon: Users ,
    submenu: [
      { title: 'افزودن کاربر جدید', link: '/users/add' },
      { title: 'لیست کاربران', link: '/users/list' },
    ],
  },
  {
    title: 'گذارشات',
    icon: FileText,
    link: '/reports',
  },
];
