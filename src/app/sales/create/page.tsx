// src/app/sales/create/page.tsx
"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SaleForm } from "../components/SaleForm";
import { InvoicePreview } from "../components/InvoicePreview";
import { useRouter } from "next/navigation";

export default function CreateSalePage() {
  const router = useRouter();
  const [showInvoice, setShowInvoice] = useState(false);
  const [saleData, setSaleData] = useState<any>(null);
  const [formData, setFormData] = useState<any>(null); // اضافه کردن state برای فرم

  const handleSaleSubmit = (data: any) => {
    setSaleData(data);
    setFormData(data); // ذخیره داده‌های فرم
    setShowInvoice(true);
  };

  const handleBackFromPreview = () => {
    setShowInvoice(false);
    // داده‌های فرم قبلاً در formData ذخیره شده‌اند
  };

  return (
    <div className="w-full">
      <PageHeader
        title="فروش جدید"
        showHomeIcon={true}
        description="ثبت فروش جدید محصول"
      />

      {showInvoice ? (
        <InvoicePreview 
          saleData={saleData}
          onBack={handleBackFromPreview}
        />
      ) : (
        <SaleForm 
          onSubmit={handleSaleSubmit}
          onCancel={() => router.back()}
          initialData={formData} // ارسال داده‌های قبلی به فرم
        />
      )}
    </div>
  );
}