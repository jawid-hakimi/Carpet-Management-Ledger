// src/app/sales/components/InvoicePreview.tsx
"use client";

import { PrintButton } from "@/components/ui/Button";
import { Download, FileText, User, Package, DollarSign, Calendar, Phone, Mail } from "lucide-react";

interface InvoicePreviewProps {
  saleData: any;
  onNewSale: () => void;
  onBack: () => void;
}

export function InvoicePreview({ saleData, onBack }: InvoicePreviewProps) {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // منطق دانلود فاکتور
    console.log("Downloading invoice...");
  };

  // محاسبات مالی
  const subtotal = saleData.products?.reduce((total: number, product: any) => {
    return total + (product.salePrice * product.quantity);
  }, 0) || 0;

  const tax = subtotal * 0.15; // 15% VAT
  const discount = subtotal * 0.05; // 5% Discount
  const totalDue = subtotal + tax - discount;

  // تابع برای فرمت تاریخ
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fa-IR');
  };

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
            onClick={handleDownload}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            <Download className="ml-1 w-4 h-4" />
            دانلود
          </button>
          <PrintButton onClick={handlePrint} />
        </div>
      </div>

      {/* فاکتور برای چاپ - دقیقاً مشابه عکس */}
      <div className="bg-white border border-gray-300 p-8 max-w-4xl mx-auto font-sans print:border-0 print:shadow-none">
        {/* هدر فاکتور */}
        <div className="flex justify-between items-start mb-8 pb-6 border-b border-gray-300">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">فاکتور</h1>
            <p className="text-lg text-gray-600">{formatDate(saleData.saleDate)}</p>
          </div>
          
          <div className="text-right">
            <h2 className="text-xl font-bold text-gray-800 mb-2">بیزنس</h2>
            <div className="text-gray-600">
              <p className="font-semibold">نام: قالین فروشی امید</p>
              <p>آدرس دفتر: کابل، کارته سخی، بلوار عبدالرحمن خان</p>
              <p>شماره ۰۶/بی</p>
            </div>
          </div>
        </div>

        {/* اطلاعات مشتری */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3">به:</h3>
            <div className="text-gray-600">
              <p className="font-semibold text-lg">{saleData.customerName}</p>
              <p>{saleData.customerAddress || "کابل، دشت برچی، بلوار طلایی"}</p>
              <p>شماره ۰۶/بی</p>
              <p className="flex items-center mt-1">
                <Phone className="w-4 h-4 ml-1" />
                {saleData.customerPhone}
              </p>
            </div>
          </div>
        </div>

        {/* جدول محصولات */}
        <div className="mb-8">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-right py-3 px-4 font-bold text-gray-800">شرح اجناس</th>
                <th className="text-center py-3 px-4 font-bold text-gray-800">قیمت واحد</th>
                <th className="text-center py-3 px-4 font-bold text-gray-800">تعداد</th>
                <th className="text-center py-3 px-4 font-bold text-gray-800">مجموع</th>
              </tr>
            </thead>
            <tbody>
              {saleData.products?.map((product: any, index: number) => (
                <tr key={product.id} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className="py-4 px-4 text-right">
                    <div>
                      <p className="font-semibold text-gray-800">{product.name}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        کد: {product.code} | اندازه: {product.size} | رنگ: {product.color}
                      </p>
                      <p className="text-sm text-gray-600">
                        کیفیت: {product.quality} | جنس: {product.material}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center text-gray-700">
                    {product.salePrice.toLocaleString()} افغانی
                  </td>
                  <td className="py-4 px-4 text-center text-gray-700">
                    {product.quantity}
                  </td>
                  <td className="py-4 px-4 text-center font-semibold text-gray-800">
                    {(product.salePrice * product.quantity).toLocaleString()} افغانی
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* محاسبات قیمت */}
        <div className="flex justify-between mb-8">
          <div className="w-1/2">
            <h4 className="font-bold text-gray-800 mb-3">یادداشت:</h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              {saleData.notes || "قالین‌های فروخته شده با کیفیت درجه یک و گارانتی دو ساله می‌باشد. در صورت وجود هرگونه مشکل در مدت گارانتی، قالین تعویض خواهد شد."}
            </p>
          </div>
          
          <div className="w-1/3">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">مجموع کل:</span>
                <span className="font-semibold">{subtotal.toLocaleString()} افغانی</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">مالیات ۱۵٪:</span>
                <span className="font-semibold">{tax.toLocaleString()} افغانی</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">تخفیف ۵٪:</span>
                <span className="font-semibold text-green-600">{discount.toLocaleString()} افغانی</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-300">
                <span className="text-lg font-bold text-gray-800">مبلغ قابل پرداخت:</span>
                <span className="text-xl font-bold text-gray-800">{totalDue.toLocaleString()} افغانی</span>
              </div>
            </div>
          </div>
        </div>

        {/* فوتر */}
        <div className="border-t border-gray-300 pt-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-lg font-bold text-gray-800 mb-2">تشکر از همکاری شما</p>
              <p className="text-gray-600 mb-4">سوالی دارید؟</p>
              <div className="space-y-1 text-sm text-gray-600">
                <p className="flex items-center">
                  <Mail className="w-4 h-4 ml-1" />
                  برای ما ایمیل بزنید: carpet.omid@email.af
                </p>
                <p className="flex items-center">
                  <Phone className="w-4 h-4 ml-1" />
                  با ما تماس بگیرید: ۰۷۹۳۱۲۳۴۵۶
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-bold text-gray-800 mb-2">معلومات پرداخت:</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p>حساب: ۱۲۳۴۵۶۷۸۹۱۰</p>
                <p>نام بانک: بانک مصالحه</p>
                <p>شعبه: میدان هوایی</p>
              </div>
            </div>
            
            <div className="text-right w-1/3">
              <p className="font-bold text-gray-800 mb-2">شرایط و ضوابط / یادداشت:</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                تمام قالین‌های فروخته شده دارای گارانتی دو ساله می‌باشد. 
                برگشت کالا فقط در صورت وجود مشکل فنی در مدت یک هفته امکان‌پذیر است.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* استایل برای چاپ */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print\:border-0,
          .print\:border-0 * {
            visibility: visible;
          }
          .print\:border-0 {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            max-width: 100%;
            border: none !important;
            box-shadow: none !important;
          }
          button {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}