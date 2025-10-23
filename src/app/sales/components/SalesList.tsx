// src/app/sales/components/SalesList.tsx
"use client";

import { Eye, Edit, Trash2, FileText } from "lucide-react";
import { DataTable } from "@/components/ui/DataTable";

interface Sale {
  id: string;
  invoiceNumber: string;
  customerName: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  saleDate: string;
  status: "completed" | "pending" | "cancelled";
  paymentMethod: string;
}

interface SalesListProps {
  sales: Sale[];
  onViewDetails: (sale: Sale) => void;
  onEdit: (sale: Sale) => void;
  onDelete: (sale: Sale) => void;
}

export function SalesList({ sales, onViewDetails, onEdit, onDelete }: SalesListProps) {
  const getStatusBadge = (status: "completed" | "pending" | "cancelled") => {
    const styles = {
      completed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      cancelled: "bg-red-100 text-red-800"
    };

    const labels = {
      completed: "تکمیل شده",
      pending: "در انتظار",
      cancelled: "لغو شده"
    };

    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const columns = [
    {
      key: "invoiceNumber" as const,
      label: "شماره بل",
      sortable: true
    },
    {
      key: "customerName" as const,
      label: "مشتری",
      sortable: true
    },
    {
      key: "productName" as const,
      label: "محصول",
      sortable: true
    },
    {
      key: "quantity" as const,
      label: "تعداد",
      sortable: true,
      render: (value: string | number) => (
        <div className="text-center">{value as number}</div>
      )
    },
    {
      key: "totalPrice" as const,
      label: "مبلغ",
      sortable: true,
      render: (value: string | number) => `${(value as number).toLocaleString()} افغانی`
    },
    {
      key: "saleDate" as const,
      label: "تاریخ",
      sortable: true,
      render: (value: string | number) => new Date(value as string).toLocaleDateString('fa-IR')
    },
    {
      key: "status" as const,
      label: "وضعیت",
      sortable: true,
      render: (value: string | number) => getStatusBadge(value as "completed" | "pending" | "cancelled")
    }
  ];

  const getActions = (sale: Sale) => [
    {
      label: "مشاهده",
      icon: <Eye className="w-4 h-4" />,
      onClick: () => onViewDetails(sale)
    },
    {
      label: "ویرایش",
      icon: <Edit className="w-4 h-4" />,
      onClick: () => onEdit(sale)
    },
    {
      label: "حذف",
      icon: <Trash2 className="w-4 h-4" />,
      onClick: () => onDelete(sale)
    }
  ];

  if (sales.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">فروشی یافت نشد</h3>
        <p className="text-gray-500">هیچ فروشی با فیلترهای انتخاب شده مطابقت ندارد.</p>
      </div>
    );
  }

  return (
    <DataTable<Sale>
      data={sales}
      columns={columns}
      title="لیست فروش‌ها"
      searchable={true}
      actions={getActions}
    />
  );
}