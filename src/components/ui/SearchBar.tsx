// src/components/ui/SearchBar.tsx
import { Search } from "lucide-react";
export function SearchBar({ value, onChange, placeholder = "جستجو..." }: { value?: string; onChange?: (v: string) => void; placeholder?: string }) {
  return (
    <div className="flex items-center gap-2 border rounded-xl px-3 py-2">
      <Search size={16} />
      <input value={value} onChange={(e) => onChange?.(e.target.value)} placeholder={placeholder} className="w-full outline-none" />
    </div>
  );
}