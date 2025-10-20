// src/components/UserTable.tsx
import { DataTable } from "@/components/ui/DataTable";
import { Eye, Edit, Trash2, Building } from "lucide-react";

interface Company {
    id: string;
    name: string;
    category: string;
    owner: string;
    status: 'active' | 'inactive';
    createdAt: string;
}

interface UserTableProps {
    companies: Company[];
    onView: (company: Company) => void;
    onEdit: (company: Company) => void;
    onDelete: (company: Company) => void;
}

export function UserTable({ companies, onView, onEdit, onDelete }: UserTableProps) {
    const columns = [
        {
            key: "name",
            label: "نام شرکت",
            sortable: true,
            render: (value: string, row: Company) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <Building size={20} className="text-white" />
                    </div>
                    <div>
                        <div className="font-medium text-gray-900">{value}</div>
                        <div className="text-xs text-gray-500">ID: {row.id}</div>
                    </div>
                </div>
            )
        },
        {
            key: "category",
            label: "دسته‌بندی",
            sortable: true,
            render: (value: string) => (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {value}
                </span>
            )
        },
        {
            key: "owner",
            label: "مالک",
            sortable: true
        },
        {
            key: "status",
            label: "وضعیت",
            sortable: true,
            render: (value: string) => {
                const statusConfig = {
                    active: { color: "bg-green-100 text-green-800", label: "فعال" },
                    inactive: { color: "bg-red-100 text-red-800", label: "غیرفعال" },
                };

                const config = statusConfig[value as keyof typeof statusConfig];
                return (
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
                        {config.label}
                    </span>
                );
            }
        },
        {
            key: "createdAt",
            label: "تاریخ ایجاد",
            sortable: true,
            render: (value: string) => new Date(value).toLocaleDateString('fa-IR')
        }
    ];

    const actions = (company: Company) => [
        {
            label: "مشاهده",
            icon: <Eye size={16} />,
            onClick: () => onView(company)
        },
        {
            label: "ویرایش",
            icon: <Edit size={16} />,
            onClick: () => onEdit(company)
        },
        {
            label: "حذف",
            icon: <Trash2 size={16} />,
            onClick: () => onDelete(company)
        }
    ];

    return (
        <DataTable
            data={companies}
            columns={columns}
            title="لیست شرکت‌ها"
            searchable={true}
            actions={actions}
            onRowClick={onView}
        />
    );
}