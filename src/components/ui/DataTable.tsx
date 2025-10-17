// src/components/ui/DataTable.tsx
"use client";
import React from "react";
import { cn } from "@/utils/utils";
import { ChevronUp, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export type Column<T> = {
  key: string;
  title: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
  className?: string;
};

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  page?: number;
  pageSize?: number;
  total?: number;
  onSort?: (key: string, dir: "asc" | "desc" | null) => void;
  sortKey?: string | null;
  sortDir?: "asc" | "desc" | null;
  loading?: boolean;
  selectable?: boolean;
  onSelect?: (selected: T[]) => void;
}

export function DataTable<T extends { id?: string | number }>({
  columns,
  data,
  page = 1,
  pageSize = 10,
  total,
  onSort,
  sortKey,
  sortDir,
  loading = false,
  selectable = false,
  onSelect,
}: DataTableProps<T>) {
  const [selectedIds, setSelectedIds] = React.useState<Set<string | number>>(new Set());

  React.useEffect(() => {
    if (onSelect) {
      const rows = data.filter((d) => d.id && selectedIds.has(d.id));
      onSelect(rows);
    }
  }, [selectedIds, data, onSelect]);

  const toggleRow = (id?: string | number) => {
    if (!id) return;
    const s = new Set(selectedIds);
    s.has(id) ? s.delete(id) : s.add(id);
    setSelectedIds(s);
  };

  const toggleAll = () => {
    if (selectedIds.size === data.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(data.map((d) => d.id!).filter(Boolean)));
    }
  };

  const handleSort = (col: Column<T>) => {
    if (!col.sortable || !onSort) return;
    if (sortKey !== col.key) onSort(col.key, "asc");
    else if (sortDir === "asc") onSort(col.key, "desc");
    else onSort(col.key, null);
  };

  return (
    <div className="w-full overflow-x-auto rounded-2xl bg-white dark:bg-background-dark shadow-card p-2">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            {selectable && (
              <th className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={selectedIds.size === data.length && data.length > 0}
                  onChange={toggleAll}
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn("text-left px-4 py-3 text-sm font-medium text-secondary", col.className)}
              >
                <button
                  className="inline-flex items-center gap-2"
                  onClick={() => handleSort(col)}
                >
                  <span>{col.title}</span>
                  {col.sortable && (
                    <motion.span
                      initial={{ opacity: 0.6 }}
                      animate={{ opacity: 1 }}
                      className="ml-1"
                    >
                      {sortKey === col.key ? (
                        sortDir === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                      ) : (
                        <ChevronUp size={12} className="opacity-40" />
                      )}
                    </motion.span>
                  )}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={columns.length + (selectable ? 1 : 0)} className="p-6">در حال بارگذاری...</td></tr>
          ) : data.length === 0 ? (
            <tr><td colSpan={columns.length + (selectable ? 1 : 0)} className="p-6 text-center text-sm text-secondary">موردی یافت نشد</td></tr>
          ) : (
            data.map((row) => (
              <tr key={row.id ?? Math.random()} className="group hover:bg-primary/5 transition">
                {selectable && (
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={row.id ? selectedIds.has(row.id) : false}
                      onChange={() => toggleRow(row.id)}
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 align-top text-sm">
                    {col.render ? col.render(row) : (row as any)[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* pagination area can be placed by parent; this component emits nothing by default */}
    </div>
  );
}
