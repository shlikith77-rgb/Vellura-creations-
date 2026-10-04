import React from 'react';
import { Heart, ShoppingBag, Zap, MessageCircle, Eye } from 'lucide-react';
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
    window.open(getWhatsAppProductEnquiryUrl(product), '_blank');
  };

  return (
    <div 
      onClick={() => setSelectedProduct(product)}
      className="group flex flex-col bg-white border border-[#EAE6DF] hover:border-[#D4AF37]/50 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Product Image Stage (65-75% visual prominence) */}
      <div className="relative aspect-[4/5] w-full bg-[#18181C] overflow-hidden">
        <JewelleryImage product={product} />

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            isFavorited 
              ? 'bg-[#6B1D2F] text-white shadow-md' 
              : 'bg-black/40 backdrop-blur-sm text-white hover:text-[#D4AF37]'
          }`}
          title={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
          aria-label="Wishlist toggle"
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Hover Pill */}
        <div className="absolute inset-x-0 bottom-3 px-3 hidden group-hover:flex items-center justify-center transition-opacity duration-200">
          <span className="py-1.5 px-4 bg-[#121214]/90 backdrop-blur-sm border border-[#D4AF37]/50 text-white text-[11px] uppercase tracking-wider font-medium flex items-center gap-1.5 shadow-lg">
            <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
            View Details
          </span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between bg-white">
        <div>
          {/* Metadata: Category & Weight */}
          <div className="flex items-center justify-between text-xs text-[#706E6B] mb-1.5">
            <span className="uppercase tracking-[0.15em] text-[10px] text-[#C5A059] font-medium">
              {product.subcategory.replace('_', ' ')}
            </span>
            <span className="font-mono tabular-nums text-[11px] text-[#706E6B]">
              Weight: {product.weight}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-base sm:text-lg font-normal text-[#1A1A1A] line-clamp-1 group-hover:text-[#6B1D2F] transition-colors">
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-[#706E6B] font-light line-clamp-2 mt-1 mb-3 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div>
          {/* Pricing & Stock Status */}
          <div className="pt-2 border-t border-[#F2EFE9] flex items-baseline justify-between mb-3">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-lg sm:text-xl font-semibold text-[#1A1A1A] tabular-nums">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-[#8E8B85] line-through tabular-nums">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <span className={`text-[10px] uppercase tracking-wider font-semibold ${
              product.inStock ? 'text-emerald-700' : 'text-red-700'
            }`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {/* Primary Action Buttons */}
          <div className="grid grid-cols-2 gap-2 mb-2">
            <button
              onClick={handleQuickAdd}
              disabled={!product.inStock}
              className="py-2.5 px-2 bg-[#121214] text-[#FAF8F5] hover:bg-[#2A2A30] disabled:bg-[#CCCCCC] disabled:cursor-not-allowed text-[11px] uppercase tracking-wider font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="truncate">Add to Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={!product.inStock}
              className="py-2.5 px-2 bg-[#6B1D2F] text-white hover:bg-[#801B31] disabled:bg-[#CCCCCC] disabled:cursor-not-allowed text-[11px] uppercase tracking-wider font-semibold flex items-center justify-center gap-1 transition-colors"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Buy Now</span>
            </button>
          </div>

          {/* WhatsApp Direct Enquiry Button */}
          <button
            onClick={handleWhatsAppEnquiry}
            className="w-full py-1.5 px-2 border border-[#25D366]/40 hover:bg-[#25D366]/10 text-[#128C7E] text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span>Enquire on WhatsApp</span>
          </button>
        </div>

      </div>
    </div>
  );
};
