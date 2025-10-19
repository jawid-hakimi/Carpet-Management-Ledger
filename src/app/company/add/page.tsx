// src/app/create-user/page.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Dropdown } from "@/components/ui/Dropdown";

const categories = [
  { id: "carpet", label: "فروشگاه قالین" },
  { id: "dishes", label: "فروشگاه ضروف" },
  { id: "clothes", label: "فروشگاه لباس" },
  { id: "electronics", label: "فروشگاه وسایل برقی" },
  { id: "cosmetics", label: "فروشگاه وسایل آرایشی" },
];

const durations = [
  { id: "1m", label: "فعال برای یک ماه" },
  { id: "2m", label: "فعال برای دو ماه" },
  { id: "3m", label: "فعال برای سه ماه" },
  { id: "6m", label: "فعال برای شش ماه" },
  { id: "1y", label: "فعال برای یک سال" },
];

export default function CreateUserPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
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
      companyName,
      companyLogo,
      contractFile,
      category,
      duration,
      description,
    };
    console.log(formData);
    alert("اطلاعات در کنسول چاپ شد!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">ایجاد کاربر</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          label="نام شرکت"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="نام شرکت"
        />
        <div>
          <label className="block text-sm font-medium mb-1">لگوی شرکت</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCompanyLogo(e.target.files?.[0] || null)}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">فایل قرارداد</label>
          <input
            type="file"
            onChange={(e) => setContractFile(e.target.files?.[0] || null)}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
        <div className="flex gap-4">
          <Dropdown
            label={category || "انتخاب کتگوری"}
            items={categories.map((cat) => ({
              ...cat,
              onClick: () => setCategory(cat.label),
            }))}
          />
          <Dropdown
            label={duration || "مدت فعال بودن فروشگاه"}
            items={durations.map((d) => ({
              ...d,
              onClick: () => setDuration(d.label),
            }))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">توضیحات</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
            rows={4}
            placeholder="توضیحات کاربر"
          />
        </div>
        <button
          type="submit"
          className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600 transition"
        >
          ایجاد کاربر
        </button>
      </form>
    </div>
  );
}
