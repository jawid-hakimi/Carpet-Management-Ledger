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
import { DollarSign } from "lucide-react";
import { 
  SaleFormProps, 
  SaleFormData, 
  ProductItemType as SaleProduct, 
  SaleSubmitData,
  FormField 
} from "@/types/sales/sales";

const paymentMethods = [
  { value: "نقدی", label: "نقدی" },
  { value: "انتقال بانکی", label: "انتقال بانکی" },
  { value: "موبایل‌مانی", label: "موبایل‌مانی (M-Paisa / Azizi Pay)" },
  { value: "حواله", label: "حواله" },
];

const deliveryMethods = [
  { value: "تحویل در شرکت", label: "تحویل در فروشگاه" },
  { value: "ارسال به آدرس", label: "ارسال به آدرس" },
];

// تابع helper برای ایجاد SaleProduct از داده‌های مختلف
const createSaleProduct = (productData: Partial<SaleProduct>): SaleProduct => ({
  id: productData.id || `temp-${Date.now()}-${Math.random()}`,
  productId: productData.productId || productData.id || "",
  name: productData.name || "",
  quantity: productData.quantity || 1,
  salePrice: productData.salePrice || 0,
  purchasePrice: productData.purchasePrice || 0,
  stock: productData.stock || 0,
  size: productData.size || "",
  color: productData.color || "",
  quality: productData.quality || "",
  material: productData.material || "",
  code: productData.code || "",
});

export function SaleForm({ onSubmit, onCancel, initialData }: SaleFormProps) {
  const [saleProducts, setSaleProducts] = useState<SaleProduct[]>([]);
  const [formData, setFormData] = useState<SaleFormData>({
    customerId: "",
    customerName: "",
    customerPhone: "",
    customerAddress: "",
    paymentMethod: "",
    deliveryMethod: "",
    notes: "",
    saleDate: new Date().toISOString().split('T')[0],
  });

  // بارگذاری initialData هنگام تغییر
  useEffect(() => {
    if (initialData) {
      // پر کردن فرم با داده‌های قبلی
      setFormData({
        customerId: initialData.customerId || "",
        customerName: initialData.customerName || "",
        customerPhone: initialData.customerPhone || "",
        customerAddress: initialData.customerAddress || "",
        paymentMethod: initialData.paymentMethod || "",
        deliveryMethod: initialData.deliveryMethod || "",
        notes: initialData.notes || "",
        saleDate: initialData.saleDate || new Date().toISOString().split('T')[0],
      });

      // پر کردن محصولات با داده‌های قبلی
      if (initialData.products && Array.isArray(initialData.products)) {
        const normalizedProducts = initialData.products.map(product => 
          createSaleProduct(product)
        );
        setSaleProducts(normalizedProducts);
      }
    }
  }, [initialData]);

  // محاسبه قیمت نهایی بر اساس محصولات فروش
  const finalPrice = saleProducts.reduce((total, product) => {
    return total + (product.salePrice * product.quantity);
  }, 0);

  const handleInputChange = (field: FormField, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (saleProducts.length === 0) {
      alert("لطفاً حداقل یک محصول به بل اضافه کنید");
      return;
    }

    const submitData: SaleSubmitData = {
      ...formData,
      products: saleProducts,
      finalPrice: finalPrice,
      invoiceNumber: initialData?.invoiceNumber || `INV-${Date.now().toString(36).toUpperCase()}`
    };

    onSubmit(submitData);
  };

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

      {/* خلاصه بل */}
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
          {initialData ? "به‌روزرسانی و نمایش بل" : "ثبت فروش و نمایش بل"}
        </SaveButton>
      </div>
    </form>
  );
}