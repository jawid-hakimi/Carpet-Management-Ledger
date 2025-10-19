import {
  LayoutDashboard,
  Package,
  PlusCircle,
  List,
  ShoppingBag,
  Building2,
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
      { title: 'فروش مورد جدید', link: '/sales/new' },
      { title: 'لیست فروشات', link: '/sales/list' },
    ],
  },
  {
    title: 'کمپانی',
    icon: Building2,
    submenu: [
      { title: 'اضافه نمودن کمپانی', link: '/company/add' },
      { title: 'لیست کمپانی‌ها', link: '/company/list' },
    ],
  },
  {
    title: 'گذارشات',
    icon: FileText,
    link: '/reports',
  },
];
