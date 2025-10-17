
export function Textarea({ value, onChange, placeholder, rows = 4 }: { value?: string; onChange?: (v: string) => void; placeholder?: string; rows?: number }) {
  return (
    <textarea rows={rows} value={value} onChange={(e) => onChange?.(e.target.value)} className="w-full p-3 rounded-xl border border-secondary/20 bg-white dark:bg-background-dark outline-none focus:ring-2 focus:ring-primary/30" placeholder={placeholder} />
  );
}