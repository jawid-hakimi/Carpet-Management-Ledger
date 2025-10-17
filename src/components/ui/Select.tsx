// src/components/ui/Select.tsx
"use client";
import { useState } from "react";
import { cn } from "@/utils/utils";
import { ChevronDown } from "lucide-react";

export function Select<T extends { value: string | number; label: string }>({ options, value, onChange, placeholder = "انتخاب کنید" }: { options: T[]; value?: string | number; onChange?: (v: string | number) => void; placeholder?: string; }) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);
  return (
    <div className="relative inline-block w-full">
      <button onClick={() => setOpen((s) => !s)} className="w-full px-3 py-2 rounded-xl border border-secondary/20 flex items-center justify-between">
        <span>{selected ? selected.label : placeholder}</span>
        <ChevronDown size={16} />
      </button>
      {open && (
        <div className="absolute left-0 right-0 mt-2 rounded-xl shadow-lg bg-white dark:bg-background-dark z-40 max-h-60 overflow-auto p-2">
          {options.map((opt) => (
            <div key={opt.value} className="px-3 py-2 rounded hover:bg-primary/5 cursor-pointer" onClick={() => { onChange?.(opt.value); setOpen(false); }}>
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
