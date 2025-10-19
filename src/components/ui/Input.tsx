// src/components/ui/Input.tsx
import { cn } from "@/utils/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  icon?: React.ReactNode;
}

export const Input = ({ label, error, icon, className, ...props }: InputProps) => {
  return (
    <div className="w-full flex flex-col space-y-1">
      {label && (
        <label className="text-sm font-medium text-foreground/80">{label}</label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary">
            {icon}
          </span>
        )}
        <input
          {...props}
          className={cn(
            "w-full rounded-md ring ring-custom px-3 py-2 text-sm focus:ring-2 focus:ring-custom outline-none transition-all",
            icon && "pl-10",
            error && "border-error focus:ring-error/30", // تغییر رنگ هنگام خطا
            className
          )}
        />

      </div>
      {error && <p className="text-xs text-error mt-1">{error}</p>}
    </div>
  );
};
