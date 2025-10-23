// src/app/sales/create/page.tsx
"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SaleForm } from "../components/SaleForm";
import { InvoicePreview } from "../components/InvoicePreview";
import { useRouter } from "next/navigation";
import { SaleSubmitData, convertToSaleDataType } from "@/types/sales/sales";

export default function CreateSalePage() {
  const router = useRouter();
  const [showInvoice, setShowInvoice] = useState(false);
  const [saleData, setSaleData] = useState<SaleSubmitData | null>(null);
  const [formData, setFormData] = useState<SaleSubmitData | null>(null);

  const handleSaleSubmit = (data: SaleSubmitData) => {
    setSaleData(data);
    setFormData(data);
    setShowInvoice(true);
  };

  const handleBackFromPreview = () => {
    setShowInvoice(false);
  };

  return (
    <div className="w-full">
      <PageHeader
        title="فروش جدید"
        showHomeIcon={true}
        description="ثبت فروش جدید محصول"
      />

      {showInvoice && saleData ? (
        <InvoicePreview 
          saleData={convertToSaleDataType(saleData)}
          onBack={handleBackFromPreview}
        />
      ) : (
        <SaleForm 
          onSubmit={handleSaleSubmit}
          onCancel={() => router.back()}
          initialData={formData || undefined}
        />
      )}
    </div>
  );
}