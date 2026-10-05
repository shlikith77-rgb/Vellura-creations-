import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, MessageCircle, Menu, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Header: React.FC = () => {
  const { 
    cartCount, 
    wishlist, 
    setIsCartOpen, 
    searchQuery, 
    setSearchQuery, 
    setSelectedCategory,
    setSelectedSubcategory,
    storeSettings,
    getWhatsAppDirectUrl
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleNavClick = (sectionId: string, category?: 'jewellery' | 'candles' | 'all', sub?: any) => {
    if (category) setSelectedCategory(category);
    if (sub) setSelectedSubcategory(sub);
    setMobileMenuOpen(false);

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#121214] text-[#FAF8F5] border-b border-[#D4AF37]/20 shadow-md">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-[#1A1A1E] via-[#2A1B14] to-[#1A1A1E] border-b border-[#D4AF37]/15 py-1.5 px-4 text-center">
        <p className="text-xs tracking-wider text-[#DCD6CB] font-light">
          {storeSettings.announcementText}
        </p>
      </div>

      {/* Main Navigation Bar - Following Top Bar Contract: 3 Zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#DCD6CB] hover:text-[#D4AF37] transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Zone 1: Brand Wordmark (Single text element in display serif) */}
        <div className="flex items-center">
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }}
            className="font-serif text-2xl sm:text-3xl tracking-[0.18em] font-semibold text-[#FAF8F5] hover:text-[#E6CA65] transition-colors whitespace-nowrap"
          >
            {storeSettings.storeName}
          </a>
        </div>

        {/* Zone 2: 4-6 Clean Text Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-[0.2em] font-medium text-[#DCD6CB]">
          <button 
            onClick={() => handleNavClick('hero')} 
            className="hover:text-[#D4AF37] transition-colors pb-1 border-b-2 border-transparent hover:border-[#D4AF37]"
          >
            Home
          </button>
          <button 
            onClick={() => handleNavClick('catalog', 'jewellery', 'all')} 
            className="hover:text-[#D4AF37] transition-colors pb-1 border-b-2 border-transparent hover:border-[#D4AF37]"
          >
            Jewellery
          </button>
          <button 
            onClick={() => handleNavClick('candles', 'candles', 'all')} 
            className="hover:text-[#D4AF37] transition-colors pb-1 border-b-2 border-transparent hover:border-[#D4AF37]"
          >
            Candles
          </button>
          <button 
            onClick={() => handleNavClick('collections')} 
            className="hover:text-[#D4AF37] transition-colors pb-1 border-b-2 border-transparent hover:border-[#D4AF37]"
          >
            Collections
          </button>
          <button 
            onClick={() => handleNavClick('offers')} 
            className="hover:text-[#D4AF37] transition-colors pb-1 border-b-2 border-transparent hover:border-[#D4AF37]"
          >
            Offers
          </button>
          <button 
            onClick={() => handleNavClick('about')} 
            className="hover:text-[#D4AF37] transition-colors pb-1 border-b-2 border-transparent hover:border-[#D4AF37]"
          >
            About Us
          </button>
          <button 
            onClick={() => handleNavClick('contact')} 
            className="hover:text-[#D4AF37] transition-colors pb-1 border-b-2 border-transparent hover:border-[#D4AF37]"
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: Interactive Affordances (Search, Wishlist, Cart, WhatsApp, Admin) */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Quick Search Toggle */}
          <div className="relative flex items-center">
            {showSearchInput ? (
              <div className="flex items-center bg-[#1E1E22] border border-[#D4AF37]/40 px-2.5 py-1 shadow-inner">
                <input
                  type="text"
                  placeholder="Search necklace, ring, candle..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-xs text-[#FAF8F5] focus:outline-none w-36 sm:w-48 placeholder-[#8E8B85]"
                  autoFocus
                />
                <button 
                  onClick={() => { setShowSearchInput(false); setSearchQuery(''); }}
                  className="text-xs text-[#8E8B85] hover:text-[#FAF8F5] ml-1"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button 
                onClick={() => {
                  setShowSearchInput(true);
                  handleNavClick('catalog');
                }}
                className="p-2 text-[#DCD6CB] hover:text-[#D4AF37] transition-colors"
                title="Search Products"
                aria-label="Search Catalog"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Wishlist */}
          <button 
            onClick={() => handleNavClick('catalog')} 
            className="relative p-2 text-[#DCD6CB] hover:text-[#D4AF37] transition-colors"
            title="Wishlist"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#6B1D2F] border border-[#D4AF37] text-[10px] font-bold rounded-full flex items-center justify-center text-white">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Cart Drawer Trigger */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-[#DCD6CB] hover:text-[#D4AF37] transition-colors"
            title="View Cart"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D4AF37] text-[#121214] text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* WhatsApp Direct Chat Button */}
          <a
            href={getWhatsAppDirectUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] text-xs font-medium transition-all"
            title="Chat with Vellura on WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="whitespace-nowrap">WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#18181C] border-b border-[#D4AF37]/30 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-3 text-sm uppercase tracking-[0.15em] text-[#DCD6CB]">
            <button 
              onClick={() => handleNavClick('hero')} 
              className="text-left py-2 hover:text-[#D4AF37] border-b border-[#2C2C32]"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('catalog', 'jewellery', 'all')} 
              className="text-left py-2 hover:text-[#D4AF37] border-b border-[#2C2C32]"
            >
              Jewellery Collection
            </button>
            <button 
              onClick={() => handleNavClick('candles', 'candles', 'all')} 
              className="text-left py-2 hover:text-[#D4AF37] border-b border-[#2C2C32]"
            >
              Decorative Candles
            </button>
            <button 
              onClick={() => handleNavClick('collections')} 
              className="text-left py-2 hover:text-[#D4AF37] border-b border-[#2C2C32]"
            >
              Curated Collections
            </button>
            <button 
              onClick={() => handleNavClick('offers')} 
              className="text-left py-2 hover:text-[#D4AF37] border-b border-[#2C2C32]"
            >
              Festive Offers & Discounts
            </button>
            <button 
              onClick={() => handleNavClick('about')} 
              className="text-left py-2 hover:text-[#D4AF37] border-b border-[#2C2C32]"
            >
              About Vellura Creations
            </button>
            <button 
              onClick={() => handleNavClick('contact')} 
              className="text-left py-2 hover:text-[#D4AF37] border-b border-[#2C2C32]"
            >
              Showroom Location & Contact
            </button>
          </nav>

          <div className="pt-2 flex flex-col gap-2.5">
            <a
              href={getWhatsAppDirectUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#25D366] text-[#121214] font-medium text-xs tracking-wider uppercase shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp ({storeSettings.whatsappNumber})
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
