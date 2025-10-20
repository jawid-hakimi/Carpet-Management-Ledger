// src/app/create-user/page.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { FileUpload } from "@/components/ui/FileUpload";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { SaveButton, CancelButton } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Switch } from "@/components/ui/Switch";
import { useRouter } from "next/navigation";

const categories = [
  { value: "carpet", label: "فروشگاه قالین" },
  { value: "dishes", label: "فروشگاه ظروف" },
  { value: "clothes", label: "فروشگاه لباس" },
  { value: "electronics", label: "فروشگاه وسایل برقی" },
  { value: "cosmetics", label: "فروشگاه وسایل آرایشی" },
];

const durations = [
  { value: "1m", label: "فعال برای یک ماه" },
  { value: "2m", label: "فعال برای دو ماه" },
  { value: "3m", label: "فعال برای سه ماه" },
  { value: "6m", label: "فعال برای شش ماه" },
  { value: "1y", label: "فعال برای یک سال" },
];

export default function CreateUserPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const [contractFile, setContractFile] = useState<File | null>(null);
  const [category, setCategory] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      firstName,
      lastName,
      phoneNumber,
      companyName,
      companyLogo,
      contractFile,
      category,
      duration,
      description,
      isActive,
    };
    console.log(formData);
    alert("کاربر با موفقیت ایجاد شد!");
    router.push("/users");
  };

  const handleCancel = () => {
    if (confirm("آیا از انصراف مطمئن هستید؟ اطلاعات ذخیره نخواهند شد.")) {
      router.back();
    }
  };

  return (
    <div className="w-full">
      <PageHeader
        title="ایجاد کاربر"
        showHomeIcon={true}
        description="اطلاعات جدید کاربر را در فرم زیر وارد کنید"
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="نام"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="نام"
            required
          />

          <Input
            label="نام خانوادگی"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="نام خانوادگی"
            required
          />

          <Input
            label="شماره تماس"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="شماره تماس"
            required
          />

          <Input
            label="نام شرکت"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="نام شرکت"
            required
          />

          <div>
            <label className="block text-sm font-medium mb-2">لگوی شرکت</label>
            <ImageUpload
              onImageSelect={setCompanyLogo}
              label="لگوی شرکت را انتخاب کنید"
              maxSize={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">فایل قرارداد</label>
            <FileUpload
              onFileSelect={setContractFile}
              accept=".pdf,.doc,.docx"
              label="فایل قرارداد را انتخاب کنید"
              maxSize={10}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">کتگوری</label>
            <Select
              options={categories}
              value={category}
              onChange={setCategory}
              placeholder="انتخاب کتگوری"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">مدت فعال بودن</label>
            <Select
              options={durations}
              value={duration}
              onChange={setDuration}
              placeholder="مدت فعال بودن فروشگاه"
            />
          </div>

          {/* وضعیت فعال/غیرفعال */}
          <div className="md:col-span-2">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">وضعیت حساب کاربری</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {isActive
                      ? "حساب کاربری فعال است و می‌تواند از سیستم استفاده کند"
                      : "حساب کاربری غیرفعال است و دسترسی ندارد"
                    }
                  </p>
                </div>
                <Switch
                  size="md"
                  checked={isActive}
                  onChange={setIsActive}
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">توضیحات</label>
          <Textarea
            value={description}
            onChange={setDescription}
            placeholder="توضیحات کاربر"
            rows={4}
          />
        </div>

        {/* دکمه‌های اقدام */}
        <div className="flex gap-4 justify-end pt-6 border-t border-gray-200">
          <CancelButton
            size="md"
            onClick={handleCancel}
          >
            انصراف
          </CancelButton>

          <SaveButton
            size="md"
            type="submit"
          >
            ایجاد کاربر
          </SaveButton>
        </div>
      </form>
    </div>
  );
}