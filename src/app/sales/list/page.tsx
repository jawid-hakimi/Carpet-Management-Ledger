// src/app/sales/page.tsx
"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SalesList } from "../components/SalesList";
import { useRouter } from "next/navigation";

const mockSales = [
  {
    id: "1",
    invoiceNumber: "INV-001",
    customerName: "احمد محمدی",
    productName: "قالین دستباف اصفهان 6 متری",
    quantity: 1,
    totalPrice: 25000000,
    saleDate: "2024-03-20",
    status: "completed",
    paymentMethod: "نقدی"
  },
  {
    id: "2",
    invoiceNumber: "INV-002",
    customerName: "فاطمه کریمی",
    productName: "قالین ماشینی تبریز 9 متری",
    quantity: 2,
    totalPrice: 16000000,
    saleDate: "2024-03-19",
    status: "completed",
    paymentMethod: "کارت به کارت"
  },
  {
    id: "3",
    invoiceNumber: "INV-003",
    customerName: "رضا حسینی",
    productName: "فرش ترکمنی 3 متری",
    quantity: 1,
    totalPrice: 12000000,
    saleDate: "2024-03-18",
    status: "pending",
    paymentMethod: "چک"
  }
];

export default function SalesPage() {
  const router = useRouter();
  const [filteredSales, setFilteredSales] = useState(mockSales);
  const [filters, setFilters] = useState({
    customerName: "",
    dateFrom: "",
    dateTo: "",
    status: ""
  });

  const handleViewDetails = (sale: any) => {
    router.push(`/sales/${sale.id}/details`);
  };

  const handleEdit = (sale: any) => {
    router.push(`/sales/${sale.id}/edit`);
  };

  const handleDelete = (sale: any) => {
    if (confirm(`آیا از حذف بل ${sale.invoiceNumber} مطمئن هستید؟`)) {
      console.log("Delete sale:", sale);
    }
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    
    // فیلتر کردن داده‌ها
    let filtered = mockSales;
    
    if (newFilters.customerName) {
      filtered = filtered.filter(sale => 
        sale.customerName.includes(newFilters.customerName)
      );
    }
    
    if (newFilters.dateFrom) {
      filtered = filtered.filter(sale => 
        sale.saleDate >= newFilters.dateFrom
      );
    }
    
    if (newFilters.dateTo) {
      filtered = filtered.filter(sale => 
        sale.saleDate <= newFilters.dateTo
      );
    }
    
    if (newFilters.status) {
      filtered = filtered.filter(sale => 
        sale.status === newFilters.status
      );
    }
    
    setFilteredSales(filtered);
  };

  return (
    <div className="w-full">
      <PageHeader
        title="لیست فروشات"
        showHomeIcon={true}
        description="مدیریت و مشاهده تمام فروشات انجام شده"
      />

      
        <SalesList
          sales={filteredSales}
          onViewDetails={handleViewDetails}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
    </div>
  );
}