// src/components/ui/Pagination.tsx
export function Pagination({ page, totalPages, onChange }: { page: number; totalPages: number; onChange: (p: number) => void }) {
  const prev = () => onChange(Math.max(1, page - 1));
  const next = () => onChange(Math.min(totalPages, page + 1));
  return (
    <div className="flex items-center gap-3">
      <button onClick={prev} className="px-3 py-1 rounded-xl border">قبلی</button>
      <div className="text-sm">صفحه {page} از {totalPages}</div>
      <button onClick={next} className="px-3 py-1 rounded-xl border">بعدی</button>
    </div>
  );
}
