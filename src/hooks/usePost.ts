import { useState } from "react";
import axios from "axios";

interface PostResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}

export function usePost(url: string) {
  const [loading, setLoading] = useState(false);

  const postData = async <T = any>(data: any): Promise<PostResponse<T>> => {
    setLoading(true);
    try {
      const res = await axios.post<T>(url, data);
      setLoading(false);
      return { success: true, data: res.data };
    } catch (err: any) {
      setLoading(false);
      return { success: false, message: err?.response?.data?.message || err.message };
    }
  };

  return { postData, loading };
}
