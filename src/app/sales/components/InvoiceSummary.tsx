// src/components/sales/InvoiceSummary.tsx
"use client";

import { Package, User, DollarSign, Calendar, CreditCard, Truck, Mail } from "lucide-react";
import { Building2, MapPin, Phone, FileText, CalendarDays } from "lucide-react";

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

interface InvoiceSummaryProps {
    saleProducts: SaleProduct[];
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    paymentMethod: string;
    deliveryMethod: string;
    saleDate: string;
    notes: string;
}

const paymentMethodLabels: { [key: string]: string } = {
    cash: "نقدی",
    card: "کارت به کارت",
    check: "چک",
    installment: "اقساط"
};

export function InvoiceSummary({
    saleProducts,
    customerName,
    customerPhone,
    customerAddress,
    paymentMethod,
    deliveryMethod,
    saleDate,
    notes
}: InvoiceSummaryProps) {
    const subtotal = saleProducts.reduce((total, product) => {
        return total + (product.salePrice * product.quantity);
    }, 0);

    const tax = subtotal * 0.15; // 15% VAT
    const discount = subtotal * 0.05; // 5% Discount
    const totalDue = subtotal + tax - discount;

    // تابع برای فرمت تاریخ
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fa-IR');
    };

    return (
        <div className="bg-white border border-gray-300 p-8 max-w-4xl mx-auto font-sans">
            {/* هدر بل */}
            <div className="flex justify-between items-start mb-4 border-b border-gray-300 pb-2">
                <div>
                    <img src="/images/logo/carpet-logo.png" alt="لگوی شرکت" className="w-16 h-16 object-contain" />
                    <div className="flex items-center gap-6 bg-teal-50 border border-teal-100 rounded-md px-4 py-2 w-fit shadow-sm">
                        <div className="flex items-center gap-2 text-teal-800">
                            <FileText className="w-4 h-4" />
                            <span className="text-sm font-semibold">شماره:</span>
                            <span className="text-sm">بل-01</span>
                        </div>

                        <div className="flex items-center gap-2 text-teal-800">
                            <CalendarDays className="w-4 h-4" />
                            <span className="text-sm font-semibold">تاریخ بل:</span>
                            <span className="text-sm">{formatDate(saleDate)}</span>
                        </div>
                    </div>
                </div>

                <div className="text-teal-900 text-sm space-y-1">
                    <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-teal-700" />
                        <p className="font-semibold">قالین فروشی امید</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-teal-700" />
                        <p>کابل، کارته سخی، شهرک عبدالرحمن خان</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-teal-700" />
                        <p>079091929394</p>
                    </div>
                </div>

            </div>

            {/* اطلاعات مشتری */}
            <div className="space-y-2 py-2 my-2">
                <h2 className="text-sm font-semibold text-teal-800">اطلاعات خریدار</h2>

                <div className="text-gray-700 w-full grid grid-cols-4 text-sm">
                    <p className="flex items-center col-span-1">
                        <User className="w-4 h-4 ml-1 text-teal-700" />
                        <span className="font-semibold">نام:</span>&nbsp;{customerName}
                    </p>

                    <p className="flex items-center col-span-1">
                        <Phone className="w-4 h-4 ml-1 text-teal-700" />

                        <span className="font-semibold">شماره تماس:</span>&nbsp; {customerPhone}
                    </p>

                    <p className="flex items-center col-span-2 justify-end">
                        <MapPin className="w-4 h-4 ml-1 text-teal-700" />

                        <span className="font-semibold">آدرس:</span>&nbsp;{customerAddress || "کابل، دشت برچی، بلوار طلایی"}
                    </p>
                </div>
            </div>

            {/* جدول محصولات */}
            <div className="mb-8 min-h-96">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-teal-400 text-sm">
                            <th className="text-right py-3 px-4 font-bold text-gray-800">شرح اجناس</th>
                            <th className="text-center py-3 px-4 font-bold text-gray-800">قیمت هر دانه</th>
                            <th className="text-center py-3 px-4 font-bold text-gray-800">تعداد</th>
                            <th className="text-center py-3 px-4 font-bold text-gray-800">مجموع</th>
                        </tr>
                    </thead>
                    <tbody>
                        {saleProducts.map((product, index) => (
                            <tr key={product.id} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                                <td className="py-4 px-4 text-right">
                                    <div>
                                        <p className="font-semibold text-gray-800 text-sm">{product.name}</p>
                                        <p className="text-xs text-gray-600 mt-1">
                                            کد: {product.code} | اندازه: {product.size} | رنگ: {product.color}
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            کیفیت: {product.quality} | جنس: {product.material}
                                        </p>
                                    </div>
                                </td>
                                <td className="text-xs py-4 px-4 text-center text-gray-700">
                                    {product.salePrice.toLocaleString()} افغانی
                                </td>
                                <td className="text-xs py-4 px-4 text-center text-gray-700">
                                    {product.quantity}
                                </td>
                                <td className="text-xs py-4 px-4 text-center font-semibold text-gray-800">
                                    {(product.salePrice * product.quantity).toLocaleString()} افغانی
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* محاسبات قیمت */}

            <div className="flex justify-between h-fit mb-4">
                <div className="w-1/2 text-sm">
                    <h4 className="font-bold text-gray-800">یادداشت:</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        {notes || "قالین‌های فروخته شده با کیفیت درجه یک و گارانتی دو ساله می‌باشد. در صورت وجود هرگونه مشکل در مدت گارانتی، قالین تعویض خواهد شد."}
                    </p>
                </div>
               
                    <div className="w-1/3 flex items-end ">
                     <div className=" bg-teal-400 py-2 px-4 w-full">

                        <div className="flex justify-between items-center text-sm font-semibold">
                            <span className="flex items-center gap-1">
                                <span>مجموع کل:</span>
                            </span>
                            <span className="text-base font-bold tracking-wide">
                                {subtotal.toLocaleString()} <span className="text-xs font-normal">افغانی</span>
                            </span>
                        </div>
                    </div>

                </div>
            </div>

            {/* فوتر */}
            <div className="border-t border-gray-300 pt-6">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-bold text-gray-800 mb-2">تشکر از همکاری شما</p>
                        <div className="space-y-1 text-xs text-gray-600">
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
                        <p className="text-sm font-bold text-gray-800 mb-2">معلومات پرداخت:</p>
                        <div className="text-xs text-gray-600 space-y-1">
                            <p>رویش پرداخت: {paymentMethod}</p>
                            <p>رویش تحویل: {deliveryMethod}</p>
                        </div>
                    </div>

                    <div className="text-right w-1/3">
                        <p className="text-sm font-bold text-gray-800 mb-2">شرایط و ضوابط / یادداشت:</p>
                        <p className="text-xs text-gray-600 leading-relaxed">
                            تمام قالین‌های فروخته شده دارای گارانتی دو ساله می‌باشد.
                            برگشت کالا فقط در صورت وجود مشکل فنی در مدت یک هفته امکان‌پذیر است.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}