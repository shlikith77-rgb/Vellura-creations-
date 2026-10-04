import React from 'react';
import { MessageCircle, Phone, MapPin, Mail, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { 
    storeSettings, 
    getWhatsAppDirectUrl, 
    setActivePolicy,
    setSelectedCategory,
    setSelectedSubcategory,
    setIsAdminOpen,
    siteContent
  } = useShop();

  const handleNav = (cat: 'jewellery' | 'candles' | 'all') => {
    setSelectedCategory(cat);
    setSelectedSubcategory('all');
    const el = document.getElementById(cat === 'candles' ? 'candles' : 'catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#101012] text-[#FAF8F5] border-t border-[#D4AF37]/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#222228]">
          
          {/* Brand Column (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-[0.15em] text-[#FAF8F5]">
              {storeSettings.storeName}
            </h3>
            <p className="text-xs text-[#8E8B85] leading-relaxed max-w-sm font-light">
              {siteContent.footerBrandDescription}
            </p>

            <div className="pt-2">
              <a
                href={getWhatsAppDirectUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Quick Links (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D4AF37]">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-[#DCD6CB]/80">
              <li>
                <button onClick={() => scrollTo('hero')} className="hover:text-[#D4AF37] transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('jewellery')} className="hover:text-[#D4AF37] transition-colors">
                  Artificial Jewellery
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('candles')} className="hover:text-[#D4AF37] transition-colors">
                  Decorative Candles
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('collections')} className="hover:text-[#D4AF37] transition-colors">
                  Showroom Categories
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('offers')} className="hover:text-[#D4AF37] transition-colors">
                  Festive Offers
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('about')} className="hover:text-[#D4AF37] transition-colors">
                  About Vellura
                </button>
              </li>
            </ul>
          </div>

          {/* Policies (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D4AF37]">
              Customer Care & Trust
            </h4>
            <ul className="space-y-2 text-xs text-[#DCD6CB]/80">
              <li>
                <button onClick={() => setActivePolicy('shipping')} className="hover:text-[#D4AF37] transition-colors">
                  Shipping & Delivery
                </button>
              </li>
              <li>
                <button onClick={() => setActivePolicy('returns')} className="hover:text-[#D4AF37] transition-colors">
                  Return & Exchange Policy
                </button>
              </li>
              <li>
                <button onClick={() => setActivePolicy('cancellation')} className="hover:text-[#D4AF37] transition-colors">
                  Cancellation Terms
                </button>
              </li>
              <li>
                <button onClick={() => setActivePolicy('privacy')} className="hover:text-[#D4AF37] transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => setActivePolicy('terms')} className="hover:text-[#D4AF37] transition-colors">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => setIsAdminOpen(true)} className="hover:text-[#D4AF37] transition-colors text-[#8E8B85]">
                  Showroom Admin Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Showroom Contact (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D4AF37]">
              Showroom Contact
            </h4>
            <div className="space-y-2 text-xs text-[#8E8B85]">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <span>{storeSettings.address}, {storeSettings.city}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                <span className="font-mono text-[#FAF8F5]">{storeSettings.displayPhone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                <span>velluracreations@gmail.com</span>
              </p>
            </div>
            <div className="pt-2 text-[11px] text-[#8E8B85]">
              <p className="text-emerald-400 font-semibold">✓ Cash on Delivery Available</p>
              <p>Direct WhatsApp Order Verification</p>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#706E6B]">
          <p>© {new Date().getFullYear()} {storeSettings.storeName}. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Luxury Artificial Jewellery</span>
            <span>·</span>
            <span>Artisanal Candles</span>
            <span>·</span>
            <span>Made for Every Celebration</span>
          </div>
        </div>

        {/* Dedicated Admin Section at the very end of the website (Requirement) */}
        <div className="mt-8 pt-6 border-t border-[#1F1F24] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#141417] p-4 sm:p-5 border border-[#D4AF37]/30 shadow-inner">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-9 h-9 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-serif text-sm font-semibold text-[#FAF8F5]">Owner Management & Store Controls</p>
              <p className="text-[11px] text-[#8E8B85]">Protected portal to update product photos, pricing, stock, and website texts</p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminOpen(true)}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#D4AF37] hover:bg-[#E6CA65] text-[#121214] text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-[#D4AF37]/20"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Admin Section</span>
          </button>
        </div>

      </div>
    </footer>
  );
};
