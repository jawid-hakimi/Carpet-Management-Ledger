// src/offline/Queue.ts
import { getDB } from './db';

// تعریف interface برای request
interface QueueRequest {
  url: string;
  method: string;
  data?: unknown;
  headers?: Record<string, string>;
  id?: string | number;
  // سایر فیلدهای مورد نیاز
}

interface QueuedItem extends QueueRequest {
  timestamp: number;
}

export async function addToQueue(request: QueueRequest) {
  const db = await getDB();
  const item: QueuedItem = {
    ...request,
    timestamp: Date.now()
  };
  await db.put('queue', item);
}

export async function getQueuedRequests(): Promise<QueuedItem[]> {
  const db = await getDB();
  return db.getAll('queue');
}

export async function clearQueue() {
  const db = await getDB();
  const tx = db.transaction('queue', 'readwrite');
  await tx.store.clear();
  await tx.done;
}