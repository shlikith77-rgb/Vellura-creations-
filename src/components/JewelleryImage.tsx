import React from 'react';
import { Product } from '../types';

interface JewelleryImageProps {
  product: Product;
  className?: string;
  showBadge?: boolean;
}

export const JewelleryImage: React.FC<JewelleryImageProps> = ({ 
  product, 
  className = "w-full h-full object-cover",
  showBadge = true 
}) => {
  // If product has a custom image or generated image, use it with fallback
  const primaryImage = product.images && product.images.length > 0 ? product.images[0] : null;

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#161214] flex items-center justify-center group">
      {primaryImage ? (
        <img
          src={primaryImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          className={`${className} transition-transform duration-700 ease-out group-hover:scale-105`}
          onError={(e) => {
            // Graceful fallback to styled luxury showroom canvas if image fails to load
            const target = e.currentTarget;
            target.style.display = 'none';
            const fallback = target.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = 'flex';
          }}
        />
      ) : null}

      {/* Styled Luxury Showroom Fallback Container matching the Red Velvet Showroom Bust from PDF */}
      <div 
        className={`w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#2A0D15] via-[#4A0E1C] to-[#1F070C] ${primaryImage ? 'hidden' : 'flex'}`}
      >
        {/* Subtle royal aura */}
        <div className="w-24 h-24 rounded-full bg-[#D4AF37]/15 blur-xl mb-3 pointer-events-none" />
        
        {/* Ornate emblem or motif */}
        <div className="relative z-10 w-16 h-16 rounded-full border border-[#D4AF37]/40 flex items-center justify-center mb-3 bg-[#1A050A]/60 shadow-lg">
          {product.category === 'jewellery' ? (
            <svg className="w-8 h-8 text-[#E6CA65]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L4 8l8 14 8-14-8-6z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20" />
            </svg>
          ) : (
            <svg className="w-8 h-8 text-[#E6CA65]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2c-.5 2-2 3-2 5a2 2 0 004 0c0-2-1.5-3-2-5z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 10h10v11a1 1 0 01-1 1H8a1 1 0 01-1-1V10z" />
            </svg>
          )}
        </div>

        <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-medium mb-1">
          {product.category === 'jewellery' ? 'Showroom Exclusive' : 'Handcrafted Candle'}
        </span>
        <h4 className="font-serif text-sm font-semibold text-[#FAF8F5] line-clamp-1 max-w-[200px]">
          {product.name}
        </h4>
        <p className="text-[11px] text-[#DCD6CB]/70 mt-1">
          {product.weight} · {product.finish}
        </p>
      </div>

      {/* Velvet Showroom Overlay Vignette for luxury depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />

      {/* PDF Reference Pill or Tag */}
      {showBadge && product.pdfReferencePage && (
        <div className="absolute top-3 left-3 bg-[#121214]/85 backdrop-blur-md border border-[#D4AF37]/40 px-2.5 py-1 text-[10px] uppercase tracking-wider text-[#E6CA65] font-semibold shadow-sm">
          Catalog Pg {product.pdfReferencePage}
        </div>
      )}

      {/* Discount Pill if on sale */}
      {showBadge && product.discountPercentage > 0 && (
        <div className="absolute top-3 right-3 bg-[#6B1D2F] border border-[#801B31] px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider shadow-sm">
          {product.discountPercentage}% OFF
        </div>
      )}
    </div>
  );
};
