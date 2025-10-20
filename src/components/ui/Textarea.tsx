// src/components/ui/Textarea.tsx
interface TextareaProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  rows?: number;
  label?: string; // اضافه کردن این خط
  disabled?: boolean;
}

export function Textarea({
  value,
  onChange,
  placeholder,
  rows = 3,
  label,
  disabled = false
}: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
      />
    </div>
  );
}