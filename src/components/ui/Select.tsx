// src/components/ui/Select.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

interface SelectProps {
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export function Select({ options, value, onChange, placeholder = "Select Options" }: SelectProps) {
  const [open, setOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  // بستن دراپ‌دان هنگام کلیک خارج
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={selectRef} className="relative w-full">
      {/* دکمه اصلی */}
      <button 
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-2 rounded-md ring ring-gray-300 bg-white flex items-center justify-between hover:ring-2 hover:ring-teal-500 transition-all duration-150"
      >
        <span className={selected ? "text-gray-900" : "text-gray-500"}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown size={18} className={`text-gray-500 transition-all duration-100 ${open?"rotate-180" :""}`} />
      </button>

      {/* لیست options */}
      {open && (
        <div className="absolute left-0 right-0 mt-1 rounded-lg space-y-1 bg-white border border-gray-200 overflow-hidden shadow-lg z-50">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange?.(option.value);
                setOpen(false);
              }}
              className={`flex items-center justify-between text-sm px-4 py-2 cursor-pointer hover:bg-teal-500 hover:text-white transition-all duration-150 ${
                value === option.value ? "bg-teal-500 text-white" : ""
              }`}
            >
              <span>{option.label}</span>
              {value === option.value && <Check size={16} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}