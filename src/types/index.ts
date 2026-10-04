export type ProductCategory = 'jewellery' | 'candles';

export type ProductSubcategory = 
  | 'all'
  | 'necklaces'
  | 'chokers'
  | 'bridal'
  | 'earrings'
  | 'rings'
  | 'bracelets'
  | 'bangles'
  | 'decorative_candles'
  | 'scented_candles'
  | 'gift_candles'
  | 'candle_sets';

export interface ProductVariant {
  id: string;
  name: string;
  color?: string;
  colorHex?: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  subcategory: ProductSubcategory;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  weight: string; // e.g. "135 g"
  size?: string; // e.g. "Adjustable Cord / 16 inch"
  availableSizes?: string[];
  variants?: ProductVariant[];
  material: string; // e.g. "High-Grade Brass Alloy, AAA+ CZ & Simulated Stones"
  finish: string; // e.g. "18K Antique Gold Finish"
  occasion?: string; // e.g. "Weddings, Sangeet, Festive Celebrations"
  fragrance?: string; // For candles
  waxType?: string; // For candles
  burnTime?: string; // For candles
  description: string;
  careInstructions: string[];
  stockQuantity: number;
  inStock: boolean;
  images: string[];
  pdfReferencePage?: number; // 1 to 18 from user's catalogue
  isFeatured?: boolean;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  sku: string;
}

export interface CartItem {
  id: string; // unique cart item id (productId + variant + size)
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedVariant?: string;
}

export type OrderStatus = 
  | 'New'
  | 'Confirmed'
  | 'Processing'
  | 'Ready to Ship'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled';

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: 'Cash on Delivery';
  status: OrderStatus;
  createdAt: string;
  notes?: string;
}

export interface Offer {
  id: string;
  title: string;
  subtitle: string;
  code: string;
  discountPercent: number;
  minOrderValue: number;
  badge: string;
  active: boolean;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  comment: string;
  productName: string;
  date: string;
  verifiedPurchase: boolean;
  isDemo: boolean;
}

export interface StoreSettings {
  storeName: string;
  whatsappNumber: string;
  displayPhone: string;
  address: string;
  city: string;
  googleMapsEmbedUrl: string;
  googleMapsDirectionsUrl: string;
  announcementText: string;
  freeShippingThreshold: number;
}

export interface SiteContent {
  heroKicker: string;
  heroHeadline: string;
  heroSupporting: string;
  heroPrimaryBtn: string;
  heroSecondaryBtn: string;
  heroTertiaryBtn: string;
  catalogTitle: string;
  catalogSubtitle: string;
  candleHeadline: string;
  candleSupporting: string;
  candleBannerTitle: string;
  candleBannerDesc: string;
  giftingHeadline: string;
  giftingSupporting: string;
  aboutTitle: string;
  aboutStory1: string;
  aboutStory2: string;
  aboutQuote: string;
  footerBrandDescription: string;
}

