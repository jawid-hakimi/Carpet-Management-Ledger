// src/components/sales/InvoiceSummary.tsx
"use client";

import { Package, User, DollarSign, Calendar, CreditCard, Truck, Phone, Mail } from "lucide-react";

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
            {/* هدر فاکتور */}
            <div className="flex justify-between items-start mb-8 p-4 border-b border-gray-300 bg-teal-300 rounded-md">
                <div>
                    <img src="/images/logo/carpet-logo.jpg" alt="لگوی شرکت" className="w-14 h-14 object-contain rounded-md" />
                    <h1 className="font-semibold text-sm text-gray-800 mb-2">شماره: بل-01</h1>

                </div>

                <div className="text-right">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">شرکت</h2>
                    <div className="text-gray-600 text-sm">
                        <p className="font-semibold text-sm">قالین فروشی امید</p>
                        <p>آدرس دفتر: کابل، کارته سخی، بلوار عبدالرحمن خان</p>
                        <p className="text-sm text-gray-600">تاریخ بل:{formatDate(saleDate)}</p>
                    </div>
                </div>
            </div>

            {/* اطلاعات مشتری */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3"></h3>
                    <div className="text-gray-600">
                        <p className="font-semibold text-lg">{customerName}</p>
                        <p>{customerAddress || "کابل، دشت برچی، بلوار طلایی"}</p>
                        <p>شماره ۰۶/بی</p>
                        <p className="flex items-center mt-1">
                            <Phone className="w-4 h-4 ml-1" />
                            {customerPhone}
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
                        {saleProducts.map((product, index) => (
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
                        {notes || "قالین‌های فروخته شده با کیفیت درجه یک و گارانتی دو ساله می‌باشد. در صورت وجود هرگونه مشکل در مدت گارانتی، قالین تعویض خواهد شد."}
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
    );
}