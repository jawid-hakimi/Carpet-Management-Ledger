// src/hooks/usePost.ts
import { useState } from "react";
import axios from "axios";

// تعریف generic interfaces
interface PostResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
}

interface ErrorResponse {
  message?: string;
  // می‌توانید فیلدهای دیگر را بر اساس API خود اضافه کنید
}

interface AxiosError {
  response?: {
    data?: ErrorResponse;
  };
  message: string;
}

export function usePost<T = unknown>(url: string) {
  const [loading, setLoading] = useState(false);

  const postData = async <U = T>(data: unknown): Promise<PostResponse<U>> => {
    setLoading(true);
    try {
      const res = await axios.post<U>(url, data);
      setLoading(false);
      return { success: true, data: res.data };
    } catch (error) {
      setLoading(false);
      
      // Type guard برای بررسی نوع error
      const err = error as AxiosError;
      const errorMessage = err?.response?.data?.message || err.message || "خطای ناشناخته رخ داد";
      
      return { success: false, message: errorMessage };
    }
  };

  return { postData, loading };
}