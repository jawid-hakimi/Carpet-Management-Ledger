"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { SaveButton, CancelButton } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { PageHeader } from "@/components/ui/PageHeader";
import { Calendar, DollarSign, FileText, Edit } from "lucide-react";
import { Consumption, ConsumptionFormData } from "@/types/consumption/consumption";

// Mock data - در پروژه واقعی از API گرفته می‌شود
const mockConsumption: Consumption = {
  id: "1",
  title: "خرید از سوپرمارکت",
  amount: 1500,
  category: "food",
  date: "2024-01-15",
  description: "خرید مواد غذایی هفتگی",
  paymentMethod: "cash",
  status: "completed",
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-01-15T10:30:00Z"
};

export default function EditConsumptionPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<ConsumptionFormData>({
    title: mockConsumption.title,
    amount: mockConsumption.amount,
    category: mockConsumption.category,
    date: mockConsumption.date,
    description: mockConsumption.description || "",
    paymentMethod: mockConsumption.paymentMethod
  });

  const categories = [
    { value: "food", label: "خوراکی" },
    { value: "transport", label: "حمل و نقل" },
    { value: "shopping", label: "خرید" },
    { value: "entertainment", label: "تفریح" },
    { value: "bills", label: "قبض ها" },
    { value: "health", label: "صحی" },
    { value: "education", label: "تعلیم" },
    { value: "other", label: "دیگر" }
  ];

  const paymentMethods = [
    { value: "cash", label: "نقد" },
    { value: "card", label: "کارت" },
    { value: "digital", label: "دیجیتال" },
    { value: "transfer", label: "حواله" }
  ];

  const statusOptions = [
    { value: "pending", label: "در انتظار" },
    { value: "completed", label: "تکمیل شده" },
    { value: "cancelled", label: "لغو شده" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("Updated data:", formData);
      
      // Redirect to detail page after success
      router.push(`/consumption/${params.id}`);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof ConsumptionFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen">
      <div className="w-full">
        {/* Page Header */}
        <PageHeader
          title="ویرایش مصرف"
          description={`ویرایش: ${mockConsumption.title}`}
          showHomeIcon={true}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl overflow-hidden border border-gray-200"
        >
          {/* Form Header */}
          <div className="bg-gradient-to-r from-cyan-500 to-teal-500 px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Edit className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">فرم ویرایش مصرف</h2>
                  <p className="text-cyan-100 mt-1 text-sm">
                    معلومات مصرف را به روز رسانی کنید
                  </p>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="flex items-center gap-2 text-cyan-100 text-sm">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>ویرایش مصرف</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <Input
                label="عنوان مصرف"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="مثال: خرید از بازار"
                icon={<FileText className="w-4 h-4" />}
                required
              />

              {/* Amount */}
              <Input
                label="مبلغ (افغانی)"
                type="number"
                value={formData.amount.toString()}
                onChange={(e) => handleChange('amount', parseFloat(e.target.value) || 0)}
                placeholder="مثال: 1000"
                icon={<DollarSign className="w-4 h-4" />}
                required
              />

              {/* Category */}
              <Select
                label="کتگوری"
                options={categories}
                value={formData.category}
                onChange={(value) => handleChange('category', value)}
                placeholder="کتگوری انتخاب کنید"
                required
              />

              {/* Payment Method */}
              <Select
                label="طریقه پرداخت"
                options={paymentMethods}
                value={formData.paymentMethod}
                onChange={(value) => handleChange('paymentMethod', value)}
                placeholder="طریقه پرداخت انتخاب کنید"
                required
              />

              {/* Date */}
              <Input
                label="تاریخ"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                icon={<Calendar className="w-4 h-4" />}
                required
              />

              {/* Status */}
              <Select
                label="وضعیت"
                options={statusOptions}
                value={mockConsumption.status}
                onChange={(value) => console.log("Status changed:", value)}
                placeholder="وضعیت انتخاب کنید"
                required
              />
            </div>

            {/* Description */}
            <Textarea
              label="توضیحات"
              value={formData.description}
              onChange={(value) => handleChange('description', value)}
              placeholder="توضیحات اضافی درباره این مصرف..."
              rows={4}
            />

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
              <CancelButton
                onClick={() => router.back()}
                disabled={loading}
              >
                لغو
              </CancelButton>
              <SaveButton
                type="submit"
                loading={loading}
                loadingText="در حال ذخیره..."
                disabled={loading}
              >
                ذخیره تغییرات
              </SaveButton>
            </div>
          </form>
        </motion.div>

        {/* Original Data Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 bg-yellow-50 rounded-xl border border-yellow-200 p-6"
        >
          <h3 className="text-lg font-semibold text-yellow-900 mb-3">
            معلومات اصلی
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-yellow-700">عنوان: </span>
              <span className="text-yellow-900">{mockConsumption.title}</span>
            </div>
            <div>
              <span className="text-yellow-700">مبلغ: </span>
              <span className="text-yellow-900">{mockConsumption.amount.toLocaleString()} افغانی</span>
            </div>
            <div>
              <span className="text-yellow-700">تاریخ ثبت: </span>
              <span className="text-yellow-900">
                {new Date(mockConsumption.createdAt).toLocaleString('fa-AF')}
              </span>
            </div>
            <div>
              <span className="text-yellow-700">آخرین ویرایش: </span>
              <span className="text-yellow-900">
                {new Date(mockConsumption.updatedAt).toLocaleString('fa-AF')}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 bg-cyan-50 rounded-xl border border-cyan-200 p-6"
        >
          <h3 className="text-lg font-semibold text-cyan-900 mb-3">
            نکات ویرایش
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-cyan-800">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>اطمینان حاصل کنید که تمام فیلدها به درستی پر شده‌اند</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>تغییرات پس از ذخیره شدن اعمال می‌شوند</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>می‌توانید با کلیک روی لغو از تغییرات صرف نظر کنید</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>معلومات اصلی در پایین صفحه قابل مشاهده است</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}