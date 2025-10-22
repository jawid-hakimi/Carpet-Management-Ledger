// src/components/sales/CustomerInfo.tsx
"use client";

import { useState } from "react";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { User } from "lucide-react";
import { OutlineButton } from "@/components/ui/Button";

const mockCustomers = [
  { id: "1", name: "احمد حسینی", phone: "0793123456", address: "کابل، کارته سخی، شهرک عبدالرحمن خان" },
  { id: "2", name: "مریم احمدزی", phone: "0700123456", address: "کابل، مکرویان، جاده میوند" },
  { id: "3", name: "رحمان کریمی", phone: "0780987654", address: "کابل، دشت برچی، شهرک طلایی" },
  { id: "4", name: "زهرا محمدی", phone: "0775123456", address: "کابل، شهر نو، چهار راهی انصاری" },
  { id: "5", name: "جمیل احمدی", phone: "0744123456", address: "کابل، پل محمود، جاده قندهار" },
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
      <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
        <User className="ml-2 w-5 h-5" />
        معلومات مشتری
      </h3>

      <div className="flex gap-4 mb-4">
        <OutlineButton
          type="button"
          onClick={() => setIsNewCustomer(false)}
          className={`${!isNewCustomer
            ? "bg-teal-500 text-white border-teal-500"
            : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-700"
            }`}
        >
          مشتری موجود
        </OutlineButton>
        <OutlineButton
          type="button"
          onClick={() => setIsNewCustomer(true)}
          className={`${isNewCustomer
            ? "bg-teal-500 text-white border-teal-500"
            : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-700"
            }`}
        >
          مشتری جدید
        </OutlineButton>
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
          placeholder="مشتری را انتخاب کنید"
          searchable
          clearable
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
            placeholder="07xxxxxxxx"
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

      {/* راهنمای شماره تماس */}
      {isNewCustomer && (
        <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-700">
            <strong>راهنما:</strong> شماره تماس باید با 07 شروع شود (مثال: 0793123456)
          </p>
        </div>
      )}
    </div>
  );
}