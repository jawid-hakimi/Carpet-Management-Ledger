// src/components/ui/Select.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Search, X } from "lucide-react";

interface SelectProps {
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  error?: string;
  searchable?: boolean;
  clearable?: boolean;
  required?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Select({
  options,
  value,
  label,
  onChange,
  placeholder = "Select Options",
  disabled = false,
  error,
  searchable = false,
  clearable = false,
  required = false,
  size = "md",
  className
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const selectRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selected = options.find((o) => o.value === value);

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-4 py-2.5 text-base"
  };

  // فیلتر options بر اساس جستجو
  const filteredOptions = searchable
    ? options.filter(option =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : options;

  // بستن دراپ‌دان هنگام کلیک خارج
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setOpen(false);
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // فوکوس روی input جستجو وقتی دراپ‌دان باز می‌شود
  useEffect(() => {
    if (open && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [open, searchable]);

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.("");
    setSearchTerm("");
  };

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setOpen(false);
    setSearchTerm("");
  };

  return (
    <div ref={selectRef} className={`relative w-full ${className || ''}`}>
      {label && (
        <label className={`text-sm font-medium ${error ? 'text-red-600' : 'text-gray-600'} ${disabled ? 'opacity-50' : ''}`}>
          {label}
          {required && <span className="text-red-500 mr-1">*</span>}
        </label>
      )}

      {/* دکمه اصلی */}
      <button
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        className={`w-full ${sizes[size]} rounded-md ring ring-gray-300 bg-white flex items-center justify-between hover:ring-2 hover:ring-teal-500 transition-all duration-150 ${label ? "mt-1" : ""} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${error ? 'ring-red-500' : ''} ${open ? 'ring-2 ring-teal-500' : ''}`}
      >
        <span className={`${selected ? "text-gray-900" : "text-gray-500"} ${disabled ? 'text-gray-400' : ''}`}>
          {selected ? selected.label : placeholder}
        </span>

        <div className="flex items-center gap-1 flex-shrink-0">
          {clearable && value && !disabled && (
            <div
              onClick={handleClear}
              className="p-0.5 rounded hover:bg-gray-100 transition-colors"
            >
              <X size={14} className="text-gray-400 hover:text-gray-600" />
            </div>
          )}
          <ChevronDown
            size={18}
            className={`text-teal-500 transition-all duration-100 ${open ? "rotate-180" : ""} ${disabled ? 'text-gray-400' : ''}`}
          />
        </div>
      </button>

      {/* Error message */}
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}

      {/* لیست options */}
      {open && (
        <div className="absolute left-0 right-0 mt-1 rounded-lg bg-white border border-gray-200 overflow-hidden shadow-lg z-50">
          {/* Search input */}
          {searchable && (
            <div className="p-2 border-b border-gray-200">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="جستجو..."
                  className="w-full pr-9 pl-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>
            </div>
          )}

          {/* Options list */}
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                موردی یافت نشد
              </div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`flex items-center justify-between text-sm px-4 py-2 cursor-pointer hover:bg-teal-500 hover:text-white transition-all duration-150 ${value === option.value ? "bg-teal-500 text-white" : ""}`}
                >
                  <span>{option.label}</span>
                  {value === option.value && <Check size={16} />}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}