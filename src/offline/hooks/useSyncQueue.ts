"use client";
import { useEffect } from 'react';
import { getQueuedRequests, clearQueue } from '../Queue';

export function useSyncQueue() {
  useEffect(() => {
    const syncQueuedRequests = async () => {
      if (!navigator.onLine) return;

      const queued = await getQueuedRequests();
      for (const req of queued) {
        try {
          await fetch(req.url, req.options);
          console.log('✅ Synced request:', req.url);
        } catch (err) {
          console.warn('⚠️ Failed to sync request:', req.url);
        }
      }
      await clearQueue();
    };

    // هر بار اینترنت وصل شد
    window.addEventListener('online', syncQueuedRequests);

    // هر ۲۴ ساعت یکبار هم sync کن
    const interval = setInterval(syncQueuedRequests, 24 * 60 * 60 * 1000);

    return () => {
      window.removeEventListener('online', syncQueuedRequests);
      clearInterval(interval);
    };
  }, []);
}
