"use client";

import { useEffect } from "react";
import { useSyncQueue } from "@/offline/hooks/useSyncQueue";

export function SyncProvider() {
  useSyncQueue();

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const registerSW = async () => {
        try {
          const reg = await navigator.serviceWorker.register("/sw.js");
          console.log("✅ Service Worker registered:", reg);

          reg.onupdatefound = () => {
            const newWorker = reg.installing;
            if (newWorker) {
              newWorker.onstatechange = () => {
                if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                  console.log("♻️ New Service Worker available, updating...");
                  newWorker.postMessage({ type: "SKIP_WAITING" });
                }
              };
            }
          };
        } catch (err) {
          console.error("❌ Failed to register Service Worker:", err);
        }
      };

      registerSW();

      // ✅ رفع ارور TypeScript
      window.addEventListener("online", async () => {
        console.log("🌐 Back online, triggering sync...");
        const reg = await navigator.serviceWorker.ready;
        const swReg = reg as ServiceWorkerRegistration & {
          sync?: { register: (tag: string) => Promise<void> };
        };
        if (swReg.sync) {
          await swReg.sync.register("sync-queue");
        }
      });
    }
  }, []);

  return null;
}
