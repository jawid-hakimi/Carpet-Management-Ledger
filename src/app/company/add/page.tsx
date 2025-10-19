// src/app/create-user/page.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { FileUpload } from "@/components/ui/FileUpload";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";

const categories = [
  { value: "carpet", label: "فروشگاه قالین" },
  { value: "dishes", label: "فروشگاه ضروف" },
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const [contractFile, setContractFile] = useState<File | null>(null);
  const [category, setCategory] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [description, setDescription] = useState("");

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
    };
    console.log(formData);
  };

  return (
    <div className="w-full">
      <PageHeader
        title="ایجاد کاربر"
        showHomeIcon={true}
        description="اطلاعات جدید کاربر را در فرم زیر وارد کنید"
      />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-2 md:gap-4">


          <Input
            label="نام"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="نام"
          />
          <Input
            label="نام خانوادگی"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="نام خانوادگی"
          />

          <Input
            label="شماره تماس"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="شماره تماس"
          />

          <Input
            label="نام شرکت"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="نام شرکت"
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
            <label className="block text-sm font-medium mb-1">کتگوری</label>
            <Select
              options={categories}
              value={category}
              onChange={setCategory}
              placeholder="انتخاب کتگوری"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">مدت فعال بودن</label>
            <Select
              options={durations}
              value={duration}
              onChange={setDuration}
              placeholder="مدت فعال بودن فروشگاه"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">توضیحات</label>
          <Textarea
            value={description}
            onChange={setDescription}
            placeholder="توضیحات کاربر"
            rows={4}
          />
        </div>

        <Button
          type="submit"
          variant="primary"

        >
          ایجاد کاربر
        </Button>
      </form>
    </div>
  );
}