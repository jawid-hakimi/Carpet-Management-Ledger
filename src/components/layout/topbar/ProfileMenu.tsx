"use client";

interface ProfileMenuProps {
  name: string;
  avatar: string;
}

export default function ProfileMenu({ name, avatar }: ProfileMenuProps) {
  return (
    <div dir="ltr" className="flex items-center gap-2 cursor-pointer">
      <img
        src={avatar}
        alt={name}
        className="w-8 h-8 rounded-sm object-cover border border-custom"
      />
      <span className="text-slate-700 text-sm font-medium">{name}</span>
      <svg
        className="w-4 h-4 text-slate-500"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}
