// src/components/sales/CustomerInfo.tsx
"use client";

import { useState } from "react";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { User } from "lucide-react";

const mockCustomers = [
  { id: "1", name: "احمد محمدی", phone: "09123456789", address: "تهران، خیابان ولیعصر" },
  { id: "2", name: "فاطمه کریمی", phone: "09129876543", address: "اصفهان، خیابان چهارباغ" },
  { id: "3", name: "رضا حسینی", phone: "09121112233", address: "مشهد، بلوار وکیل‌آباد" },
];

interface CustomerInfoProps {
  formData: any;
  onFormDataChange: (field: string, value: any) => void;
}

export function CustomerInfo({ formData, onFormDataChange }: CustomerInfoProps) {
  const [isNewCustomer, setIsNewCustomer] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const handleCustomerSelect = (customerId: string) => {
    const customer = mockCustomers.find(c => c.id === customerId);
    setSelectedCustomer(customer);
    
    if (customer) {
      onFormDataChange('customerId', customer.id);
      onFormDataChange('customerName', customer.name);
      onFormDataChange('customerPhone', customer.phone);
      onFormDataChange('customerAddress', customer.address);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <User className="ml-2 w-5 h-5" />
        اطلاعات مشتری
      </h3>

      <div className="flex gap-4 mb-4">
        <button
          type="button"
          onClick={() => setIsNewCustomer(false)}
          className={`px-4 py-2 rounded-lg border ${
            !isNewCustomer 
              ? "bg-teal-500 text-white border-teal-500" 
              : "bg-white border-gray-300"
          }`}
        >
          مشتری موجود
        </button>
        <button
          type="button"
          onClick={() => setIsNewCustomer(true)}
          className={`px-4 py-2 rounded-lg border ${
            isNewCustomer 
              ? "bg-teal-500 text-white border-teal-500" 
              : "bg-white border-gray-300"
          }`}
        >
          مشتری جدید
        </button>
      </div>

      {!isNewCustomer ? (
        <Select
          label="انتخاب مشتری"
          options={mockCustomers.map(c => ({ 
            value: c.id, 
            label: `${c.name} - ${c.phone}` 
          }))}
          value={selectedCustomer?.id || ""}
          onChange={handleCustomerSelect}
          placeholder="جستجوی مشتری..."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="نام مشتری"
            value={formData.customerName}
            onChange={(e) => onFormDataChange('customerName', e.target.value)}
            placeholder="نام کامل مشتری"
            required
          />

          <Input
            label="شماره تماس"
            value={formData.customerPhone}
            onChange={(e) => onFormDataChange('customerPhone', e.target.value)}
            placeholder="09xxxxxxxxx"
            required
          />
        </div>
      )}

      <div className="mt-4">
        <Input
          label="آدرس"
          value={formData.customerAddress}
          onChange={(e) => onFormDataChange('customerAddress', e.target.value)}
          placeholder="آدرس کامل"
        />
      </div>
    </div>
  );
}