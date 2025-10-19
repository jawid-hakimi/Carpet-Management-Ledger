"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Alert } from "@/components/ui/Alert";
import { usePost } from "@/hooks/usePost";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { postData, loading } = usePost("/api/auth/login");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ریست خطاها
    setUsernameError(null);
    setPasswordError(null);
    setFormError(null);
    setSuccess(false);

    let hasError = false;

    if (!form.username) {
      setUsernameError("لطفاً شماره تماس را وارد کنید.");
      hasError = true;
    }

    if (!form.password) {
      setPasswordError("لطفاً رمز عبور را وارد کنید.");
      hasError = true;
    }

    if (hasError) return;

    // ارسال به API
    const res = await postData(form);
    if (res.success) {
      setSuccess(true);
      setTimeout(() => router.push("/dashboard"), 1000);
    } else {
      setFormError(res.message || "اطلاعات ورود نادرست است. دوباره تلاش کنید.");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center px-4 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/80  backdrop-blur-md rounded-xl shadow-xl p-8 border border-gray-300"
      >
        {/* لوگو / آیکون */}
        <div className="flex justify-center mb-6">
          <div className="bg-primary/10 p-4 rounded-full">
            <ShieldCheck className="text-primary" size={42} />
          </div>
        </div>

        {/* عنوان */}
        <h1 className="text-2xl font-semibold text-center mb-2 text-foreground">
          خوش آمدید
        </h1>
        <p className="text-center text-sm text-secondary mb-6">
          لطفاً وارد حساب کاربری خود شوید
        </p>

        {/* هشدار فرم */}
        {formError && <Alert type="error" message={formError} className="mb-4" />}
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
            label="شماره تماس"
            placeholder="شماره تماس خود را وارد کنید"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            disabled={loading}
            dir="rtl"
            error={usernameError ?? undefined}
          />
          <Input
            label="رمز عبور"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            disabled={loading}
            dir="rtl"
            error={passwordError ?? undefined}
          />

          <Link href="/forgot-password" className="text-sm text-blue-500 hover:underline">
            رمز عبور خود را فراموش کرده‌اید؟
          </Link>

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
