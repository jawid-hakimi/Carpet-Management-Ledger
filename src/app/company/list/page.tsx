// src/app/companies/page.tsx
"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { CompanyTable } from "../components/CompanyTable";

// در src/app/company/list/page.tsx
const mockCompanies = [
    {
        id: "1",
        name: "شرکت فرش ایران",
        category: "فرش و موکت",
        owner: "علیرضا محمدی",
        status: "active" as const,
        createdAt: "2024-01-15",
    },
    {
        id: "2",
        name: "لوازم خانگی برقی",
        category: "وسایل برقی",
        owner: "محمد حسینی",
        status: "inactive" as const,
        createdAt: "2024-02-20",
    },
    {
        id: "3",
        name: "پوشاک مدرن",
        category: "لباس و پوشاک",
        owner: "فاطمه کریمی",
        status: "active" as const,
        createdAt: "2024-01-10",
    }
];

export default function CompaniesPage() {
    const handleView = (company: any) => {
        console.log("View company:", company);
        // navigation to company details
    };

    const handleEdit = (company: any) => {
        console.log("Edit company:", company);
        // navigation to edit page
    };

    const handleDelete = (company: any) => {
        if (confirm(`آیا از حذف شرکت "${company.name}" مطمئن هستید؟`)) {
            console.log("Delete company:", company);
            // delete logic
        }
    };

    return (
        <div className="container mx-auto">
            <PageHeader
                title="مدیریت شرکت‌ها"
                description="لیست تمام شرکت‌های ثبت شده در سیستم"
                showHomeIcon={true}
            />

            <CompanyTable
                companies={mockCompanies}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
}