import React from 'react';
import { Heart, ShoppingBag, Zap, MessageCircle } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { JewelleryImage } from './JewelleryImage';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    addToCart, 
    isInWishlist, 
    toggleWishlist, 
    setSelectedProduct, 
    setIsCheckoutOpen,
    getWhatsAppProductEnquiryUrl 
  } = useShop();

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsCheckoutOpen(true);
  };

  const handleWhatsAppEnquiry = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = getWhatsAppProductEnquiryUrl(product);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      onClick={() => setSelectedProduct(product)}
      className="group flex flex-col bg-white border border-[#EAE6DF] hover:border-[#D4AF37]/60 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden rounded-xs"
    >
      {/* 1:1 Square Product Image Container */}
      <div className="relative aspect-square w-full bg-[#18181C] overflow-hidden flex-shrink-0">
        <JewelleryImage product={product} />

        {/* Wishlist Button (Clean, Non-overlapping) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2 right-2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-colors shadow-sm ${
            isFavorited 
              ? 'bg-[#6B1D2F] text-white' 
              : 'bg-black/45 backdrop-blur-xs text-white hover:text-[#D4AF37] hover:bg-black/70'
          }`}
          title={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
          aria-label="Wishlist toggle"
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Product Content Details */}
      <div className="p-2.5 sm:p-3.5 flex flex-col flex-grow justify-between bg-white">
        <div>
          {/* Metadata Row: Category & Weight */}
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-[#8E8B85] mb-1 font-sans">
            <span className="uppercase tracking-wider text-[#C5A059] font-medium truncate max-w-[65%]">
              {product.subcategory.replace('_', ' ')}
            </span>
            <span className="font-mono text-[#706E6B] flex-shrink-0">
              {product.weight}
            </span>
          </div>

          {/* Product Name (Clear, normal readable font, 2 lines max with aligned height) */}
          <h3 className="font-sans text-xs sm:text-sm font-medium text-[#1A1A1A] line-clamp-2 leading-snug group-hover:text-[#6B1D2F] transition-colors min-h-[2rem] sm:min-h-[2.5rem]">
            {product.name}
          </h3>
        </div>

        <div>
          {/* Pricing & Stock Status */}
          <div className="mt-1.5 pt-1.5 border-t border-[#F2EFE9] flex items-baseline justify-between gap-1">
            <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
              <span className="font-sans text-sm sm:text-base font-bold text-[#1A1A1A] tabular-nums">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="font-sans text-[11px] sm:text-xs text-[#8E8B85] line-through tabular-nums">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            {product.discountPercentage > 0 ? (
              <span className="text-[10px] sm:text-xs font-semibold text-[#6B1D2F] tabular-nums whitespace-nowrap">
                {product.discountPercentage}% OFF
              </span>
            ) : (
              <span className={`text-[10px] font-semibold whitespace-nowrap ${
                product.inStock ? 'text-emerald-700' : 'text-red-700'
              }`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            )}
          </div>

          {/* Action Buttons: Clean, normal readable text and easy-to-tap touch targets */}
          <div className="mt-2 space-y-1.5">
            {/* Primary Add to Bag Button */}
            <button
              type="button"
              onClick={handleQuickAdd}
              disabled={!product.inStock}
              className="w-full py-2 px-2 bg-[#121214] text-[#FAF8F5] hover:bg-[#2A2A30] active:scale-[0.98] disabled:bg-[#CCCCCC] disabled:cursor-not-allowed text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="truncate">{product.inStock ? 'Add to Bag' : 'Out of Stock'}</span>
            </button>

            {/* Quick Actions Row: Buy Now & WhatsApp */}
            <div className="grid grid-cols-2 gap-1 text-[11px]">
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="py-1 px-1 bg-[#6B1D2F]/10 hover:bg-[#6B1D2F] text-[#6B1D2F] hover:text-white border border-[#6B1D2F]/30 disabled:opacity-40 text-center font-medium flex items-center justify-center gap-1 transition-colors"
                title="Direct Checkout"
              >
                <Zap className="w-3 h-3" />
                <span className="truncate">Buy Now</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsAppEnquiry}
                className="py-1 px-1 bg-[#25D366]/10 hover:bg-[#25D366] text-[#128C7E] hover:text-white border border-[#25D366]/30 text-center font-medium flex items-center justify-center gap-1 transition-colors"
                title="Enquire on WhatsApp"
              >
                <MessageCircle className="w-3 h-3 text-[#25D366] group-hover:text-white" />
                <span className="truncate">WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
