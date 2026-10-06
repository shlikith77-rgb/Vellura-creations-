import { Product } from '../types';

const DB_NAME = 'vellura_store_db';
const DB_VERSION = 1;
const STORE_NAME = 'products_store';

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Save products to IndexedDB (virtually unlimited capacity)
export async function saveProductsToIndexedDb(products: Product[]): Promise<boolean> {
  try {
    const db = await openDb();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put(products, 'all_products');
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
    });
  } catch (err) {
    console.warn('IndexedDB save skipped:', err);
    return false;
  }
}

// Load products from IndexedDB
export async function loadProductsFromIndexedDb(): Promise<Product[] | null> {
  try {
    const db = await openDb();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get('all_products');
      req.onsuccess = () => {
        if (Array.isArray(req.result)) {
          resolve(req.result);
        } else {
          resolve(null);
        }
      };
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}
