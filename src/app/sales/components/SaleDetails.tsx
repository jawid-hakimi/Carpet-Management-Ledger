// src/components/sales/SaleDetails.tsx
"use client";

import {
  User,
  Phone,
  MapPin,
  Package,
  DollarSign,
  Calendar,
  CreditCard,
  Truck,
  FileText
} from "lucide-react";
import { SaleDataType, ProductItemType, LegacySaleData, SaleData } from "@/types/sales/sales";

interface SaleDetailsProps {
  saleData: SaleData;
}

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
}

// تابع helper برای نرمالایز کردن داده‌ها
const normalizeSaleData = (saleData: SaleData): SaleDataType => {
  // اگر داده از نوع SaleDataType باشد (دارای customer object)
  if ('customer' in saleData && saleData.customer) {
    return saleData as SaleDataType;
  }

  // اگر داده از نوع قدیمی باشد
  const legacyData = saleData as unknown as LegacySaleData;
  return {
    customer: {
      name: legacyData.customerName,
      phone: legacyData.customerPhone,
      address: legacyData.customerAddress || ""
    },
    products: legacyData.products || [],
    saleInfo: {
      quantity: legacyData.products?.reduce((total: number, product: ProductItemType) => total + product.quantity, 0) || 0,
      totalPrice: legacyData.finalPrice || 0,
      discount: 0,
      finalPrice: legacyData.finalPrice || 0,
      paymentMethod: legacyData.paymentMethod || "",
      deliveryMethod: legacyData.deliveryMethod || "",
      saleDate: legacyData.saleDate,
      notes: legacyData.notes || "",
      unitPrice: legacyData.products && legacyData.products.length > 0 ? legacyData.products[0].salePrice : 0
    },
    invoiceNumber: legacyData.invoiceNumber
  };
};

const InfoCard = ({ title, children, icon: Icon }: InfoCardProps) => (
  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
    <div className="flex items-center mb-3">
      {Icon && <Icon className="ml-2 w-4 h-4 text-gray-500" />}
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    </div>
    <div className="text-gray-900">{children}</div>
  </div>
);

const formatPrice = (price: number): string => {
  return price.toLocaleString('fa-IR') + " افغانی";
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fa-IR');
};

export function SaleDetails({ saleData }: SaleDetailsProps) {
  const normalizedData = normalizeSaleData(saleData);

  return (
    <div className="space-y-6">
      {/* اطلاعات مشتری */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <User className="ml-2 w-5 h-5" />
          اطلاعات مشتری
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InfoCard title="نام مشتری" icon={User}>
            <div className="text-lg font-medium">
              {normalizedData.customer.name}
            </div>
          </InfoCard>

          <InfoCard title="شماره تماس" icon={Phone}>
            <div className="text-lg font-medium text-blue-600">
              {normalizedData.customer.phone}
            </div>
          </InfoCard>

          <InfoCard title="آدرس" icon={MapPin}>
            <div className="text-sm leading-relaxed">
              {normalizedData.customer.address || "آدرس ثبت نشده"}
            </div>
          </InfoCard>
        </div>
      </div>

      {/* اطلاعات محصولات */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Package className="ml-2 w-5 h-5" />
          اطلاعات محصولات ({normalizedData.products.length} محصول)
        </h3>

        <div className="space-y-4">
          {normalizedData.products.map((product, index) => (
            <div key={product.id || `product-${index}`} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900">{product.name}</h4>
                  <p className="text-sm text-gray-600">کد: {product.code || "ندارد"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">اندازه: {product.size || "ندارد"}</p>
                  <p className="text-sm text-gray-600">رنگ: {product.color || "ندارد"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">کیفیت: {product.quality || "ندارد"}</p>
                  <p className="text-sm text-gray-600">جنس: {product.material || "ندارد"}</p>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium">تعداد: {product.quantity}</p>
                  <p className="text-sm font-medium text-green-600">
                    قیمت: {formatPrice(product.salePrice)}
                  </p>
                  <p className="text-sm font-bold">
                    جمع: {formatPrice(product.salePrice * product.quantity)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* اطلاعات مالی */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <DollarSign className="ml-2 w-5 h-5" />
          اطلاعات مالی
        </h3>

        <div className="grid grid-cols-3 gap-4">
          <InfoCard title="تعداد کل محصولات">
            <div className="text-lg font-bold text-gray-900">
              {normalizedData.saleInfo.quantity} عدد
            </div>
          </InfoCard>

          <InfoCard title="مبلغ نهایی">
            <div className="text-lg font-bold text-green-600">
              {formatPrice(normalizedData.saleInfo.finalPrice)}
            </div>
          </InfoCard>

          <InfoCard title="تاریخ فروش" icon={Calendar}>
            <div className="font-medium">
              {formatDate(normalizedData.saleInfo.saleDate)}
            </div>
          </InfoCard>
        </div>
      </div>

      {/* اطلاعات تکمیلی */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FileText className="ml-2 w-5 h-5" />
          اطلاعات تکمیلی
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <CreditCard className="ml-2 w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">نحوه پرداخت:</span>
              </div>
              <span className="font-medium">{normalizedData.saleInfo.paymentMethod || "ثبت نشده"}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Truck className="ml-2 w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">نحوه تحویل:</span>
              </div>
              <span className="font-medium">{normalizedData.saleInfo.deliveryMethod || "ثبت نشده"}</span>
            </div>
          </div>

          {normalizedData.saleInfo.notes && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-500 mb-2">توضیحات:</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                {normalizedData.saleInfo.notes}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* خلاصه بل برای چاپ */}
      <div className="bg-white p-6 rounded-lg border-2 border-gray-300 hidden print:block">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold">بل فروش</h2>
          <p className="text-gray-600">شماره: {normalizedData.invoiceNumber || "ندارد"}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <strong>مشتری:</strong> {normalizedData.customer.name}
          </div>
          <div>
            <strong>تلفن:</strong> {normalizedData.customer.phone}
          </div>
        </div>

        <table className="w-full border-collapse border border-gray-300 mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">محصول</th>
              <th className="border border-gray-300 p-2">تعداد</th>
              <th className="border border-gray-300 p-2">قیمت</th>
              <th className="border border-gray-300 p-2">کل</th>
            </tr>
          </thead>
          <tbody>
            {normalizedData.products.map((product, index) => (
              <tr key={product.id || `print-${index}`}>
                <td className="border border-gray-300 p-2">{product.name}</td>
                <td className="border border-gray-300 p-2 text-center">{product.quantity}</td>
                <td className="border border-gray-300 p-2">{formatPrice(product.salePrice)}</td>
                <td className="border border-gray-300 p-2">{formatPrice(product.salePrice * product.quantity)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-right">
          <p><strong>مبلغ نهایی:</strong> {formatPrice(normalizedData.saleInfo.finalPrice)}</p>
        </div>
      </div>
    </div>
  );
}