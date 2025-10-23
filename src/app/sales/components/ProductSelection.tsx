// src/components/sales/ProductSelection.tsx
"use client";

import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { Package, DollarSign, Ruler, Palette, Layers, Hash, Trash2 } from "lucide-react";
import { useState } from "react";
import { AddButton } from "@/components/ui/Button";

const mockProducts = [
  {
    id: "1",
    name: "قالین هراتی دست‌باف",
    purchasePrice: 18000000,
    stock: 4,
    size: "۳×۴ متر",
    color: "سرخ و کرم",
    quality: "عالی",
    material: "پشم طبیعی و پنبه",
    code: "AFG001"
  },
  {
    id: "2",
    name: "قالین بلخی",
    purchasePrice: 9500000,
    stock: 8,
    size: "۲×۳ متر",
    color: "زرد و آبی",
    quality: "خوب",
    material: "پشم خالص",
    code: "AFG002"
  },
  {
    id: "3",
    name: "قالین ترکمنی",
    purchasePrice: 12500000,
    stock: 5,
    size: "۳×۵ متر",
    color: "سرخ تیره با طرح سنتی",
    quality: "عالی",
    material: "پشم و رنگ طبیعی",
    code: "AFG003"
  },
  {
    id: "4",
    name: "قالین قندهاری",
    purchasePrice: 11000000,
    stock: 6,
    size: "۲.۵×۳.۵ متر",
    color: "عنابی و مشکی",
    quality: "درجه یک",
    material: "پشم گوسفند",
    code: "AFG004"
  },
  {
    id: "5",
    name: "قالین مزاری",
    purchasePrice: 10000000,
    stock: 3,
    size: "۲×۲.۵ متر",
    color: "آبی لاجوردی و سفید",
    quality: "خوب",
    material: "پشم نرم",
    code: "AFG005"
  },
];

interface SaleProduct {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  salePrice: number;
  purchasePrice: number;
  stock: number;
  size: string;
  color: string;
  quality: string;
  material: string;
  code: string;
}

interface ProductSelectionProps {
  saleProducts: SaleProduct[];
  onSaleProductsChange: (products: SaleProduct[]) => void;
}

export function ProductSelection({
  saleProducts,
  onSaleProductsChange
}: ProductSelectionProps) {
  const [selectedProduct, setSelectedProduct] = useState<typeof mockProducts[number] | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [salePrice, setSalePrice] = useState<number>(0);

  const handleProductSelect = (productId: string) => {
    const product = mockProducts.find(p => p.id === productId) || null;
    setSelectedProduct(product);
    setSalePrice(0);
    setQuantity(1);
  };


  const handleQuantityChange = (value: string) => {
    const numValue = parseInt(value) || 0;
    setQuantity(numValue);
  };

  const handleSalePriceChange = (value: string) => {
    const numValue = parseInt(value) || 0;
    setSalePrice(numValue);
  };

  const handleAddProduct = () => {
    if (!selectedProduct || quantity <= 0 || salePrice <= 0) {
      alert("لطفاً تمام فیلدها را به درستی پر کنید");
      return;
    }

    // بررسی موجودی کافی
    if (quantity > selectedProduct.stock) {
      alert(`موجودی کافی نیست! فقط ${selectedProduct.stock} عدد موجود است.`);
      return;
    }

    // بررسی تکراری نبودن محصول
    const existingProductIndex = saleProducts.findIndex(
      p => p.productId === selectedProduct.id
    );

    if (existingProductIndex >= 0) {
      // اگر محصول قبلاً اضافه شده، تعداد را آپدیت کن
      const updatedProducts = [...saleProducts];
      updatedProducts[existingProductIndex].quantity += quantity;
      updatedProducts[existingProductIndex].salePrice = salePrice;
      onSaleProductsChange(updatedProducts);
    } else {
      // محصول جدید
      const newSaleProduct: SaleProduct = {
        id: Date.now().toString(),
        productId: selectedProduct.id,
        name: selectedProduct.name,
        quantity: quantity,
        salePrice: salePrice,
        purchasePrice: selectedProduct.purchasePrice,
        stock: selectedProduct.stock,
        size: selectedProduct.size,
        color: selectedProduct.color,
        quality: selectedProduct.quality,
        material: selectedProduct.material,
        code: selectedProduct.code
      };

      onSaleProductsChange([...saleProducts, newSaleProduct]);
    }

    // ریست فیلدها
    setSelectedProduct(null);
    setQuantity(1);
    setSalePrice(0);
  };

  const handleRemoveProduct = (productId: string) => {
    const updatedProducts = saleProducts.filter(p => p.id !== productId);
    onSaleProductsChange(updatedProducts);
  };

  const InfoCard = ({ title, children, icon }: { title: string; children: React.ReactNode; icon?: React.ReactNode }) => (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
        {icon}
        {title}
      </h3>
      <div className="text-gray-900">{children}</div>
    </div>
  );

  const calculateTotal = () => {
    return saleProducts.reduce((total, product) => {
      return total + (product.salePrice * product.quantity);
    }, 0);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center">
        <Package className="ml-2 w-5 h-5" />
        انتخاب جنس‌ها برای فروش
      </h3>

      {/* سه فیلد اصلی برای اضافه کردن محصول */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Select
          label="جنس"
          options={mockProducts.map(p => ({
            value: p.id,
            label: `${p.name} (موجودی: ${p.stock})`
          }))}
          value={selectedProduct?.id || ""}
          onChange={handleProductSelect}
          placeholder="محصول را انتخاب کنید"
          searchable
          clearable
          required
        />

        <Input
          label="تعداد"
          type="number"
          value={quantity}
          onChange={(e) => handleQuantityChange(e.target.value)}
          min="1"
          max={selectedProduct?.stock?.toString()}
          required
          disabled={!selectedProduct}
        />

        <Input
          label="قیمت فروش"
          type="number"
          value={salePrice}
          onChange={(e) => handleSalePriceChange(e.target.value)}
          min="1"
          required
          placeholder="قیمت فروش را وارد کنید"
          icon={<DollarSign className="w-4 h-4" />}
          disabled={!selectedProduct}
        />

        <div className="flex items-end">
          <AddButton
            type="button"
            onClick={handleAddProduct}
            disabled={!selectedProduct || quantity <= 0 || salePrice <= 0}
          >
            اضافه کردن
          </AddButton>
        </div>
      </div>

      {/* لیست محصولات اضافه شده */}
      {saleProducts.length > 0 && (
        <div className="border-t pt-6 mb-6">
          <h4 className="text-base font-semibold text-gray-900 mb-4">جنس‌های انتخاب شده برای فروش:</h4>
          <div className="space-y-3">
            {saleProducts.map((product) => (
              <div key={product.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900">{product.name}</h5>
                      <button
                        type="button"
                        onClick={() => handleRemoveProduct(product.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">تعداد:</span>{" "}
                        <span className="font-medium">{product.quantity} عدد</span>
                      </div>
                      <div>
                        <span className="text-gray-500">قیمت فروش:</span>{" "}
                        <span className="font-medium">{product.salePrice.toLocaleString()} افغانی</span>
                      </div>
                      <div>
                        <span className="text-gray-500">مجموع:</span>{" "}
                        <span className="font-medium text-green-600">
                          {(product.salePrice * product.quantity).toLocaleString()} افغانی
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">کد:</span>{" "}
                        <span className="font-medium">{product.code}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* جمع کل بل */}
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex justify-between items-center">
              <span className="text-base font-semibold text-blue-900">مجموع کل اجناس:</span>
              <span className="text-base font-bold text-blue-900">
                {calculateTotal().toLocaleString()} افغانی
              </span>
            </div>
          </div>
        </div>
      )}

      {/* مشخصات محصول انتخاب شده */}
      {selectedProduct && (
        <div className="border-t pt-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4">مشخصات محصول انتخاب شده:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <InfoCard title="قیمت خرید" icon={<DollarSign className="ml-2 w-4 h-4 text-blue-600" />}>
              <div className="flex items-center text-blue-600 font-medium">
                {selectedProduct.purchasePrice.toLocaleString()} افغانی
              </div>
            </InfoCard>

            <InfoCard title="موجودی" icon={<Package className="ml-2 w-4 h-4 text-green-600" />}>
              <div className="flex items-center">
                {selectedProduct.stock} عدد
              </div>
            </InfoCard>

            <InfoCard title="کد محصول" icon={<Hash className="ml-2 w-4 h-4 text-gray-600" />}>
              <div className="flex items-center">
                {selectedProduct.code}
              </div>
            </InfoCard>

            <InfoCard title="اندازه" icon={<Ruler className="ml-2 w-4 h-4 text-orange-600" />}>
              <div className="flex items-center">
                {selectedProduct.size}
              </div>
            </InfoCard>

            <InfoCard title="رنگ" icon={<Palette className="ml-2 w-4 h-4 text-purple-600" />}>
              <div className="flex items-center">
                {selectedProduct.color}
              </div>
            </InfoCard>

            <InfoCard title="کیفیت" icon={<Layers className="ml-2 w-4 h-4 text-red-600" />}>
              <div className="flex items-center">
                {selectedProduct.quality}
              </div>
            </InfoCard>

            <InfoCard title="جنس" icon={<Package className="ml-2 w-4 h-4 text-gray-600" />}>
              <div className="flex items-center">
                {selectedProduct.material}
              </div>
            </InfoCard>
          </div>
        </div>
      )}

      {/* پیام راهنما */}
      {!selectedProduct && saleProducts.length === 0 && (
        <div className="text-center py-8 text-gray-500 rounded-lg border border-gray-300">
          <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>لطفاً یک محصول از لیست انتخاب کنید</p>
        </div>
      )}
    </div>
  );
}