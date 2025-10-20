// src/components/sales/SalesFilter.tsx
"use client";

import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Search, Filter, X } from "lucide-react";
import { useState } from "react";

interface SalesFilterProps {
  filters: any;
  onFilterChange: (filters: any) => void;
}

const statusOptions = [
  { value: "", label: "همه وضعیت‌ها" },
  { value: "completed", label: "تکمیل شده" },
  { value: "pending", label: "در انتظار" },
  { value: "cancelled", label: "لغو شده" }
];

export function SalesFilter({ filters, onFilterChange }: SalesFilterProps) {
  const [showFilters, setShowFilters] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    onFilterChange({
      ...filters,
      [field]: value
    });
  };

  const clearFilters = () => {
    onFilterChange({
      customerName: "",
      dateFrom: "",
      dateTo: "",
      status: ""
    });
  };

  const hasActiveFilters = filters.customerName || filters.dateFrom || filters.dateTo || filters.status;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Filter className="ml-2 w-5 h-5" />
          فیلترها
        </h3>
        
        <div className="flex gap-3">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center px-3 py-2 text-sm text-red-600 hover:text-red-700"
            >
              <X className="ml-1 w-4 h-4" />
              پاک کردن فیلترها
            </button>
          )}
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
          >
            <Filter className="ml-1 w-4 h-4" />
            {showFilters ? 'بستن فیلترها' : 'نمایش فیلترها'}
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
          <Input
            label="نام مشتری"
            value={filters.customerName}
            onChange={(e) => handleInputChange('customerName', e.target.value)}
            placeholder="جستجوی نام مشتری..."
            icon={<Search className="w-4 h-4" />}
          />

          <Input
            label="از تاریخ"
            type="date"
            value={filters.dateFrom}
            onChange={(e) => handleInputChange('dateFrom', e.target.value)}
          />

          <Input
            label="تا تاریخ"
            type="date"
            value={filters.dateTo}
            onChange={(e) => handleInputChange('dateTo', e.target.value)}
          />

          <Select
            label="وضعیت"
            options={statusOptions}
            value={filters.status}
            onChange={(value) => handleInputChange('status', value)}
          />
        </div>
      )}
    </div>
  );
}