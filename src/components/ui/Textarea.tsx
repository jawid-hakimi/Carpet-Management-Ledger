
export function Textarea({ value, onChange, placeholder, rows = 4 }: { value?: string; onChange?: (v: string) => void; placeholder?: string; rows?: number }) {
  return (
    <textarea rows={rows} value={value} onChange={(e) => onChange?.(e.target.value)} className="w-full p-3 rounded-md ring ring-gray-300 bg-white focus:ring-2 focus:outline-none focus:ring-teal-500" placeholder={placeholder} />
  );
}