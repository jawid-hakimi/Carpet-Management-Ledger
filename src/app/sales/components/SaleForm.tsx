// src/components/sales/SaleForm.tsx
"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { SaveButton, CancelButton } from "@/components/ui/Button";
import { ProductSelection } from "./ProductSelection";
import { CustomerInfo } from "./CustomerInfo";
import { InvoiceSummary } from "./InvoiceSummary";
import {
  Package,
  User,
  DollarSign
} from "lucide-react";

interface SaleFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

interface SaleProduct {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  salePrice: number;
  purchasePrice: number;
  stock: number;
  size: string;
  color: string;
  quality: string;
  material: string;
  code: string;
}

const paymentMethods = [
  { value: "cash", label: "نقدی" },
  { value: "bank", label: "انتقال بانکی" },
  { value: "mobile", label: "موبایل‌مانی (M-Paisa / Azizi Pay)" },
  { value: "hawala", label: "حواله" },
];


const deliveryMethods = [
  { value: "pickup", label: "تحویل در فروشگاه" },
  { value: "delivery", label: "ارسال به آدرس" },
];

export function SaleForm({ onSubmit, onCancel }: SaleFormProps) {
  const [saleProducts, setSaleProducts] = useState<SaleProduct[]>([]);
  const [formData, setFormData] = useState({
    customerId: "",
    customerName: "",
    customerPhone: "",
    customerAddress: "",
    paymentMethod: "",
    deliveryMethod: "",
    notes: "",
    saleDate: new Date().toISOString().split('T')[0],
  });

  // محاسبه قیمت نهایی بر اساس محصولات فروش
  const finalPrice = saleProducts.reduce((total, product) => {
    return total + (product.salePrice * product.quantity);
  }, 0);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (saleProducts.length === 0) {
      alert("لطفاً حداقل یک محصول به فاکتور اضافه کنید");
      return;
    }

    onSubmit({
      ...formData,
      products: saleProducts,
      finalPrice: finalPrice,
      invoiceNumber: `INV-${Date.now().toString(36).toUpperCase()}`
    });
  };

  const InfoCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
      <div className="text-gray-900">{children}</div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* انتخاب محصولات */}
      <ProductSelection
        saleProducts={saleProducts}
        onSaleProductsChange={setSaleProducts}
      />

      {/* اطلاعات مشتری */}
      <CustomerInfo
        formData={formData}
        onFormDataChange={handleInputChange}
      />

      {/* پرداخت و تحویل */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
          <DollarSign className="ml-2 w-5 h-5" />
          پرداخت و تحویل
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="نحوه پرداخت"
            options={paymentMethods}
            value={formData.paymentMethod}
            onChange={(value) => handleInputChange('paymentMethod', value)}
            placeholder="انتخاب روش پرداخت"
            required
          />

          <Select
            label="نحوه تحویل"
            options={deliveryMethods}
            value={formData.deliveryMethod}
            onChange={(value) => handleInputChange('deliveryMethod', value)}
            placeholder="انتخاب روش تحویل"
            required
          />
        </div>

        <div className="mt-4">
          <Input
            label="تاریخ فروش"
            type="date"
            value={formData.saleDate}
            onChange={(e) => handleInputChange('saleDate', e.target.value)}
            required
          />
        </div>
      </div>

      {/* توضیحات */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">توضیحات</h3>
        <Textarea
          value={formData.notes}
          onChange={(value) => handleInputChange('notes', value)}
          placeholder="توضیحات اضافی..."
          rows={3}
        />
      </div>

      {/* خلاصه فاکتور */}
      {saleProducts.length > 0 && (
        <InvoiceSummary
          saleProducts={saleProducts}
          customerName={formData.customerName}
          customerPhone={formData.customerPhone}
          customerAddress={formData.customerAddress}
          paymentMethod={formData.paymentMethod}
          deliveryMethod={formData.deliveryMethod}
          saleDate={formData.saleDate}
          notes={formData.notes}
        />
      )}

      {/* دکمه‌های اقدام */}
      <div className="flex gap-4 justify-end pt-6 border-t border-gray-200">
        <CancelButton size="md" onClick={onCancel}>
          انصراف
        </CancelButton>

        <SaveButton
          size="md"
          type="submit"
          disabled={saleProducts.length === 0 || !formData.customerName}
        >
          ثبت فروش و نمایش فاکتور
        </SaveButton>
      </div>
    </form>
  );
}