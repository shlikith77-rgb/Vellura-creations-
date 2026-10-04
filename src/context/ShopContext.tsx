import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  Order, 
  OrderStatus, 
  Offer, 
  Review, 
  StoreSettings, 
  ProductCategory, 
  ProductSubcategory,
  SiteContent
} from '../types';
import { initialProducts, initialOffers, initialReviews, initialStoreSettings, initialSiteContent } from '../data/initialData';

interface ShopContextType {
  // Admin Auth
  isAdminAuthenticated: boolean;
  loginAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;

  // Site Content
  siteContent: SiteContent;
  updateSiteContent: (updates: Partial<SiteContent>) => void;
  resetSiteContent: () => void;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateStock: (id: string, newStock: number) => void;
  resetToDefaultProducts: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedSize?: string, selectedVariant?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartDiscount: number;
  cartTotal: number;
  cartCount: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Orders
  orders: Order[];
  placeOrder: (orderData: {
    customerName: string;
    phone: string;
    whatsappNumber: string;
    email: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    landmark?: string;
    notes?: string;
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  deleteOrder: (orderId: string) => void;

  // Search & Filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: ProductCategory | 'all';
  setSelectedCategory: (cat: ProductCategory | 'all') => void;
  selectedSubcategory: ProductSubcategory;
  setSelectedSubcategory: (sub: ProductSubcategory) => void;
  sortBy: 'featured' | 'newest' | 'price_asc' | 'price_desc' | 'bestselling';
  setSortBy: (sort: 'featured' | 'newest' | 'price_asc' | 'price_desc' | 'bestselling') => void;
  filteredProducts: Product[];

  // Navigation & Modals
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  confirmedOrder: Order | null;
  setConfirmedOrder: (order: Order | null) => void;
  activePolicy: string | null;
  setActivePolicy: (policy: string | null) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;

  // Offers
  offers: Offer[];
  appliedOffer: Offer | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  updateOffer: (id: string, updates: Partial<Offer>) => void;

  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  deleteReview: (id: string) => void;

  // Store Settings
  storeSettings: StoreSettings;
  updateStoreSettings: (updates: Partial<StoreSettings>) => void;

  // WhatsApp Helpers
  getWhatsAppOrderUrl: (order: Order) => string;
  getWhatsAppProductEnquiryUrl: (product: Product) => string;
  getWhatsAppDirectUrl: (message?: string) => string;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Admin Authentication (Password: 153045)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('vellura_admin_auth') === 'true';
  });

  const loginAdmin = (pin: string): boolean => {
    if (pin.trim() === '153045') {
      setIsAdminAuthenticated(true);
      localStorage.setItem('vellura_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('vellura_admin_auth');
  };

  // Editable Site Content (Allows changing words, texts, slogans across the website)
  const [siteContent, setSiteContent] = useState<SiteContent>(() => {
    const saved = localStorage.getItem('vellura_site_content');
    if (saved) {
      try {
        return { ...initialSiteContent, ...JSON.parse(saved) };
      } catch (e) {
        console.error('Error parsing site content', e);
      }
    }
    return initialSiteContent;
  });

  useEffect(() => {
    localStorage.setItem('vellura_site_content', JSON.stringify(siteContent));
  }, [siteContent]);

  const updateSiteContent = (updates: Partial<SiteContent>) => {
    setSiteContent(prev => ({ ...prev, ...updates }));
  };

  const resetSiteContent = () => {
    setSiteContent(initialSiteContent);
    localStorage.removeItem('vellura_site_content');
  };

  // 1. Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('vellura_products_v3');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing stored products', e);
      }
    }
    return initialProducts;
  });

  useEffect(() => {
    localStorage.setItem('vellura_products_v3', JSON.stringify(products));
  }, [products]);

  // 2. Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('vellura_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing stored cart', e);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('vellura_cart', JSON.stringify(cart));
  }, [cart]);

  // 3. Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('vellura_wishlist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing wishlist', e);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('vellura_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // 4. Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('vellura_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing orders', e);
      }
    }
    // Initial sample orders for admin preview
    return [
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
            product: initialProducts[4], // Heritage Emerald Beaded Choker
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
            product: initialProducts[0], // Pink Tourmaline Oval Link Necklace
            quantity: 1,
            selectedSize: 'Adjustable Cord (Standard 16-18 Inch)',
            selectedVariant: 'Dual Tone Pink & Blue Sapphire',
          },
          {
            id: 'sample-item-3',
            product: initialProducts[17], // Floating flower candles
            quantity: 2,
            selectedVariant: 'Festive Vibrant Assorted',
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
  });

  useEffect(() => {
    localStorage.setItem('vellura_orders', JSON.stringify(orders));
  }, [orders]);

  // 5. Store Settings
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem('vellura_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing settings', e);
      }
    }
    return initialStoreSettings;
  });

  useEffect(() => {
    localStorage.setItem('vellura_settings', JSON.stringify(storeSettings));
  }, [storeSettings]);

  // 6. Offers
  const [offers, setOffers] = useState<Offer[]>(() => {
    const saved = localStorage.getItem('vellura_offers');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing offers', e);
      }
    }
    return initialOffers;
  });

  useEffect(() => {
    localStorage.setItem('vellura_offers', JSON.stringify(offers));
  }, [offers]);

  const [appliedOffer, setAppliedOffer] = useState<Offer | null>(null);

  // 7. Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('vellura_reviews');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing reviews', e);
      }
    }
    return initialReviews;
  });

  useEffect(() => {
    localStorage.setItem('vellura_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // UI state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<ProductSubcategory>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price_asc' | 'price_desc' | 'bestselling'>('featured');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [activePolicy, setActivePolicy] = useState<string | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Cart operations
  const addToCart = (
    product: Product, 
    quantity = 1, 
    selectedSize?: string, 
    selectedVariant?: string
  ) => {
    if (!product.inStock || product.stockQuantity <= 0) return;

    setCart(prev => {
      const sizeToUse = selectedSize || (product.availableSizes ? product.availableSizes[0] : undefined);
      const variantToUse = selectedVariant || (product.variants ? product.variants[0]?.name : undefined);
      const cartItemId = `${product.id}-${sizeToUse || 'nosize'}-${variantToUse || 'novariant'}`;

      const existingIndex = prev.findIndex(item => item.id === cartItemId);
      if (existingIndex > -1) {
        const next = [...prev];
        const newQty = Math.min(next[existingIndex].quantity + quantity, product.stockQuantity);
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: newQty
        };
        return next;
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            product,
            quantity: Math.min(quantity, product.stockQuantity),
            selectedSize: sizeToUse,
            selectedVariant: variantToUse,
          }
        ];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.id === cartItemId) {
        const cappedQty = Math.min(quantity, item.product.stockQuantity);
        return { ...item, quantity: cappedQty };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedOffer(null);
  };

  // Cart financial calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartDiscount = appliedOffer && cartSubtotal >= appliedOffer.minOrderValue 
    ? Math.round((cartSubtotal * appliedOffer.discountPercent) / 100) 
    : 0;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Coupon handling
  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = offers.find(o => o.code.toUpperCase() === cleanCode && o.active);
    if (!found) {
      return { success: false, message: 'Invalid or expired coupon code.' };
    }
    if (cartSubtotal < found.minOrderValue) {
      return { 
        success: false, 
        message: `Minimum order value for ${found.code} is ₹${found.minOrderValue.toLocaleString('en-IN')}.` 
      };
    }
    setAppliedOffer(found);
    return { success: true, message: `Coupon ${found.code} applied! Saved ₹${Math.round((cartSubtotal * found.discountPercent)/100)}` };
  };

  const removeCoupon = () => {
    setAppliedOffer(null);
  };

  // Order Placement (COD with unique ID generation)
  const placeOrder = (orderData: {
    customerName: string;
    phone: string;
    whatsappNumber: string;
    email: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    landmark?: string;
    notes?: string;
  }): Order => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `VEL-2026-${randomSuffix}`;

    const newOrder: Order = {
      id: orderId,
      ...orderData,
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      total: cartTotal,
      paymentMethod: 'Cash on Delivery',
      status: 'New',
      createdAt: new Date().toISOString(),
    };

    // Decrement stock in catalog
    setProducts(prev => prev.map(prod => {
      const cartItem = cart.find(ci => ci.product.id === prod.id);
      if (cartItem) {
        const remainingStock = Math.max(0, prod.stockQuantity - cartItem.quantity);
        return {
          ...prod,
          stockQuantity: remainingStock,
          inStock: remainingStock > 0,
        };
      }
      return prod;
    }));

    setOrders(prev => [newOrder, ...prev]);
    setConfirmedOrder(newOrder);
    clearCart();
    setIsCheckoutOpen(false);

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(ord => ord.id === orderId ? { ...ord, status } : ord));
  };

  const deleteOrder = (orderId: string) => {
    setOrders(prev => prev.filter(ord => ord.id !== orderId));
  };

  // Product Admin Operations
  const addProduct = (newProdData: Omit<Product, 'id'>) => {
    const newId = `vel-custom-${Date.now()}`;
    const newProduct: Product = {
      ...newProdData,
      id: newId,
      inStock: newProdData.stockQuantity > 0,
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const updated = { ...p, ...updates };
        if (updates.stockQuantity !== undefined) {
          updated.inStock = updates.stockQuantity > 0;
        }
        return updated;
      }
      return p;
    }));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const updateStock = (id: string, newStock: number) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          stockQuantity: newStock,
          inStock: newStock > 0,
        };
      }
      return p;
    }));
  };

  const resetToDefaultProducts = () => {
    setProducts(initialProducts);
    localStorage.removeItem('vellura_products_v3');
  };

  const updateStoreSettings = (updates: Partial<StoreSettings>) => {
    setStoreSettings(prev => ({ ...prev, ...updates }));
  };

  const updateOffer = (id: string, updates: Partial<Offer>) => {
    setOffers(prev => prev.map(o => o.id === id ? { ...o, ...updates } : o));
  };

  const addReview = (newReview: Omit<Review, 'id' | 'date'>) => {
    const created: Review = {
      ...newReview,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    };
    setReviews(prev => [created, ...prev]);
  };

  const deleteReview = (id: string) => {
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  // WhatsApp formatted URLs
  // Requirements:
  // Owner Number: +91 92533 42413 -> 919253342413
  const targetPhone = storeSettings.whatsappNumber.replace(/[^0-9]/g, '');

  const getWhatsAppDirectUrl = (message?: string) => {
    const text = message || `Hello Vellura Creations, I would like to inquire about your jewellery and candle collections.`;
    return `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`;
  };

  const getWhatsAppProductEnquiryUrl = (product: Product) => {
    const text = `Hello Vellura Creations, I am interested in ${product.name}. Product Price: ₹${product.price.toLocaleString('en-IN')}. Please share more details.`;
    return `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`;
  };

  const getWhatsAppOrderUrl = (order: Order) => {
    const productLines = order.items.map(i => {
      const details = [
        i.selectedVariant ? `Variant: ${i.selectedVariant}` : '',
        i.selectedSize ? `Size: ${i.selectedSize}` : ''
      ].filter(Boolean).join(', ');
      return `• ${i.product.name} (Qty: ${i.quantity}${details ? ` | ${details}` : ''}) - ₹${(i.product.price * i.quantity).toLocaleString('en-IN')}`;
    }).join('\n');

    const totalQty = order.items.reduce((acc, i) => acc + i.quantity, 0);

    const message = 
`New Vellura Creations Order

Order ID: #${order.id}

Customer Name: ${order.customerName}
Phone: ${order.phone}
WhatsApp: ${order.whatsappNumber}
Address: ${order.address}, ${order.city}, ${order.state} - ${order.pincode}${order.landmark ? ` (Landmark: ${order.landmark})` : ''}

Products:
${productLines}

Quantity: ${totalQty}
Subtotal: ₹${order.subtotal.toLocaleString('en-IN')}
Discount: ₹${order.discount.toLocaleString('en-IN')}
Total: ₹${order.total.toLocaleString('en-IN')}
Payment: Cash on Delivery

Please confirm my order. Thank you!`;

    return `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
  };

  // Filtering and Sorting
  const filteredProducts = products.filter(product => {
    // 1. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = product.name.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchMat = product.material.toLowerCase().includes(q);
      const matchOcc = product.occasion?.toLowerCase().includes(q) || false;
      const matchSku = product.sku.toLowerCase().includes(q);
      const matchCat = product.category.toLowerCase().includes(q);
      const matchSub = product.subcategory.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchMat && !matchOcc && !matchSku && !matchCat && !matchSub) {
        return false;
      }
    }

    // 2. Category
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }

    // 3. Subcategory
    if (selectedSubcategory !== 'all' && product.subcategory !== selectedSubcategory) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
    if (sortBy === 'price_asc') return a.price - b.price;
    if (sortBy === 'price_desc') return b.price - a.price;
    if (sortBy === 'bestselling') return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
    // featured
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  return (
    <ShopContext.Provider
      value={{
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        siteContent,
        updateSiteContent,
        resetSiteContent,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        resetToDefaultProducts,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartDiscount,
        cartTotal,
        cartCount,
        wishlist,
        toggleWishlist,
        isInWishlist,
        orders,
        placeOrder,
        updateOrderStatus,
        deleteOrder,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedSubcategory,
        setSelectedSubcategory,
        sortBy,
        setSortBy,
        filteredProducts,
        selectedProduct,
        setSelectedProduct,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        confirmedOrder,
        setConfirmedOrder,
        activePolicy,
        setActivePolicy,
        isAdminOpen,
        setIsAdminOpen,
        offers,
        appliedOffer,
        applyCoupon,
        removeCoupon,
        updateOffer,
        reviews,
        addReview,
        deleteReview,
        storeSettings,
        updateStoreSettings,
        getWhatsAppOrderUrl,
        getWhatsAppProductEnquiryUrl,
        getWhatsAppDirectUrl,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
