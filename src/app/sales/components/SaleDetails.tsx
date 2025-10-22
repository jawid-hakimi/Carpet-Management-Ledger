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
  // اگر saleData ساختار قدیمی دارد، آن را به ساختار جدید تبدیل کنیم
  const normalizedData = saleData.customer ? saleData : {
    customer: {
      name: saleData.customerName,
      phone: saleData.customerPhone,
      address: saleData.customerAddress
    },
    product: saleData.products && saleData.products.length > 0 ? {
      name: saleData.products[0].name,
      category: "قالین",
      price: saleData.products[0].salePrice
    } : { name: "", category: "", price: 0 },
    saleInfo: {
      quantity: saleData.products ? saleData.products.reduce((total: number, p: any) => total + p.quantity, 0) : 0,
      totalPrice: saleData.finalPrice || 0,
      discount: 0,
      finalPrice: saleData.finalPrice || 0,
      paymentMethod: saleData.paymentMethod,
      deliveryMethod: saleData.deliveryMethod,
      saleDate: saleData.saleDate,
      notes: saleData.notes,
      unitPrice: saleData.products && saleData.products.length > 0 ? saleData.products[0].salePrice : 0
    },
    invoiceNumber: saleData.invoiceNumber,
    products: saleData.products || []
  };

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

  const formatPrice = (price: number) => {
    return price.toLocaleString('fa-IR') + " افغانی";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fa-IR');
  };

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
              {normalizedData.customer.address}
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
          {normalizedData.products.map((product: any, index: number) => (
            <div key={product.id || index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900">{product.name}</h4>
                  <p className="text-sm text-gray-600">کد: {product.code}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">اندازه: {product.size}</p>
                  <p className="text-sm text-gray-600">رنگ: {product.color}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">کیفیت: {product.quality}</p>
                  <p className="text-sm text-gray-600">جنس: {product.material}</p>
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
              <span className="font-medium">{normalizedData.saleInfo.paymentMethod}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Truck className="ml-2 w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">نحوه تحویل:</span>
              </div>
              <span className="font-medium">{normalizedData.saleInfo.deliveryMethod}</span>
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
          <p className="text-gray-600">شماره: {normalizedData.invoiceNumber}</p>
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
            {normalizedData.products.map((product: any, index: number) => (
              <tr key={product.id || index}>
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