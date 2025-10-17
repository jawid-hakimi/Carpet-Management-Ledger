import { openDB } from "idb";

export async function getDB() {
  return openDB("offline-app", 3, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("products")) {
        db.createObjectStore("products", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("queue")) {
        db.createObjectStore("queue", { keyPath: "id", autoIncrement: true }); // ✅ تغییر اینجا
      }
    },
  });
}
