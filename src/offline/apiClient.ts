// src/offline/apiClient.ts
import { addToQueue } from "./Queue";

export async function apiFetch(url: string, options: RequestInit = {}) {
  const isOnline = navigator.onLine;

  if (isOnline) {
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error("Network error");
      return res.json();
    } catch (err) {
      console.warn("⚠️ Network issue, queuing request:", url);
      // تبدیل options به فرمت سازگار با QueueRequest
      await addToQueue({ 
        url, 
        method: options.method || 'GET',
        data: options.body,
        headers: options.headers as Record<string, string>
      });
      return { offline: true };
    }
  } else {
    // تبدیل options به فرمت سازگار با QueueRequest
    await addToQueue({ 
      url, 
      method: options.method || 'GET',
      data: options.body,
      headers: options.headers as Record<string, string>
    });
    console.log("📦 Request queued (offline):", url);
    return { offline: true };
  }
}