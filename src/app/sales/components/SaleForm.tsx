// src/components/sales/SaleForm.tsx
"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { SaveButton, CancelButton } from "@/components/ui/Button";
import { ProductSelection } from "./ProductSelection";
import { CustomerInfo } from "./CustomerInfo";
import { 
  Package, 
  User, 
  DollarSign 
} from "lucide-react";

interface SaleFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const paymentMethods = [
  { value: "cash", label: "نقدی" },
  { value: "card", label: "کارت به کارت" },
  { value: "check", label: "چک" },
  { value: "installment", label: "اقساط" },
];

const deliveryMethods = [
  { value: "pickup", label: "تحویل در فروشگاه" },
  { value: "delivery", label: "ارسال به آدرس" },
];

export function SaleForm({ onSubmit, onCancel }: SaleFormProps) {
  const [formData, setFormData] = useState({
    productId: "",
    quantity: 1,
    unitPrice: 0,
    totalPrice: 0,
    discount: 0,
    finalPrice: 0,
    customerId: "",
    customerName: "",
    customerPhone: "",
    customerAddress: "",
    paymentMethod: "",
    deliveryMethod: "",
    notes: "",
    saleDate: new Date().toISOString().split('T')[0],
  });

  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    if (selectedProduct && formData.quantity > 0) {
      const total = selectedProduct.price * formData.quantity;
      const final = total - formData.discount;
      
      setFormData(prev => ({
        ...prev,
        unitPrice: selectedProduct.price,
        totalPrice: total,
        finalPrice: final > 0 ? final : 0
      }));
    }
  }, [selectedProduct, formData.quantity, formData.discount]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      product: selectedProduct,
      invoiceNumber: Math.random().toString(36).substr(2, 9).toUpperCase()
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
      {/* انتخاب محصول */}
      <ProductSelection
        selectedProduct={selectedProduct}
        onProductChange={setSelectedProduct}
        quantity={formData.quantity}
        onQuantityChange={(qty) => handleInputChange('quantity', qty)}
      />

      {/* اطلاعات مشتری */}
      <CustomerInfo
        formData={formData}
        onFormDataChange={handleInputChange}
      />

      {/* قیمت‌گذاری و پرداخت */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <DollarSign className="ml-2 w-5 h-5" />
          قیمت‌گذاری و پرداخت
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <InfoCard title="قیمت کل">
            <div className="text-lg font-bold text-green-600">
              {formData.totalPrice.toLocaleString()} تومان
            </div>
          </InfoCard>

          <Input
            label="تخفیف (تومان)"
            type="number"
            value={formData.discount}
            onChange={(e) => handleInputChange('discount', parseInt(e.target.value) || 0)}
            min="0"
            max={formData.totalPrice}
          />

          <InfoCard title="مبلغ نهایی">
            <div className="text-lg font-bold text-blue-600">
              {formData.finalPrice.toLocaleString()} تومان
            </div>
          </InfoCard>

          <Input
            label="تاریخ فروش"
            type="date"
            value={formData.saleDate}
            onChange={(e) => handleInputChange('saleDate', e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
      </div>

      {/* توضیحات */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">توضیحات</h3>
        <Textarea
          value={formData.notes}
          onChange={(value) => handleInputChange('notes', value)}
          placeholder="توضیحات اضافی..."
          rows={3}
        />
      </div>

      {/* دکمه‌های اقدام */}
      <div className="flex gap-4 justify-end pt-6 border-t border-gray-200">
        <CancelButton size="md" onClick={onCancel}>
          انصراف
        </CancelButton>

        <SaveButton
          size="md"
          type="submit"
          disabled={!formData.productId || !formData.customerName}
        >
          ثبت فروش و نمایش فاکتور
        </SaveButton>
      </div>
    </form>
  );
}