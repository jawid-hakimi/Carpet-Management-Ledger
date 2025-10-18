"use client";
import { Search, Maximize2 } from "lucide-react";

export default function Fullscreen() {
  return (
    <div className="flex items-center gap-4">
      <button className="text-slate-600 hover:text-slate-800 transition">
        <Maximize2 size={20} />
      </button>
    </div>
  );
}
