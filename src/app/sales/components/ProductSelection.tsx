// src/components/sales/ProductSelection.tsx
"use client";

import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { Package, DollarSign } from "lucide-react";

const mockProducts = [
  { id: "1", name: "قالین دستباف اصفهان 6 متری", price: 25000000, stock: 5 },
  { id: "2", name: "قالین ماشینی تبریز 9 متری", price: 8000000, stock: 12 },
  { id: "3", name: "فرش ترکمنی 3 متری", price: 12000000, stock: 3 },
  { id: "4", name: "قالین کردستانی 4 متری", price: 15000000, stock: 7 },
];

interface ProductSelectionProps {
  selectedProduct: any;
  onProductChange: (product: any) => void;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export function ProductSelection({
  selectedProduct,
  onProductChange,
  quantity,
  onQuantityChange
}: ProductSelectionProps) {

  const handleProductSelect = (productId: string) => {
    const product = mockProducts.find(p => p.id === productId);
    onProductChange(product);
  };

  const InfoCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
      <div className="text-gray-900">{children}</div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Package className="ml-2 w-5 h-5" />
        انتخاب محصول
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="محصول"
          options={mockProducts.map(p => ({
            value: p.id,
            label: `${p.name} (موجودی: ${p.stock})`
          }))}
          value={selectedProduct?.id || ""}
          onChange={handleProductSelect}
          placeholder="انتخاب محصول"
          searchable
          clearable
          required
        />
        <div className="mt-1">
          <Input
            label="تعداد"
            type="number"
            value={quantity}
            onChange={(e) => onQuantityChange(parseInt(e.target.value))}
            min="1"
            max={selectedProduct?.stock}
            required
          />
        </div>

        {selectedProduct && (
          <>
            <InfoCard title="قیمت واحد">
              <div className="flex items-center">
                <DollarSign className="ml-2 w-4 h-4 text-green-600" />
                {selectedProduct.price.toLocaleString()} تومان
              </div>
            </InfoCard>

            <InfoCard title="موجودی">
              <div className="flex items-center">
                <Package className="ml-2 w-4 h-4 text-blue-600" />
                {selectedProduct.stock} عدد
              </div>
            </InfoCard>
          </>
        )}
      </div>
    </div>
  );
}