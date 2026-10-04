import React from 'react';
import { ArrowRight, Sparkles, Shield, Award } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Hero: React.FC = () => {
  const { setSelectedCategory, setSelectedSubcategory, siteContent } = useShop();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleShopJewellery = () => {
    setSelectedCategory('jewellery');
    setSelectedSubcategory('all');
    scrollTo('catalog');
  };

  const handleExploreCandles = () => {
    setSelectedCategory('candles');
    setSelectedSubcategory('all');
    scrollTo('candles');
  };

  const handleShopCollection = () => {
    setSelectedCategory('all');
    setSelectedSubcategory('all');
    scrollTo('catalog');
  };

  return (
    <section id="hero" className="relative w-full bg-[#121214] text-[#FAF8F5] overflow-hidden">
      {/* Editorial Luxury Split Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand Copy & Actions (7 Cols on desktop) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 z-10">
            
            {/* Editorial Kicker */}
            <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-[#D4AF37] font-medium">
              <span className="w-8 h-[1px] bg-[#D4AF37]"></span>
              <span>{siteContent.heroKicker}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-normal leading-[1.12] tracking-tight text-[#FAF8F5] text-balance">
              {siteContent.heroHeadline}
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#DCD6CB] max-w-xl font-light leading-relaxed">
              {siteContent.heroSupporting}
            </p>

            {/* CTA Action Cluster */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={handleShopJewellery}
                className="px-7 py-3.5 bg-[#D4AF37] text-[#121214] text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#E6CA65] transition-all transform hover:-translate-y-0.5 shadow-lg flex items-center gap-2"
              >
                <span>{siteContent.heroPrimaryBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleExploreCandles}
                className="px-7 py-3.5 border border-[#D4AF37]/50 text-[#FAF8F5] text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#D4AF37]/15 hover:border-[#D4AF37] transition-all"
              >
                {siteContent.heroSecondaryBtn}
              </button>

              <button
                onClick={handleShopCollection}
                className="px-4 py-3 text-xs uppercase tracking-[0.18em] text-[#DCD6CB] hover:text-[#D4AF37] transition-colors underline underline-offset-4 decoration-[#D4AF37]/40"
              >
                {siteContent.heroTertiaryBtn}
              </button>
            </div>

            {/* Quiet Heritage Trust Markers */}
            <div className="pt-8 border-t border-[#26262B] grid grid-cols-3 gap-4 text-xs text-[#8E8B85]">
              <div className="space-y-1">
                <p className="font-serif text-base text-[#D4AF37] font-semibold">18K Antique Polish</p>
                <p className="text-[11px] leading-snug">Micro-plated royal finishes</p>
              </div>
              <div className="space-y-1">
                <p className="font-serif text-base text-[#D4AF37] font-semibold">Cash On Delivery</p>
                <p className="text-[11px] leading-snug">Pay when delivered to doorstep</p>
              </div>
              <div className="space-y-1">
                <p className="font-serif text-base text-[#D4AF37] font-semibold">WhatsApp Order</p>
                <p className="text-[11px] leading-snug">Direct instant confirmation</p>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase (5 Cols on desktop) */}
          <div className="lg:col-span-5 relative">
            
            {/* Subtle Gold Accent Frame behind image */}
            <div className="absolute -inset-2 border border-[#D4AF37]/30 transform translate-x-2 translate-y-2 pointer-events-none" />

            {/* Main Visual Container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-[#18181C] shadow-2xl">
              <img
                src="/src/assets/images/hero_vellura_jewellery_1791132515536.jpg"
                alt="Vellura Creations Royal Jewellery Campaign"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-1000 ease-out"
                onError={(e) => {
                  // Fallback in case sandbox asset needs fallback
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />

              {/* Styled Fallback Container */}
              <div className="hidden w-full h-full bg-gradient-to-tr from-[#2C0E18] to-[#121214] flex-col items-center justify-center p-8 text-center">
                <Sparkles className="w-12 h-12 text-[#D4AF37] mb-3 animate-pulse" />
                <h3 className="font-serif text-2xl text-[#FAF8F5]">Vellura Creations</h3>
                <p className="text-xs text-[#DCD6CB] mt-2">Bespoke Royal Artificial Jewellery</p>
              </div>

              {/* Velvet Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Floating Showroom Badge */}
              <div className="absolute bottom-5 left-5 right-5 p-4 bg-[#121214]/90 backdrop-blur-md border border-[#D4AF37]/30 text-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold block">Signature Bridal Edit</span>
                    <span className="font-serif text-sm text-[#FAF8F5]">Mughal Emerald & Kundan Suite</span>
                  </div>
                  <button 
                    onClick={handleShopJewellery}
                    className="px-3 py-1 bg-[#D4AF37]/20 border border-[#D4AF37]/60 text-[#FAF8F5] text-[11px] uppercase tracking-wider hover:bg-[#D4AF37] hover:text-[#121214] transition-colors"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
