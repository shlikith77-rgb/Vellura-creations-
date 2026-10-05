import { Product, Offer, Review, StoreSettings, SiteContent } from '../types';

export const initialSiteContent: SiteContent = {
  heroKicker: 'Established Luxury Showroom',
  heroHeadline: 'Elegance That Makes Every Moment Beautiful',
  heroSupporting: 'Discover exquisite artificial jewellery and beautifully crafted decorative candles, curated for celebrations, gifting and everyday elegance.',
  heroPrimaryBtn: 'Shop Jewellery',
  heroSecondaryBtn: 'Explore Candles',
  heroTertiaryBtn: 'Shop The Collection',
  catalogTitle: 'THE JEWELLERY EDIT',
  catalogSubtitle: 'Statement pieces designed to make every look unforgettable. Hand-inspected by our established city jewellery showroom.',
  candleHeadline: 'LIGHT. FRAGRANCE. BEAUTY.',
  candleSupporting: 'Decorative candles designed to add warmth, colour and character to every space and celebration. Hand-poured with natural scents and vibrant floral contours.',
  candleBannerTitle: 'Floating Lotus & Marigold Diya Collection',
  candleBannerDesc: 'Designed specifically for traditional brass urlis, water bowls, festive rangolis and celebration hampers. Infused with natural rose, sandalwood, and sweet marigold essences.',
  giftingHeadline: 'GIFTS THAT SPEAK WITHOUT WORDS',
  giftingSupporting: 'Whether celebrating a sacred union, a festive milestone, or an intimate birthday, our jewellery and handcrafted candle combinations are boxed in luxury velvet hampers to leave an unforgettable impression.',
  aboutTitle: 'Where Elegance Meets Expression',
  aboutStory1: 'Vellura Creations brings together elegant artificial jewellery and beautifully designed decorative candles for discerning customers who cherish beauty, personal style, and thoughtful gifting without compromising on presentation.',
  aboutStory2: 'As an established and well-known artificial jewellery dealer in our city, our collection is curated with an eye for majestic stone settings, enduring antique polishes, and celebratory warmth. From grand wedding celebrations and sangeet evenings to warm festival pujas, we ensure every moment is adorned with grace.',
  aboutQuote: '“Jewellery that completes your look. Candles that complete your moments.”',
  footerBrandDescription: 'An established and well-known artificial jewellery dealer in our city. Curated collections of luxury artificial bridal sets, Kundan chokers, and handcrafted decorative candles for life\'s most cherished celebrations.',
};

export const initialStoreSettings: StoreSettings = {
  storeName: 'VELLURA CREATIONS',
  whatsappNumber: '+91 92533 42413',
  displayPhone: '+91 92533 42413',
  address: 'Vellura Creations Luxury Showroom, Main Commercial Market, Central City',
  city: 'Central City, India',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.5620921473187!2d77.2090212!3d28.6139391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM2JzUwLjIiTiA3N8KwMTInMzIuNSJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin',
  googleMapsDirectionsUrl: 'https://maps.google.com/?q=Vellura+Creations+Jewellery+and+Candles',
  announcementText: 'Timeless Style. Thoughtfully Crafted. Made to Make Every Moment Special.',
  freeShippingThreshold: 1500,
};

export const initialOffers: Offer[] = [
  {
    id: 'off-1',
    title: 'FESTIVE EDIT',
    subtitle: 'Elevate your celebrations with curated luxury jewellery',
    code: 'FESTIVE15',
    discountPercent: 15,
    minOrderValue: 2000,
    badge: 'Limited-Time Collection',
    active: true,
  },
  {
    id: 'off-2',
    title: 'SPECIAL GIFTING COLLECTION',
    subtitle: 'Complimentary luxury gift box packaging on all jewellery sets',
    code: 'GIFTBOX',
    discountPercent: 10,
    minOrderValue: 1500,
    badge: 'Special Gifting',
    active: true,
  },
  {
    id: 'off-3',
    title: 'BUY MORE, SAVE MORE',
    subtitle: 'Extra ₹250 off on combo orders containing jewellery and candles',
    code: 'COMBO250',
    discountPercent: 12,
    minOrderValue: 3000,
    badge: 'Combo Offer',
    active: true,
  },
];

export const initialReviews: Review[] = [
  {
    id: 'rev-1',
    author: 'Pooja Sharma',
    location: 'Jaipur',
    rating: 5,
    comment: 'The craftsmanship on the jewellery is beyond breathtaking. The finish looks just like real gold and uncut polki. Beautiful presentation in a luxury velvet box!',
    productName: 'Custom Handcrafted Showroom Jewellery',
    date: '28 Sep 2026',
    verifiedPurchase: true,
    isDemo: true,
  },
  {
    id: 'rev-2',
    author: 'Ananya Verma',
    location: 'Delhi NCR',
    rating: 5,
    comment: 'Ordered for my sister’s sangeet celebration. The weight and stone setting are very premium, comfortable to wear for hours. Excellent WhatsApp support by the team.',
    productName: 'Heritage Bridal Collection',
    date: '22 Sep 2026',
    verifiedPurchase: true,
    isDemo: true,
  },
  {
    id: 'rev-3',
    author: 'Meenakshi Iyer',
    location: 'Bangalore',
    rating: 5,
    comment: 'The handcrafted floating flower candles gave our pooja setup the most divine aroma and radiant glow. Such vibrant colors and long burn time.',
    productName: 'Handcrafted Floating Decorative Candles',
    date: '15 Sep 2026',
    verifiedPurchase: true,
    isDemo: true,
  },
  {
    id: 'rev-4',
    author: 'Radhika Patel',
    location: 'Ahmedabad',
    rating: 5,
    comment: 'Vellura Creations has become our go-to for all family wedding jewellery. Unmatched dealer trust, prompt Cash on Delivery and authentic showroom quality.',
    productName: 'Royal Filigree Collection',
    date: '10 Sep 2026',
    verifiedPurchase: true,
    isDemo: true,
  }
];

// Initial empty catalog for jewellery and candles (ready for admin to add products)
export const initialProducts: Product[] = [];
