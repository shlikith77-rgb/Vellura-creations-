import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { CategoryShowcase } from './components/CategoryShowcase';
import { CatalogSection } from './components/CatalogSection';
import { CandleSection } from './components/CandleSection';
import { OffersSection } from './components/OffersSection';
import { GiftingSection } from './components/GiftingSection';
import { AboutSection } from './components/AboutSection';
import { CustomerReviews } from './components/CustomerReviews';
import { InstagramGallery } from './components/InstagramGallery';
import { GoogleMapsSection } from './components/GoogleMapsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { PolicyModal } from './components/PolicyModal';
import { AdminDashboard } from './components/AdminDashboard';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ShoppingBag, ArrowRight } from 'lucide-react';

const MainContent: React.FC = () => {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    cartCount, 
    cartTotal, 
    setIsCartOpen, 
    setIsCheckoutOpen,
    setIsAdminOpen 
  } = useShop();

  // Directly visiting the Admin Panel URL (/admin or #admin) triggers authentication
  React.useEffect(() => {
    const checkAdminRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path === '/admin' || path === '/admin/' || hash === '#admin') {
        setIsAdminOpen(true);
      }
    };
    checkAdminRoute();
    window.addEventListener('popstate', checkAdminRoute);
    window.addEventListener('hashchange', checkAdminRoute);
    return () => {
      window.removeEventListener('popstate', checkAdminRoute);
      window.removeEventListener('hashchange', checkAdminRoute);
    };
  }, [setIsAdminOpen]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] flex flex-col font-sans selection:bg-[#D4AF37]/20 w-full max-w-full overflow-x-hidden relative">
      {/* Sticky Header */}
      <Header />

      {/* Main Page Flow */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        <Hero />
        <TrustStrip />
        <CategoryShowcase />
        <CatalogSection />
        <CandleSection />
        <OffersSection />
        <GiftingSection />
        <AboutSection />
        <CustomerReviews />
        <InstagramGallery />
        <GoogleMapsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals & Drawers */}
      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
      <CartDrawer />
      <CheckoutModal />
      <OrderConfirmationModal />
      <PolicyModal />
      <AdminDashboard />

      {/* Floating Concierge */}
      <FloatingWhatsApp />

      {/* Mobile Sticky Mini Cart Bar (visible only on mobile if items exist, adhering to <15% viewport height) */}
      {cartCount > 0 && (
        <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-[#121214] text-[#FAF8F5] p-3 border-t border-[#D4AF37]/30 shadow-2xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#6B1D2F] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </div>
            <div>
              <p className="text-[11px] text-[#8E8B85]">Subtotal ({cartCount} items)</p>
              <p className="font-serif text-sm font-semibold text-[#FAF8F5] tabular-nums">
                ₹{cartTotal.toLocaleString('en-IN')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className="px-3 py-1.5 border border-[#D4AF37]/50 text-xs text-[#FAF8F5] uppercase tracking-wider"
            >
              Bag
            </button>
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="px-4 py-1.5 bg-[#6B1D2F] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1 shadow-md"
            >
              <span>Checkout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}
