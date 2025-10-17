// ====== نصب اولیه ======
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("static-cache").then((cache) => {
      return cache.addAll(["/", "/manifest.json", "/icon-192x192.png"]);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

// ====== کش کردن درخواست‌های GET ======
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // فقط GET را کش کن
  if (request.method === "GET") {
    event.respondWith(
      caches.open("static-cache").then(async (cache) => {
        try {
          const res = await fetch(request);
          cache.put(request, res.clone());
          return res;
        } catch (error) {
          const cached = await cache.match(request);
          return cached || Response.error();
        }
      })
    );
  }

  // اگر POST/PUT/DELETE باشد و آفلاین باشیم، در queue ذخیره کن
  if (["POST", "PUT", "PATCH", "DELETE"].includes(request.method)) {
    event.respondWith(
      (async () => {
        try {
          return await fetch(request.clone());
        } catch (err) {
          // اگر آفلاین بودیم، ذخیره در IndexedDB داخلی Service Worker
          const body = await request.clone().json().catch(() => null);
          const queuedRequest = {
            url: request.url,
            method: request.method,
            body,
            headers: [...request.headers],
          };
          const db = await openDB();
          const tx = db.transaction("queue", "readwrite");
          tx.store.add(queuedRequest);
          await tx.done;

          // ثبت برای sync بعدی
          if ("sync" in registration) {
            await registration.sync.register("sync-queue");
            console.log("📦 Request queued for background sync:", request.url);
          }
          return new Response(
            JSON.stringify({ offline: true, queued: true }),
            { headers: { "Content-Type": "application/json" } }
          );
        }
      })()
    );
  }
});

// ====== Background Sync Event ======
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-queue") {
    event.waitUntil(processQueue());
  }
});

// ====== پردازش صف ======
async function processQueue() {
  const db = await openDB();
  const tx = db.transaction("queue", "readwrite");
  const all = await tx.store.getAll();
  for (const req of all) {
    try {
      await fetch(req.url, {
        method: req.method,
        headers: req.headers,
        body: req.body ? JSON.stringify(req.body) : undefined,
      });
      console.log("✅ Synced:", req.url);
      await tx.store.delete(req.id);
    } catch (err) {
      console.warn("⚠️ Failed to sync:", req.url);
    }
  }
  await tx.done;
}

// ====== IndexedDB Helper ======
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("offline-sw-db", 1);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("queue")) {
        db.createObjectStore("queue", { keyPath: "id", autoIncrement: true });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = (e) => reject(e);
  });
}
