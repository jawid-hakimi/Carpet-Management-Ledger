"use client";
import { useEffect } from 'react';
import { getQueuedRequests, clearQueue } from '../Queue';

export function useSyncQueue() {
  useEffect(() => {
    const syncQueuedRequests = async () => {
      if (!navigator.onLine) return;

      const queued = await getQueuedRequests();
      console.log(`🔄 Syncing ${queued.length} queued requests...`);

      for (const req of queued) {
        try {
          // ساخت options از داده‌های موجود
          const fetchOptions: RequestInit = {
            method: req.method || 'GET',
            headers: req.headers,
            body: req.data as BodyInit
          };

          await fetch(req.url, fetchOptions);
          console.log('✅ Synced request:', req.url);
        } catch (err) {
          console.warn('⚠️ Failed to sync request:', req.url);
        }
      }
      
      await clearQueue();
      console.log('🎉 Queue synced and cleared');
    };

    window.addEventListener('online', syncQueuedRequests);
    const interval = setInterval(syncQueuedRequests, 24 * 60 * 60 * 1000);

    return () => {
      window.removeEventListener('online', syncQueuedRequests);
      clearInterval(interval);
    };
  }, []);
}