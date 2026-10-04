import React, { useState } from 'react';
import { Tag, Copy, Check, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const OffersSection: React.FC = () => {
  const { offers, applyCoupon, setIsCartOpen } = useShop();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    applyCoupon(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const activeOffers = offers.filter(o => o.active);

  if (activeOffers.length === 0) return null;

  return (
    <section id="offers" className="py-16 bg-[#161214] text-[#FAF8F5] relative overflow-hidden border-y border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#2C2428]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-medium mb-2">
              <Tag className="w-3.5 h-3.5" />
              <span>Privileged Showroom Incentives</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5] font-normal tracking-tight">
              Exclusive Offers & Curations
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#DCD6CB]/80 max-w-md mt-2 md:mt-0 font-light">
            Apply luxury coupon codes at checkout or click to automatically save on your celebration orders.
          </p>
        </div>

        {/* Offer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeOffers.map(offer => (
            <div
              key={offer.id}
              className="bg-gradient-to-b from-[#211A1F] to-[#161214] border border-[#D4AF37]/30 p-6 flex flex-col justify-between hover:border-[#D4AF37] transition-all duration-300 shadow-lg"
            >
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#E6CA65] font-semibold block mb-2">
                  {offer.badge}
                </span>
                <h3 className="font-serif text-2xl text-[#FAF8F5] font-normal mb-1">
                  {offer.title}
                </h3>
                <p className="text-xs text-[#DCD6CB] font-light mb-4">
                  {offer.subtitle}
                </p>
                <div className="py-2 px-3 bg-[#121214] border border-[#D4AF37]/20 text-xs text-[#E6CA65] mb-4">
                  Flat <strong className="font-bold">{offer.discountPercent}% OFF</strong> on orders above ₹{offer.minOrderValue.toLocaleString('en-IN')}
                </div>
              </div>

              <div className="pt-4 border-t border-[#2C2428] flex items-center justify-between gap-3">
                <span className="font-mono text-sm tracking-wider font-semibold text-[#FAF8F5] bg-[#2C1820] px-3 py-1.5 border border-[#801B31]">
                  {offer.code}
                </span>

                <button
                  onClick={() => handleCopy(offer.code)}
                  className="px-4 py-1.5 bg-[#D4AF37] hover:bg-[#E6CA65] text-[#121214] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                >
                  {copiedCode === offer.code ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Applied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Apply</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
