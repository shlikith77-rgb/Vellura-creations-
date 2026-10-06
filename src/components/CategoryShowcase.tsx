import React from 'react';
import { ArrowUpRight, Sparkles, Flame } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CategoryShowcase: React.FC = () => {
  const { setSelectedCategory, setSelectedSubcategory } = useShop();

  const handleSelect = (category: 'jewellery' | 'candles') => {
    setSelectedCategory(category);
    setSelectedSubcategory('all');
    const targetId = category === 'candles' ? 'candles' : 'catalog';
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="collections" className="py-10 sm:py-14 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A059] font-medium block">
            Showroom Collections
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-normal tracking-tight">
            Select Your Department
          </h2>
          <p className="text-xs sm:text-sm text-[#706E6B] font-light">
            Choose between our artificial jewellery designs or handcrafted decorative candles.
          </p>
        </div>

        {/* 2 Focused Options: Jewellery & Decorative Candles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-4xl mx-auto">
          {/* Option 1: Jewellery */}
          <div
            onClick={() => handleSelect('jewellery')}
            className="group relative overflow-hidden bg-gradient-to-br from-[#2A0F17] via-[#1E1117] to-[#121214] p-7 sm:p-9 cursor-pointer border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-xl flex flex-col justify-between min-h-[220px]"
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#D4AF37]/25 transition-all" />

            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FAF8F5]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] uppercase tracking-widest font-semibold mb-3">
                <Sparkles className="w-3 h-3" />
                <span>Department 01</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#FAF8F5] tracking-wide mb-2 group-hover:text-[#E6CA65] transition-colors">
                Artificial Jewellery
              </h3>
              <p className="text-xs text-[#DCD6CB]/80 font-light leading-relaxed max-w-sm">
                Bridal sets, Kundan chokers, designer necklaces, jhumkas, bracelets, and rings with 18K antique gold polish.
              </p>
            </div>

            <div className="pt-6 flex items-center justify-between border-t border-[#FAF8F5]/10 mt-6">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#FAF8F5] group-hover:text-[#D4AF37] transition-colors flex items-center gap-1.5">
                Shop Jewellery
                <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
              <div className="w-8 h-8 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#121214] transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Option 2: Decorative Candles */}
          <div
            onClick={() => handleSelect('candles')}
            className="group relative overflow-hidden bg-gradient-to-br from-[#1C1818] via-[#2A181C] to-[#121214] p-7 sm:p-9 cursor-pointer border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-xl flex flex-col justify-between min-h-[220px]"
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#F59E0B]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#F59E0B]/25 transition-all" />

            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FAF8F5]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] uppercase tracking-widest font-semibold mb-3">
                <Flame className="w-3 h-3 text-[#F59E0B]" />
                <span>Department 02</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#FAF8F5] tracking-wide mb-2 group-hover:text-[#E6CA65] transition-colors">
                Decorative Candles
              </h3>
              <p className="text-xs text-[#DCD6CB]/80 font-light leading-relaxed max-w-sm">
                Handcrafted floating lotus and rose diya candles, aromatic soy wax pillars, and luxury gifting combinations.
              </p>
            </div>

            <div className="pt-6 flex items-center justify-between border-t border-[#FAF8F5]/10 mt-6">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#FAF8F5] group-hover:text-[#D4AF37] transition-colors flex items-center gap-1.5">
                Shop Candles
                <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
              <div className="w-8 h-8 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#121214] transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
