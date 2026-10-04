import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCategory, ProductSubcategory } from '../types';

interface CategoryCard {
  id: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  subcategory: ProductSubcategory;
  accentBg: string;
  imageAlt: string;
}

export const CategoryShowcase: React.FC = () => {
  const { setSelectedCategory, setSelectedSubcategory } = useShop();

  const categories: CategoryCard[] = [
    {
      id: 'cat-jewellery',
      name: 'JEWELLERY',
      subtitle: 'Artificial jewellery for weddings, festivals, parties, celebrations and everyday elegance.',
      category: 'jewellery',
      subcategory: 'all',
      accentBg: 'from-[#2A0F17] to-[#121214]',
      imageAlt: 'Royal Artificial Jewellery Sets',
    },
    {
      id: 'cat-necklaces',
      name: 'NECKLACES & CHOKERS',
      subtitle: 'Premium necklace designs, bridal chokers, and royal Kundan sets.',
      category: 'jewellery',
      subcategory: 'necklaces',
      accentBg: 'from-[#1E1B2E] to-[#121214]',
      imageAlt: 'Necklaces & Bridal Chokers',
    },
    {
      id: 'cat-bridal',
      name: 'BRIDAL COLLECTION',
      subtitle: 'Heirloom-look statement sets with emerald beads and temple medallions.',
      category: 'jewellery',
      subcategory: 'bridal',
      accentBg: 'from-[#35101E] to-[#14080D]',
      imageAlt: 'Bridal Heritage Suites',
    },
    {
      id: 'cat-earrings',
      name: 'EARRINGS & JHUMKAS',
      subtitle: 'Elegant statement chandeliers, jhumkas, and everyday studs.',
      category: 'jewellery',
      subcategory: 'earrings',
      accentBg: 'from-[#1A261E] to-[#121214]',
      imageAlt: 'Earrings & Jhumkas',
    },
    {
      id: 'cat-bangles',
      name: 'BANGLES & BRACELETS',
      subtitle: 'Traditional wrist ornaments, cz tennis bracelets, and designer bangles.',
      category: 'jewellery',
      subcategory: 'bangles',
      accentBg: 'from-[#2B1F11] to-[#121214]',
      imageAlt: 'Bangles & Bracelets',
    },
    {
      id: 'cat-candles',
      name: 'DECORATIVE CANDLES',
      subtitle: 'Decorative, colourful and scented candles in artisanal floral shapes.',
      category: 'candles',
      subcategory: 'decorative_candles',
      accentBg: 'from-[#1F2420] to-[#121214]',
      imageAlt: 'Handcrafted Decorative Candles',
    },
    {
      id: 'cat-gift-candles',
      name: 'GIFT CANDLES & HAMPER SETS',
      subtitle: 'Beautiful candles designed for gifting, pooja, celebrations and special occasions.',
      category: 'candles',
      subcategory: 'gift_candles',
      accentBg: 'from-[#281525] to-[#121214]',
      imageAlt: 'Gift Candle Box Sets',
    },
  ];

  const handleSelectCategory = (cat: ProductCategory, sub: ProductSubcategory) => {
    setSelectedCategory(cat);
    setSelectedSubcategory(sub);
    const el = document.getElementById(cat === 'candles' ? 'candles' : 'catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="collections" className="py-16 md:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#EAE6DF] pb-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium block mb-2">
              Curated Showroom Departments
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-normal tracking-tight">
              Shop by Category
            </h2>
          </div>
          <p className="text-sm text-[#706E6B] max-w-md mt-3 md:mt-0 font-light">
            Explore our curated collections of luxury artificial jewellery and handcrafted decorative candles.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={cat.id}
              onClick={() => handleSelectCategory(cat.category, cat.subcategory)}
              className={`group relative overflow-hidden bg-gradient-to-br ${cat.accentBg} p-8 cursor-pointer border border-[#D4AF37]/20 hover:border-[#D4AF37]/70 transition-all duration-500 hover:-translate-y-1 shadow-sm hover:shadow-xl flex flex-col justify-between min-h-[220px]`}
            >
              {/* Subtle Ambient Light */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#D4AF37]/20 transition-all" />

              <div>
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-medium block mb-2">
                  0{idx + 1}
                </span>
                <h3 className="font-serif text-2xl font-normal text-[#FAF8F5] tracking-wide mb-2 group-hover:text-[#E6CA65] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-[#DCD6CB]/80 font-light leading-relaxed max-w-[280px]">
                  {cat.subtitle}
                </p>
              </div>

              {/* Action Link */}
              <div className="pt-6 flex items-center justify-between border-t border-[#FAF8F5]/10 mt-6">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#FAF8F5] group-hover:text-[#D4AF37] transition-colors flex items-center gap-1.5">
                  Shop Now
                  <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
                <div className="w-8 h-8 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#121214] transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
