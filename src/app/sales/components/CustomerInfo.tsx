// src/components/sales/CustomerInfo.tsx
"use client";

import { useState, useEffect } from "react";
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

  // همگام‌سازی stateها با formData
  useEffect(() => {
    if (formData.customerId && formData.customerName) {
      // اگر مشتری از قبل انتخاب شده
      const customer = mockCustomers.find(c => c.id === formData.customerId);
      if (customer) {
        setSelectedCustomer(customer);
        setIsNewCustomer(false);
      } else {
        // اگر مشتری جدید است
        setIsNewCustomer(true);
      }
    } else if (formData.customerName) {
      // اگر نام مشتری پر شده اما customerId ندارد (مشتری جدید)
      setIsNewCustomer(true);
    }
  }, [formData]);

  const handleCustomerSelect = (customerId: string) => {
    const customer = mockCustomers.find(c => c.id === customerId);
    setSelectedCustomer(customer);

    if (customer) {
      onFormDataChange('customerId', customer.id);
      onFormDataChange('customerName', customer.name);
      onFormDataChange('customerPhone', customer.phone);
      onFormDataChange('customerAddress', customer.address);
    } else {
      // اگر مشتری پاک شد
      onFormDataChange('customerId', "");
      onFormDataChange('customerName', "");
      onFormDataChange('customerPhone', "");
      onFormDataChange('customerAddress', "");
    }
  };

  const handleNewCustomerToggle = (isNew: boolean) => {
    setIsNewCustomer(isNew);
    
    if (isNew) {
      // وقتی به حالت مشتری جدید می‌رویم، customerId را پاک می‌کنیم
      onFormDataChange('customerId', "");
      setSelectedCustomer(null);
    } else {
      // وقتی به حالت مشتری موجود می‌رویم، فرم را پاک می‌کنیم
      onFormDataChange('customerName', "");
      onFormDataChange('customerPhone', "");
      onFormDataChange('customerAddress', "");
    }
  };

  // بررسی اینکه آیا مشتری فعلی در لیست mockCustomers وجود دارد
  const getCurrentCustomerOption = () => {
    if (formData.customerId && formData.customerName) {
      const existingCustomer = mockCustomers.find(c => c.id === formData.customerId);
      if (existingCustomer) {
        return existingCustomer.id;
      }
      
      // اگر مشتری در لیست نیست اما داده دارد، یک گزینه موقت ایجاد می‌کنیم
      return formData.customerId;
    }
    return "";
  };

  // ایجاد لیست گزینه‌ها شامل مشتری فعلی اگر در لیست نیست
  const getCustomerOptions = () => {
    const options = mockCustomers.map(c => ({
      value: c.id,
      label: `${c.name} - ${c.phone}`
    }));

    // اگر مشتری فعلی در لیست mockCustomers نیست اما داده دارد، آن را اضافه می‌کنیم
    if (formData.customerId && formData.customerName && !mockCustomers.find(c => c.id === formData.customerId)) {
      options.unshift({
        value: formData.customerId,
        label: `${formData.customerName} - ${formData.customerPhone} (موقت)`
      });
    }

    return options;
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
          onClick={() => handleNewCustomerToggle(false)}
          className={`${!isNewCustomer
            ? "bg-teal-500 text-white border-teal-500"
            : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-700"
            }`}
        >
          مشتری موجود
        </OutlineButton>
        <OutlineButton
          type="button"
          onClick={() => handleNewCustomerToggle(true)}
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
          options={getCustomerOptions()}
          value={getCurrentCustomerOption()}
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

      {/* نمایش اطلاعات مشتری انتخاب شده */}
      {!isNewCustomer && selectedCustomer && (
        <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-green-700">
            <strong>مشتری انتخاب شده:</strong> {selectedCustomer.name} - {selectedCustomer.phone}
          </p>
          <p className="text-sm text-green-600 mt-1">{selectedCustomer.address}</p>
        </div>
      )}

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