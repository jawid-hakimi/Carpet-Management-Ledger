// src/components/ui/FileUploader.tsx
"use client";
import React from "react";
import { cn } from "@/utils/utils";

export function FileUploader({ onChange, accept = "image/*", maxSizeMB = 5 }: { onChange?: (files: File[]) => void; accept?: string; maxSizeMB?: number; }) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = React.useState<File[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  const handleFiles = (fList: FileList | null) => {
    if (!fList) return;
    const arr = Array.from(fList);
    const bad = arr.find((f) => f.size > maxSizeMB * 1024 * 1024);
    if (bad) {
      setError(`اندازه‌ی فایل "${bad.name}" بیشتر از ${maxSizeMB}MB است`);
      return;
    }
    setError(null);
    setFiles(arr);
    onChange?.(arr);
  };

  return (
    <div>
      <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={(e) => handleFiles(e.target.files)} />
      <div className="border border-dashed rounded-xl p-4 text-center">
        <p className="text-sm text-secondary">فایل‌ها را اینجا رها کنید یا <button className="text-primary underline" onClick={() => inputRef.current?.click()}>انتخاب کنید</button></p>
        {error && <p className="text-xs text-error mt-2">{error}</p>}
        <div className="mt-3 grid grid-cols-4 gap-2">
          {files.map((f) => (
            <div key={f.name} className="rounded overflow-hidden border p-1 text-xs">
              <div className="truncate">{f.name}</div>
              <div className="text-[10px] text-secondary">{(f.size / 1024 / 1024).toFixed(2)} MB</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
