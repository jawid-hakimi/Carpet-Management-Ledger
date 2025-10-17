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
      await addToQueue({ url, options });
      return { offline: true };
    }
  } else {
    await addToQueue({ url, options });
    console.log("📦 Request queued (offline):", url);
    return { offline: true };
  }
}
