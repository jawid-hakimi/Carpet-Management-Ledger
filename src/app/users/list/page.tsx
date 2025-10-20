// src/app/companies/page.tsx
"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { UserTable } from "../components/UserTable";
import { useRouter } from "next/navigation";

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

export default function UserListPage() {
    const router = useRouter();

    const handleView = (company: any) => {
        console.log("View company:", company);
        router.push(`/users/${company.id}/details`);
    };

    const handleEdit = (company: any) => {
        console.log("Edit company:", company);
        router.push(`/users/${company.id}/edit`);
    };

    const handleDelete = (company: any) => {
        if (confirm(`آیا از حذف شرکت "${company.name}" مطمئن هستید؟`)) {
            console.log("Delete company:", company);
            // delete logic
        }
    };

    return (
        <div className="w-full">
            <PageHeader
                title="مدیریت شرکت‌ها"
                description="لیست تمام شرکت‌های ثبت شده در سیستم"
                showHomeIcon={true}
            />

            <UserTable
                companies={mockCompanies}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
}