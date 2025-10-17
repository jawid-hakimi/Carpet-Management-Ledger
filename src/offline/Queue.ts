import { getDB } from './db';

export async function addToQueue(request: any) {
  const db = await getDB();
  await db.put('queue', { ...request, timestamp: Date.now() });
}

export async function getQueuedRequests() {
  const db = await getDB();
  return db.getAll('queue');
}

export async function clearQueue() {
  const db = await getDB();
  const tx = db.transaction('queue', 'readwrite');
  await tx.store.clear();
  await tx.done;
}
