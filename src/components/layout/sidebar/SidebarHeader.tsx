'use client';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

interface SidebarHeaderProps {
  collapsed: boolean;
  onToggle: () => void;
}

const SidebarHeader = ({ collapsed, onToggle }: SidebarHeaderProps) => {
  return (
    <div
      className={clsx(
        'relative p-4 flex items-center justify-between transition-all duration-300',
        collapsed ? 'justify-start' : 'justify-between'
      )}
    >
      {/* 🔹 لوگو و عنوان */}
      <div className="flex items-center space-x-2">
        <Image
          src="/images/logo/carpet-logo.jpg"
          alt="logo"
          width={32}
          height={32}
          className="rounded-md border border-custom min-w-8 max-w-8 h-8"
        />
        {!collapsed && (
          <span className="font-semibold text-gray-800 text-nowrap">پنل مدیریت</span>
        )}
      </div>

      {/* 🔹 دکمه باز/بسته کردن */}
      <button
        onClick={onToggle}
        className={clsx(
          'p-1 rounded-md bg-primary text-white hover:bg-primary/80 transition-all duration-300 absolute',
          collapsed
            ? '-left-8 top-1/2 -translate-y-1/2 shadow-lg' // دکمه در بیرون نمایش داده شود
            : 'left-4 top-1/2 -translate-y-1/2'
        )}
      >
        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>
    </div>
  );
};

export default SidebarHeader;
