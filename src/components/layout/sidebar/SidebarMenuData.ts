import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  FileText,
  PlusCircle,
  List,
  UserPlus
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
      { title: 'اضافه نمودن محصول', icon: PlusCircle, link: '/products/add' },
      { title: 'لیست محصول', icon: List, link: '/products/list' },
    ],
  },
  {
    title: 'فروشات',
    icon: ShoppingBag,
    submenu: [
      { title: 'فروش مورد جدید', icon: PlusCircle, link: '/sales/create' },
      { title: 'لیست فروشات', icon: List, link: '/sales/list' },
    ],
  },
  {
    title: 'کاربران',
    icon: Users,
    submenu: [
      { title: 'افزودن کاربر جدید', icon: UserPlus, link: '/users/add' },
      { title: 'لیست کاربران', icon: List, link: '/users/list' },
    ],
  },
  {
    title: 'گزارشات',
    icon: FileText,
    link: '/reports',
  },
];
