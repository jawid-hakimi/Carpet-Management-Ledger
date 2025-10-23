// src/app/sales/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SaleDetails } from "@/app/sales/components/SaleDetails";
import { SaleActions } from "@/app/sales/components/SaleActions";
import { InvoicePreview } from "@/app/sales/components/InvoicePreview";
import { useParams, useRouter } from "next/navigation";
import { SaleDataType, ProductItemType, convertToSaleDataType, SaleSubmitData } from "@/types/sales/sales";

// داده نمونه منطبق با ساختار واقعی
const mockSaleDetails: SaleSubmitData = {
  id: "1",
  invoiceNumber: "INV-001",
  customerName: "احمد محمدی",
  customerPhone: "0793123456",
  customerAddress: "کابل، کارته سخی، شهرک عبدالرحمن خان",
  saleDate: "2024-03-20",
  paymentMethod: "نقدی",
  deliveryMethod: "تحویل در فروشگاه",
  notes: "قالین با کیفیت عالی و رنگ‌بندی سنتی",
  finalPrice: 25000000,
  customerId: "cust-1",
  products: [
    {
      id: "1",
      productId: "prod-1",
      name: "قالین دستباف اصفهان 6 متری",
      quantity: 1,
      salePrice: 25000000,
      purchasePrice: 20000000,
      stock: 5,
      size: "6x4 متر",
      color: "قرمز و آبی",
      quality: "درجه یک",
      material: "پشم مرینوس",
      code: "CARP-001"
    },
    {
      id: "2", 
      productId: "prod-2",
      name: "قالین ماشینی ترک 4 متری",
      quantity: 2,
      salePrice: 8000000,
      purchasePrice: 6000000,
      stock: 10,
      size: "4x3 متر",
      color: "کرم",
      quality: "درجه دو",
      material: "اکریلیک",
      code: "CARP-002"
    }
  ]
};

export default function SaleDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const saleId = params.id as string;
  
  const [saleData, setSaleData] = useState<SaleSubmitData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // شبیه‌سازی دریافت داده از API
    const fetchSaleDetails = async () => {
      setIsLoading(true);
      try {
        // در حالت واقعی، اینجا API call می‌زنید
        setTimeout(() => {
          setSaleData(mockSaleDetails);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching sale details:", error);
        setIsLoading(false);
      }
    };

    fetchSaleDetails();
  }, [saleId]);

  const handleEdit = () => {
    router.push(`/sales/${saleId}/edit`);
  };

  const handleDelete = () => {
    if (confirm("آیا از حذف این بل مطمئن هستید؟")) {
      console.log("Deleting sale:", saleId);
      alert("بل با موفقیت حذف شد!");
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
          description="بل یافت نشد"
        />
        <div className="text-center py-12">
          <p className="text-gray-500">بل مورد نظر یافت نشد.</p>
        </div>
      </div>
    );
  }

  // تبدیل SaleSubmitData به SaleDataType برای کامپوننت‌ها
  const saleDataForDisplay = convertToSaleDataType(saleData);

  return (
    <div className="w-full">
      <PageHeader
        title="جزئیات فروش"
        showHomeIcon={true}
        description={`شماره بل: ${saleData.invoiceNumber}`}
      />

      <div className="space-y-6">
        <SaleActions
          onEdit={handleEdit}
          onDelete={handleDelete}
          onPrint={handlePrintInvoice}
          saleStatus="completed"
        />
        
        {/* نمایش جزئیات فروش در حالت عادی */}
        <div className="no-print">
          <SaleDetails saleData={saleDataForDisplay} />
        </div>

        {/* نمایش InvoicePreview فقط در حالت چاپ */}
        <div className="hidden print:block">
          <InvoicePreview 
            saleData={saleDataForDisplay}
            onBack={() => {}} // تابع خالی چون در حالت چاپ نیازی نیست
          />
        </div>
      </div>
    </div>
  );
}