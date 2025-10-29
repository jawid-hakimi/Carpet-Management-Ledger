"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { EditButton, DeleteButton, PrintButton } from "@/components/ui/Button";
import { Consumption } from "@/types/consumption/consumption";
import { Calendar, DollarSign, Tag, CreditCard, FileText, Clock, CheckCircle, XCircle, AlertCircle, Edit, Plus } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";

// Mock data - در پروژه واقعی از API گرفته می‌شود
const mockConsumption: Consumption = {
  id: "1",
  title: "خرید از سوپرمارکت",
  amount: 1500,
  category: "food",
  date: "2024-01-15",
  description: "خرید مواد غذایی هفتگی شامل: نان، میوه، سبزیجات، و مواد پروتئینی",
  paymentMethod: "cash",
  status: "completed",
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-01-15T10:30:00Z"
};

interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueColor?: string;
}

function DetailItem({ icon, label, value, valueColor = "text-gray-900" }: DetailItemProps) {
  return (
    <div className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-lg">
      <div className="p-2 bg-white rounded-lg shadow-sm">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className={`text-lg font-semibold mt-1 ${valueColor}`}>{value}</p>
      </div>
    </div>
  );
}

export default function ConsumptionDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const consumption = mockConsumption; // در واقعیت از API با استفاده از params.id گرفته می‌شود

  const categoryLabels: { [key: string]: string } = {
    food: "خوراکی",
    transport: "حمل و نقل",
    shopping: "خرید",
    entertainment: "تفریح",
    bills: "قبض ها",
    health: "صحی",
    education: "تعلیم",
    other: "دیگر"
  };

  const paymentMethodLabels: { [key: string]: string } = {
    cash: "نقد",
    card: "کارت",
    digital: "دیجیتال",
    transfer: "حواله"
  };

  const statusConfig: { [key: string]: { icon: React.ReactNode; color: string; label: string } } = {
    pending: { 
      icon: <AlertCircle className="w-5 h-5" />, 
      color: "text-yellow-600 bg-yellow-100", 
      label: "در انتظار" 
    },
    completed: { 
      icon: <CheckCircle className="w-5 h-5" />, 
      color: "text-green-600 bg-green-100", 
      label: "تکمیل شده" 
    },
    cancelled: { 
      icon: <XCircle className="w-5 h-5" />, 
      color: "text-red-600 bg-red-100", 
      label: "لغو شده" 
    }
  };

  const statusInfo = statusConfig[consumption.status];

  return (
    <div className="min-h-screen">
      <div className="w-full">
        {/* Page Header */}
        <PageHeader
          title={`جزئیات مصرف: ${consumption.title}`}
          description="مشاهده اطلاعات کامل مصرف ثبت شده"
          showHomeIcon={true}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3">
            <PrintButton
              onClick={() => window.print()}
            >
              پرنت
            </PrintButton>
            <EditButton
              onClick={() => router.push(`/consumption/${consumption.id}/edit`)}
            >
              ویرایش
            </EditButton>
            <DeleteButton
              onClick={() => {
                if (confirm("آیا از حذف این مصرف اطمینان دارید؟")) {
                  console.log("Delete consumption:", consumption.id);
                  router.push("/consumption");
                }
              }}
            >
              حذف
            </DeleteButton>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Status Card */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600">وضعیت مصرف</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className={`p-2 rounded-lg ${statusInfo.color}`}>
                        {statusInfo.icon}
                      </div>
                      <span className="text-xl font-bold text-gray-900">
                        {statusInfo.label}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600">مبلغ</p>
                    <p className="text-xl font-bold text-teal-600">
                      {consumption.amount.toLocaleString()} افغانی
                    </p>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailItem
                  icon={<Tag className="w-5 h-5 text-teal-600" />}
                  label="کتگوری"
                  value={categoryLabels[consumption.category] || consumption.category}
                />
                <DetailItem
                  icon={<CreditCard className="w-5 h-5 text-blue-600" />}
                  label="طریقه پرداخت"
                  value={paymentMethodLabels[consumption.paymentMethod] || consumption.paymentMethod}
                />
                <DetailItem
                  icon={<Calendar className="w-5 h-5 text-purple-600" />}
                  label="تاریخ مصرف"
                  value={new Date(consumption.date).toLocaleDateString('fa-AF')}
                />
                <DetailItem
                  icon={<Clock className="w-5 h-5 text-orange-600" />}
                  label="تاریخ ثبت"
                  value={new Date(consumption.createdAt).toLocaleDateString('fa-AF')}
                />
              </div>

              {/* Description */}
              {consumption.description && (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">توضیحات</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {consumption.description}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">عملیات سریع</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => router.push(`/consumption/${consumption.id}/edit`)}
                    className="w-full flex items-center gap-3 p-3 text-right rounded-lg border border-gray-200 hover:border-teal-500 hover:bg-teal-50 transition-all duration-200"
                  >
                    <Edit className="w-5 h-5 text-teal-600" />
                    <span className="text-sm font-medium">ویرایش مصرف</span>
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="w-full flex items-center gap-3 p-3 text-right rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
                  >
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium">پرنت معلومات</span>
                  </button>
                  <button
                    onClick={() => router.push("/consumption/create")}
                    className="w-full flex items-center gap-3 p-3 text-right rounded-lg border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all duration-200"
                  >
                    <Plus className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium">مصرف جدید</span>
                  </button>
                </div>
              </div>

              {/* Information */}
              <div className="bg-teal-50 rounded-xl border border-teal-200 p-6">
                <h3 className="text-lg font-semibold text-teal-900 mb-3">راهنمایی</h3>
                <ul className="space-y-2 text-sm text-teal-800">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                    <span>مصرف های خود را به طور منظم ثبت کنید</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                    <span>کتگوری صحیح برای هر مصرف انتخاب کنید</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                    <span>توضیحات کامل برای مصارف بزرگ وارد کنید</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}