import React from 'react';
import { Flame, Sparkles, Gift, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';

export const CandleSection: React.FC = () => {
  const { products, setSelectedCategory, setSelectedSubcategory, siteContent } = useShop();

  const candleProducts = products.filter(p => p.category === 'candles');

  const handleViewAllCandles = () => {
    setSelectedCategory('candles');
    setSelectedSubcategory('all');
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="candles" className="py-20 bg-[#121214] text-[#FAF8F5] relative overflow-hidden">
      {/* Decorative Warm Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#231A14] border border-[#D4AF37]/30 text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
            <Flame className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Artisanal Wax Creations</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#FAF8F5]">
            {siteContent.candleHeadline}
          </h2>

          <p className="text-sm sm:text-base text-[#DCD6CB] font-light leading-relaxed">
            {siteContent.candleSupporting}
          </p>
        </div>

        {/* Feature Banner: Handcrafted Floating & Festive Candles from PDF Page 18 */}
        <div className="mb-14 bg-gradient-to-r from-[#1C1818] via-[#2A181C] to-[#1C1818] border border-[#D4AF37]/30 p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-xl text-center lg:text-left">
            <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
              Signature Collection · Catalog Page 18
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF8F5] font-normal">
              {siteContent.candleBannerTitle}
            </h3>
            <p className="text-xs sm:text-sm text-[#DCD6CB]/80 font-light leading-relaxed">
              {siteContent.candleBannerDesc}
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-[#E6CA65]">
              <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" /> 100% Lead-Free Wicks</span>
              <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" /> Floats Elegantly in Water</span>
              <span className="flex items-center gap-1.5"><Gift className="w-3.5 h-3.5" /> Luxury Gift Box Ready</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleViewAllCandles}
              className="px-6 py-3 bg-[#D4AF37] text-[#121214] text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[#E6CA65] transition-all flex items-center gap-2 shadow-lg"
            >
              <span>Explore Candle Sets</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Candle Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {candleProducts.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
