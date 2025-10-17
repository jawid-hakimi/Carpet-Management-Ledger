"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight">
          Carpet<span className="text-secondary">Ledger</span>
        </Link>
      </div>
    </header>
  );
}
