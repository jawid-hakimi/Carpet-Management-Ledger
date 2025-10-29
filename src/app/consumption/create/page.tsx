"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { SaveButton, CancelButton } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { PageHeader } from "@/components/ui/PageHeader";
import { Calendar, DollarSign, FileText } from "lucide-react";
import { ConsumptionFormData } from "@/types/consumption/consumption";

export default function CreateConsumptionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<ConsumptionFormData>({
    title: "",
    amount: 0,
    category: "",
    date: new Date().toISOString().split('T')[0],
    description: "",
    paymentMethod: ""
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("Form data:", formData);

      // Redirect to list page after success
      router.push("/consumption");
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
    <div className="min-h-screen w-full">
      {/* Page Header */}
      <PageHeader
        title="ثبت مصرف جدید"
        description="معلومات مصرف تازه خود را وارد کنید"
        showHomeIcon={true}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl overflow-hidden border border-gray-200"
      >
        {/* Form Header */}
        <div className="bg-gradient-to-r from-cyan-500 to-teal-500 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">فرم ثبت مصرف</h2>
                <p className="text-teal-100 mt-1 text-sm">
                  تمام فیلدهای ضروری را پر کنید
                </p>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center gap-2 text-teal-100 text-sm">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>مصرف جدید</span>
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
              loadingText="در حال ثبت..."
              disabled={loading}
            >
              ثبت مصرف
            </SaveButton>
          </div>
        </form>
      </motion.div>
    </div>
  );
}