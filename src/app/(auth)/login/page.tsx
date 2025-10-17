"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Alert } from "@/components/ui/Alert";
import { usePost } from "@/hooks/usePost";
import { useRouter } from "next/navigation";
import { ShieldCheck, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { postData, loading } = usePost("/api/auth/login");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!form.username || !form.password) {
      setError("لطفاً نام کاربری و گذرواژه را وارد کنید.");
      return;
    }

    const res = await postData(form);
    if (res.success) {
      setSuccess(true);
      setTimeout(() => router.push("/dashboard"), 1000);
    } else {
      setError(res.message || "اطلاعات ورود نادرست است. دوباره تلاش کنید.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-background-dark dark:from-background-dark dark:via-background dark:to-black px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/80 dark:bg-background-dark/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-secondary/20"
      >
        {/* لوگو / آیکون */}
        <div className="flex justify-center mb-6">
          <div className="bg-primary/10 p-4 rounded-full">
            <ShieldCheck className="text-primary" size={42} />
          </div>
        </div>

        {/* عنوان */}
        <h1 className="text-2xl font-semibold text-center mb-2 text-foreground">
          خوش آمدید 👋
        </h1>
        <p className="text-center text-sm text-secondary mb-6">
          لطفاً وارد حساب کاربری خود شوید
        </p>

        {/* هشدارها */}
        {error && <Alert type="error" message={error} className="mb-4" />}
        {success && (
          <Alert
            type="success"
            message="ورود با موفقیت انجام شد! در حال انتقال..."
            className="mb-4"
          />
        )}

        {/* فرم ورود */}
        <form onSubmit={handleSubmit} className="space-y-4 text-right">
          <Input
            label="نام کاربری"
            placeholder="نام کاربری خود را وارد کنید"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            disabled={loading}
            required
            dir="rtl"
          />
          <Input
            label="گذرواژه"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            disabled={loading}
            required
            dir="rtl"
          />

          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className="w-full mt-4"
            loading={loading}
            loadingText="در حال ورود"
          >
           ورود
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
