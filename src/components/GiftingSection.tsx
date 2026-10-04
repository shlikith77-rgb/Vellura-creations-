import React from 'react';
import { Gift, ArrowRight, Sparkles, Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const GiftingSection: React.FC = () => {
  const { setSelectedCategory, setSelectedSubcategory, siteContent } = useShop();

  const giftOccasions = [
    { title: 'Wedding & Bridal Gifts', desc: 'Opulent broad chokers, Kundan sets & luxury presentation chests.' },
    { title: 'Festival Celebrations', desc: 'Floating lotus candles, diya collections & gold-plated jewellery.' },
    { title: 'Anniversary Keepsakes', desc: 'Elegant diamond-look tennis necklaces & gemstone pendant sets.' },
    { title: 'Birthday Delights', desc: 'Chic floral blossom necklaces and scented botanical candle jars.' },
    { title: 'Return & Pooja Favors', desc: 'Curated gift boxes of decorative candles and delicate ear-hangings.' },
    { title: 'Combo Hamper Sets', desc: 'Matching luxury artificial jewellery accompanied by artisanal aroma candles.' },
  ];

  const handleExploreGifts = () => {
    setSelectedCategory('candles');
    setSelectedSubcategory('gift_candles');
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Boxed Banner */}
        <div className="relative overflow-hidden bg-[#18181C] text-[#FAF8F5] p-8 sm:p-12 lg:p-16 border border-[#D4AF37]/30 shadow-2xl">
          <div className="max-w-2xl space-y-6 relative z-10">
            
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-medium">
              <Gift className="w-4 h-4 text-[#D4AF37]" />
              <span>Thoughtful Presentations</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#FAF8F5]">
              {siteContent.giftingHeadline}
            </h2>

            <p className="text-sm sm:text-base text-[#DCD6CB] font-light leading-relaxed">
              {siteContent.giftingSupporting}
            </p>

            {/* Occasions Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {giftOccasions.map((occ, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-[#FAF8F5]">{occ.title}</h4>
                    <p className="text-[11px] text-[#8E8B85] leading-tight">{occ.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={handleExploreGifts}
                className="px-8 py-3.5 bg-[#D4AF37] hover:bg-[#E6CA65] text-[#121214] text-xs font-semibold uppercase tracking-[0.2em] transition-all transform hover:-translate-y-0.5 shadow-lg flex items-center gap-2"
              >
                <span>Explore Gift Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Luxury Gold Border Accent on right side */}
          <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-[#2D121B]/40 to-transparent pointer-events-none hidden lg:block" />
        </div>

      </div>
    </section>
  );
};
