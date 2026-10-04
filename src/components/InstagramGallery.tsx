import React from 'react';
import { Instagram, ArrowUpRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const InstagramGallery: React.FC = () => {
  const { getWhatsAppDirectUrl } = useShop();

  const galleryItems = [
    {
      title: 'Mughal Bridal Collar',
      tag: '#VelluraBride',
      img: '/src/assets/images/campaign_kundan_saree_1791132526530.jpg',
    },
    {
      title: 'Emerald Halo Suite',
      tag: '#HeritageJewels',
      img: '/src/assets/images/showcase_bridal_emerald_1791132536998.jpg',
    },
    {
      title: 'Floating Lotus Candles',
      tag: '#ArtisanalGlow',
      img: '/src/assets/images/showcase_artisan_candles_1791132548165.jpg',
    },
    {
      title: 'Royal Kundan & Polki',
      tag: '#TimelessGrace',
      img: '/src/assets/images/hero_vellura_jewellery_1791132515536.jpg',
    },
  ];

  return (
    <section className="py-16 bg-[#121214] text-[#FAF8F5] border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#26262B]">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-medium block mb-1">
              Visual Lookbook
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#FAF8F5] tracking-wide">
              FOLLOW THE VELLURA LOOK
            </h2>
          </div>

          <div className="mt-3 sm:mt-0">
            {/* Social integration ready without inventing handles */}
            <a
              href={getWhatsAppDirectUrl('Hello Vellura Creations, I saw your showroom lookbook and would like to see more designs.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-[#D4AF37]/40 hover:bg-[#D4AF37] hover:text-[#121214] text-[#FAF8F5] text-xs uppercase tracking-wider transition-colors"
            >
              <span>Follow Us</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Lookbook Visual Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryItems.map((item, idx) => (
            <div 
              key={idx} 
              className="group relative aspect-square bg-[#1C181C] overflow-hidden border border-[#2A2A30] hover:border-[#D4AF37]/60 transition-all cursor-pointer shadow-md"
            >
              <img
                src={item.img}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />

              <div className="hidden w-full h-full bg-gradient-to-br from-[#2D121B] to-[#121214] flex-col items-center justify-center p-4 text-center">
                <span className="font-serif text-sm text-[#FAF8F5]">{item.title}</span>
                <span className="text-[10px] text-[#D4AF37] mt-1">{item.tag}</span>
              </div>

              {/* Hover Scrim */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-[10px] font-mono text-[#D4AF37]">{item.tag}</span>
                <h4 className="font-serif text-sm text-[#FAF8F5] font-semibold">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
