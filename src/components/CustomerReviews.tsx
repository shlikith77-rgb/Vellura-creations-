import React from 'react';
import { Star, MessageSquareQuote, Info } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CustomerReviews: React.FC = () => {
  const { reviews } = useShop();

  return (
    <section className="py-20 bg-[#FAF8F5] border-t border-[#EAE6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium block">
            Customer Reflections
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-normal tracking-tight">
            Voices of Elegance
          </h2>
          
          {/* Transparent Demo Indicator Banner (Requirement 20 compliance) */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#121214]/5 border border-[#121214]/10 text-[11px] text-[#706E6B]">
            <Info className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Sample customer feedback preview · Verified showroom testimonials will be updated by owner</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white border border-[#EAE6DF] p-6 flex flex-col justify-between hover:border-[#D4AF37]/50 transition-colors shadow-sm"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-[#D4AF37] mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-xs text-[#4A4A4A] font-light italic leading-relaxed mb-4">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#F2EFE9] space-y-1">
                <p className="font-serif text-sm font-semibold text-[#1A1A1A]">
                  {rev.author}
                </p>
                <div className="flex items-center justify-between text-[10px] text-[#706E6B]">
                  <span>{rev.location}</span>
                  <span className="text-[#C5A059]">{rev.productName.split(' ')[0]} {rev.productName.split(' ')[1]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
