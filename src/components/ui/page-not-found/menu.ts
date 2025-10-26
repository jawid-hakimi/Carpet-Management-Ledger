import {
    LayoutDashboard,
    Package,
    ShoppingBag,
    Users,
    FileText,
    PlusCircle,
    List,
    UserPlus,
    Bell
} from 'lucide-react';

export const Menu = [
    {
        title: 'داشبورد',
        icon: LayoutDashboard,
        link: '/dashboard',
    },

    { title: 'اضافه نمودن محصول', icon: PlusCircle, link: '/products/add' },
    { title: 'لیست محصول', icon: List, link: '/products/list' },


    { title: 'فروش مورد جدید', icon: PlusCircle, link: '/sales/create' },
    { title: 'لیست فروشات', icon: List, link: '/sales/list' },
    {
        title: 'اعلانات',
        icon: Bell,
        link: '/notifications',
    },
    {
        title: 'گزارشات',
        icon: FileText,
        link: '/reports',
    },
];
