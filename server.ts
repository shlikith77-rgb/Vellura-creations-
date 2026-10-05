import express, { Request, Response, NextFunction } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { 
  initialProducts, 
  initialSiteContent, 
  initialOffers, 
  initialStoreSettings, 
  initialReviews 
} from './src/data/initialData.js';
import { Product, SiteContent, Offer, StoreSettings, Review, Order } from './src/types/index.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '1530452026';

// Active admin sessions: token -> { createdAt: number }
const adminSessions = new Map<string, { createdAt: number }>();

// Initial sample orders for preview
const initialSampleOrders: Order[] = [
  {
    id: 'VEL-2026-1042',
    customerName: 'Kavita Singhal',
    phone: '+91 98112 34567',
    whatsappNumber: '+91 98112 34567',
    email: 'kavita.singhal@example.com',
    address: 'Villa 14, Royal Palm Enclave, Sector 15',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302001',
    landmark: 'Opposite Central Park',
    items: [
      {
        id: 'sample-item-1',
        product: initialProducts[4] || initialProducts[0],
        quantity: 1,
        selectedSize: 'Adjustable Dori / Velvet Backing',
        selectedVariant: 'Emerald & Ruby Green Red',
      }
    ],
    subtotal: 5400,
    discount: 250,
    total: 5150,
    paymentMethod: 'Cash on Delivery',
    status: 'Processing',
    createdAt: '2026-10-02T14:30:00Z',
    notes: 'Please pack in luxury festive bridal packaging.',
  },
  {
    id: 'VEL-2026-1041',
    customerName: 'Megha Kapoor',
    phone: '+91 98765 43210',
    whatsappNumber: '+91 98765 43210',
    email: 'megha.kapoor@example.com',
    address: 'B-304, Emerald Heights, Linking Road',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
    items: [
      {
        id: 'sample-item-2',
        product: initialProducts[0],
        quantity: 1,
        selectedSize: 'Adjustable Cord (Standard 16-18 Inch)',
        selectedVariant: 'Dual Tone Pink & Blue Sapphire',
      }
    ],
    subtotal: 4170,
    discount: 417,
    total: 3753,
    paymentMethod: 'Cash on Delivery',
    status: 'Delivered',
    createdAt: '2026-09-30T10:15:00Z',
  }
];

// Persistent Store State
interface AppStore {
  products: Product[];
  siteContent: SiteContent;
  offers: Offer[];
  storeSettings: StoreSettings;
  reviews: Review[];
  orders: Order[];
}

const DATA_DIR = path.resolve(__dirname, 'data');
const STORE_FILE = path.join(DATA_DIR, 'store.json');

let store: AppStore = {
  products: [...initialProducts],
  siteContent: { ...initialSiteContent },
  offers: [...initialOffers],
  storeSettings: { ...initialStoreSettings },
  reviews: [...initialReviews],
  orders: [...initialSampleOrders],
};

// Load existing store data if present
try {
  if (fs.existsSync(STORE_FILE)) {
    const raw = fs.readFileSync(STORE_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (parsed.products && Array.isArray(parsed.products)) {
      store = {
        products: parsed.products,
        siteContent: { ...initialSiteContent, ...(parsed.siteContent || {}) },
        offers: parsed.offers || [...initialOffers],
        storeSettings: { ...initialStoreSettings, ...(parsed.storeSettings || {}) },
        reviews: parsed.reviews || [...initialReviews],
        orders: parsed.orders || [...initialSampleOrders],
      };
    }
  }
} catch (err) {
  console.warn('Could not read existing store.json, using defaults.', err);
}

// Asynchronously persist store data to file without blocking API requests
let saveTimer: NodeJS.Timeout | null = null;
function scheduleSave() {
  if (saveTimer) return;
  saveTimer = setTimeout(async () => {
    saveTimer = null;
    try {
      if (!fs.existsSync(DATA_DIR)) {
        await fs.promises.mkdir(DATA_DIR, { recursive: true });
      }
      await fs.promises.writeFile(STORE_FILE, JSON.stringify(store, null, 2), 'utf-8');
    } catch (e) {
      console.error('Failed to persist store.json:', e);
    }
  }, 100);
}

// Admin Authentication Middleware
function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      success: false, 
      error: 'Unauthorized: Admin authentication token required' 
    });
  }

  const token = authHeader.slice(7).trim();
  const session = adminSessions.get(token);

  if (!session) {
    return res.status(401).json({ 
      success: false, 
      error: 'Unauthorized: Invalid or expired admin session' 
    });
  }

  // Sessions valid for 7 days
  if (Date.now() - session.createdAt > 7 * 24 * 60 * 60 * 1000) {
    adminSessions.delete(token);
    return res.status(401).json({ 
      success: false, 
      error: 'Unauthorized: Admin session expired. Please log in again.' 
    });
  }

  next();
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '25mb' }));

  // ==========================================
  // AUTHENTICATION ROUTES
  // ==========================================
  app.post('/api/auth/login', (req: Request, res: Response) => {
    const { pin } = req.body || {};
    
    // Strict comparison on backend. Password is never leaked or hinted.
    if (typeof pin === 'string' && pin.trim() === ADMIN_PASSWORD) {
      const token = crypto.randomBytes(32).toString('hex');
      adminSessions.set(token, { createdAt: Date.now() });
      return res.json({ 
        success: true, 
        token, 
        message: 'Admin authenticated successfully' 
      });
    }

    // Always return clean, uninformative error on failure
    return res.status(401).json({ 
      success: false, 
      error: 'Incorrect password. Access denied.' 
    });
  });

  app.post('/api/auth/verify', (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, authenticated: false });
    }
    const token = authHeader.slice(7).trim();
    const session = adminSessions.get(token);
    if (!session || Date.now() - session.createdAt > 7 * 24 * 60 * 60 * 1000) {
      return res.status(401).json({ success: false, authenticated: false });
    }
    return res.json({ success: true, authenticated: true });
  });

  app.post('/api/auth/logout', (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice(7).trim();
      adminSessions.delete(token);
    }
    return res.json({ success: true });
  });

  // ==========================================
  // PUBLIC CLIENT ROUTES (Storefront reading & order placement)
  // ==========================================
  app.get('/api/products', (_req: Request, res: Response) => {
    res.json({ success: true, data: store.products });
  });

  app.get('/api/site-content', (_req: Request, res: Response) => {
    res.json({ success: true, data: store.siteContent });
  });

  app.get('/api/offers', (_req: Request, res: Response) => {
    res.json({ success: true, data: store.offers });
  });

  app.get('/api/store-settings', (_req: Request, res: Response) => {
    res.json({ success: true, data: store.storeSettings });
  });

  app.get('/api/reviews', (_req: Request, res: Response) => {
    res.json({ success: true, data: store.reviews });
  });

  app.post('/api/orders', (req: Request, res: Response) => {
    const newOrderData = req.body;
    if (!newOrderData || !newOrderData.customerName || !newOrderData.items) {
      return res.status(400).json({ success: false, error: 'Invalid order data' });
    }

    const orderId = `VEL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      ...newOrderData,
      id: orderId,
      status: 'New',
      createdAt: new Date().toISOString(),
    };

    store.orders.unshift(newOrder);
    scheduleSave();
    res.status(201).json({ success: true, data: newOrder });
  });

  // ==========================================
  // PROTECTED ADMIN ROUTES (Require valid session token)
  // ==========================================
  // 1. Products Management
  app.post('/api/admin/products', requireAdminAuth, (req: Request, res: Response) => {
    const productData = req.body;
    if (!productData || !productData.name) {
      return res.status(400).json({ success: false, error: 'Product name is required' });
    }

    const newProduct: Product = {
      ...productData,
      id: `vel-custom-${Date.now()}`,
      inStock: (productData.stockQuantity ?? 10) > 0,
      stockQuantity: productData.stockQuantity ?? 10,
      sku: productData.sku || `VEL-${Date.now().toString().slice(-4)}`,
      careInstructions: productData.careInstructions || ['Keep away from perfumes', 'Store in velvet box'],
    };

    store.products.unshift(newProduct);
    scheduleSave();
    return res.status(201).json({ success: true, data: newProduct });
  });

  app.put('/api/admin/products/:id', requireAdminAuth, (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;
    const index = store.products.findIndex(p => p.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    const updated = { ...store.products[index], ...updates };
    if (updates.stockQuantity !== undefined) {
      updated.inStock = updates.stockQuantity > 0;
    }
    store.products[index] = updated;
    scheduleSave();
    return res.json({ success: true, data: updated });
  });

  app.delete('/api/admin/products/:id', requireAdminAuth, (req: Request, res: Response) => {
    const { id } = req.params;
    const initialLen = store.products.length;
    store.products = store.products.filter(p => p.id !== id);

    if (store.products.length === initialLen) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    scheduleSave();
    return res.json({ success: true, id });
  });

  app.patch('/api/admin/products/:id/stock', requireAdminAuth, (req: Request, res: Response) => {
    const { id } = req.params;
    const { stockQuantity } = req.body;

    if (typeof stockQuantity !== 'number') {
      return res.status(400).json({ success: false, error: 'stockQuantity number is required' });
    }

    const product = store.products.find(p => p.id === id);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    product.stockQuantity = Math.max(0, stockQuantity);
    product.inStock = product.stockQuantity > 0;
    scheduleSave();
    return res.json({ success: true, data: product });
  });

  app.post('/api/admin/products/reset', requireAdminAuth, (_req: Request, res: Response) => {
    store.products = [...initialProducts];
    scheduleSave();
    return res.json({ success: true, data: store.products });
  });

  // 2. Site Content & Words Editor
  app.put('/api/admin/site-content', requireAdminAuth, (req: Request, res: Response) => {
    const updates = req.body;
    store.siteContent = { ...store.siteContent, ...updates };
    scheduleSave();
    return res.json({ success: true, data: store.siteContent });
  });

  app.post('/api/admin/site-content/reset', requireAdminAuth, (_req: Request, res: Response) => {
    store.siteContent = { ...initialSiteContent };
    scheduleSave();
    return res.json({ success: true, data: store.siteContent });
  });

  // 3. Orders Management
  app.get('/api/admin/orders', requireAdminAuth, (_req: Request, res: Response) => {
    return res.json({ success: true, data: store.orders });
  });

  app.patch('/api/admin/orders/:id/status', requireAdminAuth, (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const order = store.orders.find(o => o.id === id);

    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    order.status = status;
    scheduleSave();
    return res.json({ success: true, data: order });
  });

  app.delete('/api/admin/orders/:id', requireAdminAuth, (req: Request, res: Response) => {
    const { id } = req.params;
    store.orders = store.orders.filter(o => o.id !== id);
    scheduleSave();
    return res.json({ success: true, id });
  });

  // 4. Offers & Coupons
  app.put('/api/admin/offers/:id', requireAdminAuth, (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;
    const index = store.offers.findIndex(o => o.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Offer not found' });
    }

    store.offers[index] = { ...store.offers[index], ...updates };
    scheduleSave();
    return res.json({ success: true, data: store.offers[index] });
  });

  // 5. Store Settings & Business Configuration
  app.put('/api/admin/settings', requireAdminAuth, (req: Request, res: Response) => {
    const updates = req.body;
    store.storeSettings = { ...store.storeSettings, ...updates };
    scheduleSave();
    return res.json({ success: true, data: store.storeSettings });
  });

  // 6. Reviews Management
  app.delete('/api/admin/reviews/:id', requireAdminAuth, (req: Request, res: Response) => {
    const { id } = req.params;
    store.reviews = store.reviews.filter(r => r.id !== id);
    scheduleSave();
    return res.json({ success: true, id });
  });

  // ==========================================
  // VITE DEV MIDDLEWARE OR PRODUCTION STATIC
  // ==========================================
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Vellura Creations server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});
