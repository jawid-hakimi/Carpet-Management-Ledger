// src/components/ui/Switch.tsx
export function Switch({ checked, onChange, disabled }: { checked?: boolean; onChange?: (v: boolean) => void; disabled?: boolean }) {
  return (
    <button onClick={() => !disabled && onChange?.(!checked)} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${checked ? "bg-primary" : "bg-secondary/20"} ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}>
      <span className={`inline-block bg-white rounded-full h-5 w-5 transform transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );
}