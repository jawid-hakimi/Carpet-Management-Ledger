// src/app/sales/components/InvoicePreview.tsx
"use client";

import { PrintButton } from "@/components/ui/Button";
import { Download, FileText, User, Package, DollarSign, Calendar } from "lucide-react";

interface InvoicePreviewProps {
  saleData: any;
  onNewSale: () => void;
  onBack: () => void;
}

export function InvoicePreview({ saleData, onNewSale, onBack }: InvoicePreviewProps) {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // منطق دانلود فاکتور
    console.log("Downloading invoice...");
  };

  // اصلاح تایپ برای پشتیبانی از React Element
  const InfoRow = ({ label, value }: { label: string; value: string | React.ReactNode }) => (
    <div className="flex justify-between py-2 border-b border-gray-200">
      <span className="text-gray-600">{label}:</span>
      <span className="font-medium">{value}</span>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center">
          <FileText className="ml-2 w-6 h-6" />
          پیش‌نمایش فاکتور
        </h2>
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            بازگشت به ویرایش
          </button>
          <button
            onClick={onNewSale}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            فروش جدید
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            <Download className="ml-1 w-4 h-4" />
            دانلود
          </button>
          <PrintButton onClick={handlePrint} />
        </div>
      </div>

      {/* فاکتور برای چاپ */}
      <div className="bg-white p-8 rounded-lg border-2 border-gray-300 print:border-0 print:shadow-none">
        <div className="text-center mb-8 border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-900">فاکتور فروش</h1>
          <p className="text-gray-600 mt-2">فروشگاه قالین امین</p>
          <p className="text-gray-500">تهران، خیابان جمهوری - تلفن: 021-12345678</p>
          <p className="text-gray-500 mt-2">شماره فاکتور: {saleData.invoiceNumber}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3 flex items-center">
              <User className="ml-2 w-4 h-4" />
              اطلاعات فروشگاه:
            </h3>
            <InfoRow label="نام فروشگاه" value="فروشگاه قالین امین" />
            <InfoRow label="آدرس" value="تهران، خیابان جمهوری" />
            <InfoRow label="تلفن" value="021-12345678" />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3 flex items-center">
              <User className="ml-2 w-4 h-4" />
              اطلاعات مشتری:
            </h3>
            <InfoRow label="نام" value={saleData.customerName} />
            <InfoRow label="تلفن" value={saleData.customerPhone} />
            <InfoRow label="آدرس" value={saleData.customerAddress} />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-3 flex items-center">
            <Package className="ml-2 w-4 h-4" />
            اطلاعات کالا:
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-4 gap-4 text-center font-medium border-b pb-2 mb-2">
              <div>نام کالا</div>
              <div>تعداد</div>
              <div>قیمت واحد</div>
              <div>مبلغ کل</div>
            </div>
            <div className="grid grid-cols-4 gap-4 text-center py-2">
              <div>{saleData.product?.name}</div>
              <div>{saleData.quantity}</div>
              <div>{saleData.unitPrice.toLocaleString()} تومان</div>
              <div>{saleData.totalPrice.toLocaleString()} تومان</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3 flex items-center">
              <DollarSign className="ml-2 w-4 h-4" />
              اطلاعات مالی:
            </h3>
            <InfoRow label="مبلغ کل" value={`${saleData.totalPrice.toLocaleString()} تومان`} />
            <InfoRow label="تخفیف" value={`${saleData.discount.toLocaleString()} تومان`} />
            <InfoRow 
              label="مبلغ قابل پرداخت" 
              value={
                <span className="text-green-600 font-bold">
                  {saleData.finalPrice.toLocaleString()} تومان
                </span>
              } 
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3 flex items-center">
              <Calendar className="ml-2 w-4 h-4" />
              اطلاعات تکمیلی:
            </h3>
            <InfoRow label="نحوه پرداخت" value={
              saleData.paymentMethod === 'cash' ? 'نقدی' :
              saleData.paymentMethod === 'card' ? 'کارت به کارت' :
              saleData.paymentMethod === 'check' ? 'چک' : 'اقساط'
            } />
            <InfoRow label="نحوه تحویل" value={
              saleData.deliveryMethod === 'pickup' ? 'تحویل در فروشگاه' : 'ارسال به آدرس'
            } />
            <InfoRow label="تاریخ فروش" value={
              new Date(saleData.saleDate).toLocaleDateString('fa-IR')
            } />
          </div>
        </div>

        {saleData.notes && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-2">توضیحات:</h3>
            <p className="text-gray-700">{saleData.notes}</p>
          </div>
        )}

        <div className="text-center mt-8 pt-4 border-t border-gray-300">
          <p className="text-gray-600 mb-4">با تشکر از خرید شما</p>
          <div className="flex justify-center gap-8">
            <div className="text-center">
              <p className="text-gray-500 text-sm">امضای فروشنده</p>
              <div className="mt-2 border-t border-gray-400 w-32 mx-auto"></div>
            </div>
            <div className="text-center">
              <p className="text-gray-500 text-sm">مهر و امضای فروشگاه</p>
              <div className="mt-2 border-t border-gray-400 w-32 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}