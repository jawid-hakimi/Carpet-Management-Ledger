// src/app/sales/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SaleDetails } from "@/app/sales/components/SaleDetails";
import { SaleActions } from "@/app/sales/components/SaleActions";
import { useParams, useRouter } from "next/navigation";

// داده نمونه برای جزئیات فروش
const mockSaleDetails = {
  id: "1",
  invoiceNumber: "INV-001",
  customer: {
    id: "1",
    name: "احمد محمدی",
    phone: "09123456789",
    address: "تهران، خیابان ولیعصر، پلاک 123"
  },
  product: {
    id: "1",
    name: "قالین دستباف اصفهان 6 متری",
    price: 25000000,
    category: "قالین دستباف"
  },
  saleInfo: {
    quantity: 1,
    unitPrice: 25000000,
    totalPrice: 25000000,
    discount: 0,
    finalPrice: 25000000,
    paymentMethod: "نقدی",
    deliveryMethod: "تحویل در فروشگاه",
    saleDate: "2024-03-20",
    status: "completed",
    notes: "قالین با کیفیت عالی و رنگ‌بندی سنتی"
  }
};

export default function SaleDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const saleId = params.id as string;
  
  const [saleData, setSaleData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // شبیه‌سازی دریافت داده از API
    const fetchSaleDetails = async () => {
      setIsLoading(true);
      setTimeout(() => {
        setSaleData(mockSaleDetails);
        setIsLoading(false);
      }, 1000);
    };

    fetchSaleDetails();
  }, [saleId]);

  const handleEdit = () => {
    router.push(`/sales/${saleId}/edit`);
  };

  const handleDelete = () => {
    if (confirm("آیا از حذف این فاکتور مطمئن هستید؟")) {
      console.log("Deleting sale:", saleId);
      alert("فاکتور با موفقیت حذف شد!");
      router.push("/sales");
    }
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="w-full">
        <PageHeader
          title="جزئیات فروش"
          showHomeIcon={true}
          description="در حال بارگذاری اطلاعات..."
        />
        <div className="animate-pulse space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!saleData) {
    return (
      <div className="w-full">
        <PageHeader
          title="جزئیات فروش"
          showHomeIcon={true}
          description="فاکتور یافت نشد"
        />
        <div className="text-center py-12">
          <p className="text-gray-500">فاکتور مورد نظر یافت نشد.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <PageHeader
        title="جزئیات فروش"
        showHomeIcon={true}
        description={`شماره فاکتور: ${saleData.invoiceNumber}`}
      />

      <div className="space-y-6">
        <SaleActions
          onEdit={handleEdit}
          onDelete={handleDelete}
          onPrint={handlePrintInvoice}
          saleStatus={saleData.saleInfo.status}
        />
        
        <SaleDetails saleData={saleData} />
      </div>
    </div>
  );
}