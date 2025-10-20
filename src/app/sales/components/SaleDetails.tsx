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

interface SaleDetailsProps {
  saleData: any;
}

export function SaleDetails({ saleData }: SaleDetailsProps) {
  const InfoCard = ({ title, children, icon: Icon }: { 
    title: string; 
    children: React.ReactNode;
    icon?: any;
  }) => (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div className="flex items-center mb-3">
        {Icon && <Icon className="ml-2 w-4 h-4 text-gray-500" />}
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      </div>
      <div className="text-gray-900">{children}</div>
    </div>
  );

  const InfoRow = ({ label, value }: { label: string; value: string | number }) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
      <span className="text-sm text-gray-600">{label}:</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );

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
              {saleData.customer.name}
            </div>
          </InfoCard>

          <InfoCard title="شماره تماس" icon={Phone}>
            <div className="text-lg font-medium text-blue-600">
              {saleData.customer.phone}
            </div>
          </InfoCard>

          <InfoCard title="آدرس" icon={MapPin}>
            <div className="text-sm leading-relaxed">
              {saleData.customer.address}
            </div>
          </InfoCard>
        </div>
      </div>

      {/* اطلاعات محصول */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Package className="ml-2 w-5 h-5" />
          اطلاعات محصول
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <InfoCard title="نام محصول" icon={Package}>
            <div className="font-medium">
              {saleData.product.name}
            </div>
          </InfoCard>

          <InfoCard title="دسته‌بندی" icon={Package}>
            <div className="font-medium">
              {saleData.product.category}
            </div>
          </InfoCard>

          <InfoCard title="قیمت واحد" icon={DollarSign}>
            <div className="font-medium text-green-600">
              {saleData.product.price.toLocaleString()} تومان
            </div>
          </InfoCard>

          <InfoCard title="تعداد" icon={Package}>
            <div className="font-medium text-blue-600">
              {saleData.saleInfo.quantity} عدد
            </div>
          </InfoCard>
        </div>
      </div>

      {/* اطلاعات مالی */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <DollarSign className="ml-2 w-5 h-5" />
          اطلاعات مالی
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <InfoCard title="مبلغ کل">
            <div className="text-lg font-bold text-gray-900">
              {saleData.saleInfo.totalPrice.toLocaleString()} تومان
            </div>
          </InfoCard>

          <InfoCard title="تخفیف">
            <div className="text-lg font-bold text-orange-600">
              {saleData.saleInfo.discount.toLocaleString()} تومان
            </div>
          </InfoCard>

          <InfoCard title="مبلغ نهایی">
            <div className="text-lg font-bold text-green-600">
              {saleData.saleInfo.finalPrice.toLocaleString()} تومان
            </div>
          </InfoCard>

          <InfoCard title="تاریخ فروش" icon={Calendar}>
            <div className="font-medium">
              {new Date(saleData.saleInfo.saleDate).toLocaleDateString('fa-IR')}
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
              <span className="font-medium">{saleData.saleInfo.paymentMethod}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Truck className="ml-2 w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">نحوه تحویل:</span>
              </div>
              <span className="font-medium">{saleData.saleInfo.deliveryMethod}</span>
            </div>
          </div>

          {saleData.saleInfo.notes && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-500 mb-2">توضیحات:</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                {saleData.saleInfo.notes}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* خلاصه فاکتور برای چاپ */}
      <div className="bg-white p-6 rounded-lg border-2 border-gray-300 hidden print:block">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold">فاکتور فروش</h2>
          <p className="text-gray-600">شماره: {saleData.invoiceNumber}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <strong>مشتری:</strong> {saleData.customer.name}
          </div>
          <div>
            <strong>تلفن:</strong> {saleData.customer.phone}
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
            <tr>
              <td className="border border-gray-300 p-2">{saleData.product.name}</td>
              <td className="border border-gray-300 p-2 text-center">{saleData.saleInfo.quantity}</td>
              <td className="border border-gray-300 p-2">{saleData.saleInfo.unitPrice.toLocaleString()}</td>
              <td className="border border-gray-300 p-2">{saleData.saleInfo.totalPrice.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
        
        <div className="text-right">
          <p><strong>مبلغ نهایی:</strong> {saleData.saleInfo.finalPrice.toLocaleString()} تومان</p>
        </div>
      </div>
    </div>
  );
}