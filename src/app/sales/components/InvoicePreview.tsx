// src/app/sales/components/InvoicePreview.tsx
"use client";

import { PrevButton, PrintButton } from "@/components/ui/Button";
import { Download, FileText, Building2, MapPin, Phone, Mail, User, CalendarDays } from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "@/styles/InvoicePrintStyles.css";
import { SaleDataType, ProductItemType } from "@/types/sales/sales";

interface InvoicePreviewProps {
  saleData: SaleDataType;
  onBack: () => void;
}


export function InvoicePreview({ saleData, onBack }: InvoicePreviewProps) {
  const handlePrint = () => {
    window.print();
  };

  // محاسبات مالی
  const subtotal = saleData.products?.reduce((total: number, product: ProductItemType) => {
    return total + (product.salePrice * product.quantity);
  }, 0) || 0;

  // تابع برای فرمت تاریخ
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fa-IR');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center no-print">
        <h2 className="text-xl font-semibold flex items-center">
          <FileText className="ml-2 w-6 h-6" />
          پیش‌نمایش بل
        </h2>
        <div className="flex gap-3">
          <PrevButton
            onClick={onBack}
          >
            بازگشت به ویرایش
          </PrevButton>
          <PrintButton
            onClick={handlePrint}
          >
            چاپ بل
          </PrintButton>
        </div>
      </div>

      {/* بل برای چاپ و دانلود */}
      <div id="invoice-to-download" className="bg-white border border-gray-300 p-6 max-w-2xl mx-auto font-sans print:border-0 print:shadow-none print:max-w-none print:m-0 print:p-3 min-h-screen flex flex-col print:bg-white print:text-xs">
        {/* هدر بل */}
        <div className="flex justify-between items-start mb-3 border-b border-gray-300 pb-2">
          <div>
            <img src="/images/logo/carpet-logo.png" alt="لگوی شرکت" className="w-12 h-12 object-contain print:w-10 print:h-10" />
            <div className="flex items-center gap-4 bg-teal-50 border border-teal-200 rounded-md px-3 py-1 w-fit shadow-sm print:shadow-none print:bg-teal-50 print:border-teal-200 mt-2">
              <div className="flex items-center gap-1 text-teal-800">
                <FileText className="w-3 h-3" />
                <span className="text-xs font-semibold">شماره:</span>
                <span className="text-xs">{saleData.invoiceNumber || "بل-01"}</span>
              </div>

              <div className="flex items-center gap-1 text-teal-800">
                <CalendarDays className="w-3 h-3" />
                <span className="text-xs font-semibold">تاریخ:</span>
                {saleData.saleInfo?.saleDate ? formatDate(saleData.saleInfo.saleDate) : "نامشخص"}
              </div>
            </div>
          </div>

          <div className="text-teal-900 text-xs space-y-1">
            <div className="flex items-center gap-1">
              <Building2 className="w-3 h-3 text-teal-700" />
              <p className="font-semibold">قالین فروشی امید</p>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-teal-700" />
              <p>کابل، کارته سخی، شهرک عبدالرحمن خان</p>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-teal-700" />
              <p>079091929394</p>
            </div>
          </div>
        </div>

        {/* اطلاعات مشتری */}
        <div className="space-y-2 py-2 my-2">
          <h2 className="text-xs font-semibold text-teal-800">اطلاعات خریدار</h2>

          <div className="text-gray-700 w-full grid grid-cols-1 md:grid-cols-3 gap-3 text-xs print:grid-cols-3">
            <div className="flex items-center">
              <User className="w-3 h-3 ml-1 text-teal-700 flex-shrink-0" />
              <span className="font-semibold ml-1 whitespace-nowrap">نام:</span>
              <span className="mr-1 whitespace-nowrap overflow-hidden text-ellipsis">{saleData.customer?.name}</span>
            </div>

            <div className="flex items-center">
              <Phone className="w-3 h-3 ml-1 text-teal-700 flex-shrink-0" />
              <span className="font-semibold whitespace-nowrap ml-1">شماره تماس:</span>
              <span className="mr-1 whitespace-nowrap font-medium">{saleData.customer?.phone}</span>
            </div>

            <div className="flex items-center">
              <MapPin className="w-3 h-3 ml-1 text-teal-700 flex-shrink-0" />
              <span className="font-semibold ml-1 whitespace-nowrap">آدرس:</span>
              <span className="mr-1 overflow-hidden text-ellipsis">{saleData.customer?.address || "کابل، دشت برچی، بلوار طلایی"}</span>
            </div>
          </div>
        </div>

        {/* جدول محصولات */}
        <div className="mb-6 flex-1">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-teal-500 text-xs print:bg-teal-500">
                <th className="text-right py-2 px-2 font-bold text-white border border-teal-600">شرح اجناس</th>
                <th className="text-center py-2 px-2 font-bold text-white border border-teal-600">قیمت</th>
                <th className="text-center py-2 px-2 font-bold text-white border border-teal-600">تعداد</th>
                <th className="text-center py-2 px-2 font-bold text-white border border-teal-600">مجموع</th>
              </tr>
            </thead>
            <tbody>
              {saleData.products?.map((product: ProductItemType, index: number) => (
                <tr key={product.id} className={index % 2 === 0 ? 'bg-gray-50 print:bg-gray-100' : ''}>
                  <td className="py-2 px-2 text-right border border-gray-300">
                    <div>
                      <p className="font-semibold text-gray-800 text-xs">{product.name}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        کد: {product.code} | اندازه: {product.size}
                      </p>
                      <p className="text-xs text-gray-600">
                        رنگ: {product.color} | کیفیت: {product.quality}
                      </p>
                    </div>
                  </td>
                  <td className="text-xs py-2 px-2 text-center text-gray-700 border border-gray-300">
                    {product.salePrice.toLocaleString()}
                  </td>
                  <td className="text-xs py-2 px-2 text-center text-gray-700 border border-gray-300">
                    {product.quantity}
                  </td>
                  <td className="text-xs py-2 px-2 text-center font-semibold text-gray-800 border border-gray-300">
                    {(product.salePrice * product.quantity).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* محاسبات قیمت */}
        <div className="flex justify-between h-fit mb-3">
          <div className="w-1/2 text-xs">
            <h4 className="font-bold text-gray-800">یادداشت:</h4>
            <p className="text-gray-600 text-xs leading-relaxed">بل بدون مهر و امضاء معتبر نمی‌باشد.</p>
            <p className="text-gray-600 text-xs leading-relaxed">
              {saleData.saleInfo?.notes || "قالین‌های فروخته شده با کیفیت درجه یک و گارانتی دو ساله می‌باشد. در صورت وجود هرگونه مشکل در مدت گارانتی، قالین تعویض خواهد شد."}
            </p>
          </div>

          <div className="w-1/3 flex items-end">
            <div className="bg-teal-500 py-2 px-3 w-full print:bg-teal-500">
              <div className="flex justify-between items-center text-xs font-semibold text-white">
                <span className="flex items-center gap-1">
                  <span>مجموع کل:</span>
                </span>
                <span className="text-sm font-bold tracking-wide">
                  {subtotal.toLocaleString()} <span className="text-xs font-normal">افغانی</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* فوتر - همیشه در پایین */}
        <div className="border-t border-gray-300 pt-4 mt-auto">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <p className="text-xs font-bold text-gray-800 mb-1">تشکر از همکاری شما</p>
              <div className="space-y-1 text-xs text-gray-600">
                <p className="flex items-center">
                  <Mail className="w-3 h-3 ml-1" />
                  ایمیل: carpet.omid@email.af
                </p>
                <p className="flex items-center">
                  <Phone className="w-3 h-3 ml-1" />
                  تماس: ۰۷۹۳۱۲۳۴۵۶
                </p>
              </div>
            </div>

            <div className="flex-1 text-right">
              <p className="text-xs font-bold text-gray-800 mb-1">معلومات پرداخت:</p>
              <div className="text-xs text-gray-600 space-y-1">
                <p>پرداخت: {saleData.saleInfo?.paymentMethod === 'cash' ? 'نقدی' :
                  saleData.saleInfo?.paymentMethod === 'card' ? 'کارت به کارت' :
                    saleData.saleInfo?.paymentMethod === 'check' ? 'چک' : 'اقساط'}</p>
                <p>تحویل: {saleData.saleInfo?.deliveryMethod === 'pickup' ? 'در فروشگاه' : 'ارسال به آدرس'}</p>
              </div>
            </div>

            <div className="flex-1 text-right">
              <p className="text-xs font-bold text-gray-800 mb-1">شرایط و ضوابط:</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                تمام قالین‌ها ضمانت دو ساله دارند.
                برگشت جنس در صورت مشکل تا یک هفته.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}