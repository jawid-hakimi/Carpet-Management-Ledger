// src/app/products/add/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { DollarSign, Ruler, Package, Hash } from "lucide-react";

const carpetTypes = [
  { value: "handmade", label: "دست‌باف" },
  { value: "machine", label: "ماشینی" },
  { value: "kilim", label: "کلیم" },
  { value: "gabbeh", label: "گبه" },
];

const carpetSizes = [
  { value: "1x1.5", label: "۱×۱.۵ متر" },
  { value: "2x3", label: "۲×۳ متر" },
  { value: "3x4", label: "۳×۴ متر" },
  { value: "4x6", label: "۴×۶ متر" },
  { value: "6x9", label: "۶×۹ متر" },
  { value: "custom", label: "سایز سفارشی" },
];

const qualityLevels = [
  { value: "economy", label: "اقتصادی" },
  { value: "standard", label: "استاندارد" },
  { value: "premium", label: "پریمیوم" },
  { value: "luxury", label: "لوکس" },
];

export default function AddProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    type: "",
    size: "",
    quality: "",
    purchasePrice: "",
    salePrice: "",
    stock: "",
    description: "",
  });
  const [images, setImages] = useState<File[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageSelect = (file: File | null) => {
    if (file) {
      setImages(prev => [...prev, file]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      ...formData,
      images,
      purchasePrice: Number(formData.purchasePrice),
      salePrice: Number(formData.salePrice),
      stock: Number(formData.stock),
    };
    
    console.log("Product Data:", productData);
    alert("محصول با موفقیت اضافه شد!");
    router.push("/products");
  };

  return (
    <div className="w-full">
      <PageHeader
        title="اضافه کردن محصول جدید"
        description="اطلاعات قالین جدید را وارد کنید"
        backUrl="/products"
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* بخش اطلاعات اصلی */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">اطلاعات اصلی</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="نام محصول"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="نام قالین"
              required
            />
            
            <Input
              label="کد محصول"
              value={formData.code}
              onChange={(e) => handleInputChange("code", e.target.value)}
              placeholder="کد یکتا"
              icon={<Hash size={16} />}
              required
            />

            <Select
              options={carpetTypes}
              value={formData.type}
              onChange={(value) => handleInputChange("type", value)}
              placeholder="نوع قالین"
            />

            <Select
              options={carpetSizes}
              value={formData.size}
              onChange={(value) => handleInputChange("size", value)}
              placeholder="سایز قالین"
            />

            <Select
              options={qualityLevels}
              value={formData.quality}
              onChange={(value) => handleInputChange("quality", value)}
              placeholder="کیفیت"
            />

            <Input
              label="تعداد موجودی"
              type="number"
              value={formData.stock}
              onChange={(e) => handleInputChange("stock", e.target.value)}
              placeholder="0"
              icon={<Package size={16} />}
              required
            />
          </div>
        </div>

        {/* بخش قیمت‌ها */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">قیمت‌گذاری</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="قیمت خرید (افغانی)"
              type="number"
              value={formData.purchasePrice}
              onChange={(e) => handleInputChange("purchasePrice", e.target.value)}
              placeholder="قیمت خرید"
              icon={<DollarSign size={16} />}
              required
            />

            <Input
              label="قیمت فروش (افغانی)"
              type="number"
              value={formData.salePrice}
              onChange={(e) => handleInputChange("salePrice", e.target.value)}
              placeholder="قیمت فروش"
              icon={<DollarSign size={16} />}
              required
            />
          </div>
        </div>

        {/* بخش تصاویر */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">تصاویر محصول</h3>
          <div className="space-y-4">
            <ImageUpload
              onImageSelect={handleImageSelect}
              label="عکس قالین را انتخاب کنید"
              maxSize={5}
            />
            
            {/* نمایش تصاویر انتخاب شده */}
            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Hash size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* بخش توضیحات */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">توضیحات</h3>
          <Textarea
            value={formData.description}
            onChange={(value) => handleInputChange("description", value)}
            placeholder="توضیحات کامل درباره قالین (جنس، رنگ، طرح، ویژگی‌های خاص و ...)"
            rows={6}
          />
        </div>

        {/* دکمه‌های اقدام */}
        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            انصراف
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
          >
            ذخیره محصول
          </button>
        </div>
      </form>
    </div>
  );
}