// src/app/products/page.tsx
"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { Eye, Edit, Trash2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { AddButton } from "@/components/ui/Button";

// داده‌های نمونه
const mockProducts = [
  {
    id: "1",
    name: "قالین کاشان دست‌باف",
    code: "CAR001",
    type: "handmade",
    size: "3x4",
    quality: "premium",
    purchasePrice: 15000,
    salePrice: 22000,
    stock: 5,
    status: "available",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "قالین تبریز ماشینی",
    code: "CAR002",
    type: "machine",
    size: "4x6",
    quality: "standard",
    purchasePrice: 8000,
    salePrice: 12000,
    stock: 12,
    status: "available",
    createdAt: "2024-01-20",
  },
  {
    id: "3",
    name: "گبه اصیل قشقایی",
    code: "CAR003",
    type: "gabbeh",
    size: "2x3",
    quality: "luxury",
    purchasePrice: 25000,
    salePrice: 35000,
    stock: 0,
    status: "out_of_stock",
    createdAt: "2024-01-10",
  },
];

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState(mockProducts);

  const handleView = (product: any) => {
    console.log("View product:", product);
    router.push(`/products/${product.id}/details`);
  };

  const handleEdit = (product: any) => {
    console.log("Edit product:", product);
    router.push(`/products/${product.id}/edit`);
  };

  const handleDelete = (product: any) => {
    if (confirm(`آیا از حذف محصول "${product.name}" مطمئن هستید؟`)) {
      setProducts(prev => prev.filter(p => p.id !== product.id));
      console.log("Delete product:", product);
    }
  };

  const handleAddProduct = () => {
    router.push("/products/add");
  };

  const columns = [
    {
      key: "name",
      label: "نام محصول",
      sortable: true,
      render: (value: string, row: any) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">ق</span>
          </div>
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-xs text-gray-500">کد: {row.code}</div>
          </div>
        </div>
      )
    },
    {
      key: "type",
      label: "نوع",
      sortable: true,
      render: (value: string) => {
        const typeConfig = {
          handmade: { color: "bg-blue-100 text-blue-800", label: "دست‌باف" },
          machine: { color: "bg-green-100 text-green-800", label: "ماشینی" },
          kilim: { color: "bg-purple-100 text-purple-800", label: "کلیم" },
          gabbeh: { color: "bg-amber-100 text-amber-800", label: "گبه" }
        };

        const config = typeConfig[value as keyof typeof typeConfig];
        return (
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
            {config.label}
          </span>
        );
      }
    },
    {
      key: "size",
      label: "سایز",
      sortable: true,
      render: (value: string) => (
        <span className="font-medium">{value} متر</span>
      )
    },
    {
      key: "purchasePrice",
      label: "قیمت خرید",
      sortable: true,
      render: (value: number) => (
        <span className="font-medium text-gray-900">
          {value.toLocaleString()} افغانی
        </span>
      )
    },
    {
      key: "stock",
      label: "موجودی",
      sortable: true,
      render: (value: number, row: any) => {
        const isOutOfStock = value === 0;
        const isLowStock = value > 0 && value < 5;

        return (
          <div className="flex flex-col">
            <span className={`font-medium ${isOutOfStock ? "text-red-600" :
                isLowStock ? "text-amber-600" : "text-green-600"
              }`}>
              {value} عدد
            </span>
            {isLowStock && (
              <span className="text-xs text-amber-500">موجودی کم</span>
            )}
            {isOutOfStock && (
              <span className="text-xs text-red-500">ناموجود</span>
            )}
          </div>
        );
      }
    },
    {
      key: "status",
      label: "وضعیت",
      sortable: true,
      render: (value: string) => {
        const statusConfig = {
          available: { color: "bg-green-100 text-green-800", label: "موجود" },
          out_of_stock: { color: "bg-red-100 text-red-800", label: "ناموجود" },
          discontinued: { color: "bg-gray-100 text-gray-800", label: "متوقف شده" }
        };

        const config = statusConfig[value as keyof typeof statusConfig];
        return (
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
            {config.label}
          </span>
        );
      }
    }
  ];

  const actions = (product: any) => [
    {
      label: "مشاهده",
      icon: <Eye size={16} />,
      onClick: () => handleView(product)
    },
    {
      label: "ویرایش",
      icon: <Edit size={16} />,
      onClick: () => handleEdit(product)
    },
    {
      label: "حذف",
      icon: <Trash2 size={16} />,
      onClick: () => handleDelete(product)
    }
  ];

  return (
    <div className="w-full">
      <PageHeader
        title="مدیریت محصولات"
        description="لیست تمام قالین‌های موجود در سیستم"
        showHomeIcon={true}
        backUrl="/dashboard"
      />

      <div className="mb-6 flex justify-end">
        <AddButton
          size="md"
          onClick={handleAddProduct}
        >

          افزودن محصول جدید
        </AddButton>
      </div>

      <DataTable
        data={products}
        columns={columns}
        title="لیست محصولات"
        searchable={true}
        actions={actions}
        onRowClick={handleView}
      />
    </div>
  );
}