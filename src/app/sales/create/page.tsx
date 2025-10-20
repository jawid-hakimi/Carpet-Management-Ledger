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

  const handleSaleSubmit = (data: any) => {
    setSaleData(data);
    setShowInvoice(true);
  };

  const handleNewSale = () => {
    setShowInvoice(false);
    setSaleData(null);
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
          onNewSale={handleNewSale}
          onBack={() => setShowInvoice(false)}
        />
      ) : (
        <SaleForm 
          onSubmit={handleSaleSubmit}
          onCancel={() => router.back()}
        />
      )}
    </div>
  );
}