import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Zap, MessageCircle, ShieldCheck, RefreshCw, Check, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { JewelleryImage } from './JewelleryImage';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { 
    addToCart, 
    isInWishlist, 
    toggleWishlist, 
    setIsCheckoutOpen, 
    getWhatsAppProductEnquiryUrl,
    products,
    setSelectedProduct
  } = useShop();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'details' | 'care' | 'shipping'>('details');

  // Synchronize state when product changes
  React.useEffect(() => {
    if (product) {
      setQuantity(1);
      setSelectedSize(product.availableSizes && product.availableSizes.length > 0 ? product.availableSizes[0] : '');
      setSelectedVariant(product.variants && product.variants.length > 0 ? product.variants[0].name : '');
      setActiveTab('details');
    }
  }, [product]);

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize || undefined, selectedVariant || undefined);
    onClose();
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize || undefined, selectedVariant || undefined);
    onClose();
    setIsCheckoutOpen(true);
  };

  const handleWhatsAppEnquiry = () => {
    window.open(getWhatsAppProductEnquiryUrl(product), '_blank');
  };

  // Related products from same category
  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div 
        className="relative bg-white w-full max-w-4xl max-h-[92vh] overflow-y-auto border border-[#D4AF37]/30 shadow-2xl flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#121214]/80 text-[#FAF8F5] hover:text-[#D4AF37] flex items-center justify-center transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 flex-grow">
          
          {/* Left Column: Product Visual Gallery Stage (md:col-span-6) */}
          <div className="md:col-span-6 bg-[#18181C] p-6 sm:p-8 flex flex-col justify-between relative border-b md:border-b-0 md:border-r border-[#EAE6DF]">
            <div className="relative aspect-[4/5] w-full overflow-hidden shadow-xl border border-[#D4AF37]/30">
              <JewelleryImage product={product} />

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                  isFavorited ? 'bg-[#6B1D2F] text-white' : 'bg-black/60 text-white hover:text-[#D4AF37]'
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Catalog Info Note */}
            <div className="mt-4 p-3 bg-[#121214] border border-[#D4AF37]/20 flex items-center justify-between text-xs text-[#DCD6CB]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>Showroom Catalog Reference</span>
              </div>
              {product.pdfReferencePage && (
                <span className="font-mono text-[#E6CA65] font-semibold">
                  Page #{product.pdfReferencePage}
                </span>
              )}
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module (md:col-span-6) */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between bg-[#FAF8F5]">
            <div className="space-y-4">
              
              {/* Category, Weight & SKU */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#706E6B] border-b border-[#EAE6DF] pb-3">
                <span className="uppercase tracking-[0.2em] font-semibold text-[#C5A059]">
                  {product.category} · {product.subcategory.replace('_', ' ')}
                </span>
                <span className="font-mono text-xs">
                  SKU: {product.sku}
                </span>
              </div>

              {/* Product Title */}
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-normal leading-snug">
                {product.name}
              </h2>

              {/* Price & Weight Badge */}
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl font-semibold text-[#1A1A1A] tabular-nums">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-base text-[#8E8B85] line-through tabular-nums">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-bold text-[#6B1D2F] uppercase tracking-wider">
                      Save {product.discountPercentage}%
                    </span>
                  </>
                )}
                <span className="ml-auto text-xs bg-white border border-[#EAE6DF] px-2.5 py-1 text-[#706E6B] font-mono">
                  Weight: {product.weight}
                </span>
              </div>

              {/* Stock Status Indicator */}
              <div className="flex items-center gap-2 text-xs">
                <span className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-emerald-600' : 'bg-red-600'}`} />
                <span className={`font-semibold ${product.inStock ? 'text-emerald-700' : 'text-red-700'}`}>
                  {product.inStock ? `In Stock (${product.stockQuantity} pieces available in showroom)` : 'Currently Out of Stock'}
                </span>
              </div>

              {/* Variant / Colour Selector (where applicable) */}
              {product.variants && product.variants.length > 0 && (
                <div className="pt-2">
                  <label className="block text-xs uppercase tracking-wider text-[#1A1A1A] font-semibold mb-2">
                    Select Variant / Colour:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariant(v.name)}
                        className={`px-3 py-1.5 text-xs font-medium border transition-all flex items-center gap-1.5 ${
                          selectedVariant === v.name
                            ? 'border-[#121214] bg-[#121214] text-[#FAF8F5]'
                            : 'border-[#DCD6CB] bg-white text-[#1A1A1A] hover:border-[#121214]'
                        }`}
                      >
                        {v.colorHex && (
                          <span 
                            className="w-2.5 h-2.5 rounded-full border border-black/20" 
                            style={{ backgroundColor: v.colorHex }} 
                          />
                        )}
                        <span>{v.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector (Requirement 9: For jewellery where size is not relevant, hide the size selector automatically) */}
              {product.availableSizes && product.availableSizes.length > 0 && (
                <div className="pt-2">
                  <label className="block text-xs uppercase tracking-wider text-[#1A1A1A] font-semibold mb-2">
                    Available Size / Fit:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.availableSizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={`px-3 py-1.5 text-xs font-medium border transition-all ${
                          selectedSize === s
                            ? 'border-[#121214] bg-[#121214] text-[#FAF8F5]'
                            : 'border-[#DCD6CB] bg-white text-[#1A1A1A] hover:border-[#121214]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="pt-2 flex items-center gap-4">
                <label className="text-xs uppercase tracking-wider text-[#1A1A1A] font-semibold">
                  Quantity:
                </label>
                <div className="flex items-center border border-[#DCD6CB] bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-[#1A1A1A] hover:bg-[#F2EFE9] transition-colors"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-xs font-semibold tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                    disabled={quantity >= product.stockQuantity}
                    className="w-8 h-8 flex items-center justify-center text-[#1A1A1A] hover:bg-[#F2EFE9] transition-colors disabled:opacity-30"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons: Add to Cart, Buy Now, WhatsApp */}
              <div className="pt-4 space-y-2.5">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="py-3 px-4 bg-[#121214] text-[#FAF8F5] hover:bg-[#2A2A30] disabled:bg-[#CCCCCC] disabled:cursor-not-allowed text-xs font-semibold uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-colors shadow-md"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                    <span>Add To Cart</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    disabled={!product.inStock}
                    className="py-3 px-4 bg-[#6B1D2F] text-white hover:bg-[#801B31] disabled:bg-[#CCCCCC] disabled:cursor-not-allowed text-xs font-semibold uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-colors shadow-md"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Buy Now</span>
                  </button>
                </div>

                <button
                  onClick={handleWhatsAppEnquiry}
                  className="w-full py-2.5 px-4 bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/50 text-[#128C7E] text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Enquire on WhatsApp (+91 92533 42413)</span>
                </button>
              </div>

              {/* Informational Tabs: Details, Care, Shipping */}
              <div className="pt-4 border-t border-[#EAE6DF]">
                <div className="flex border-b border-[#EAE6DF] text-xs">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-2 px-3 font-semibold uppercase tracking-wider transition-colors border-b-2 ${
                      activeTab === 'details'
                        ? 'border-[#121214] text-[#121214]'
                        : 'border-transparent text-[#706E6B] hover:text-[#121214]'
                    }`}
                  >
                    Specification
                  </button>
                  <button
                    onClick={() => setActiveTab('care')}
                    className={`pb-2 px-3 font-semibold uppercase tracking-wider transition-colors border-b-2 ${
                      activeTab === 'care'
                        ? 'border-[#121214] text-[#121214]'
                        : 'border-transparent text-[#706E6B] hover:text-[#121214]'
                    }`}
                  >
                    Care Guide
                  </button>
                  <button
                    onClick={() => setActiveTab('shipping')}
                    className={`pb-2 px-3 font-semibold uppercase tracking-wider transition-colors border-b-2 ${
                      activeTab === 'shipping'
                        ? 'border-[#121214] text-[#121214]'
                        : 'border-transparent text-[#706E6B] hover:text-[#121214]'
                    }`}
                  >
                    Delivery & COD
                  </button>
                </div>

                <div className="py-3 text-xs text-[#706E6B] leading-relaxed">
                  {activeTab === 'details' && (
                    <div className="space-y-1.5">
                      <p><strong className="text-[#1A1A1A]">Material:</strong> {product.material}</p>
                      <p><strong className="text-[#1A1A1A]">Finish:</strong> {product.finish}</p>
                      {product.occasion && <p><strong className="text-[#1A1A1A]">Occasion:</strong> {product.occasion}</p>}
                      {product.fragrance && <p><strong className="text-[#1A1A1A]">Fragrance:</strong> {product.fragrance}</p>}
                      {product.burnTime && <p><strong className="text-[#1A1A1A]">Burn Time:</strong> {product.burnTime}</p>}
                      <p className="mt-2 text-[#4A4A4A]">{product.description}</p>
                    </div>
                  )}

                  {activeTab === 'care' && (
                    <ul className="list-disc pl-4 space-y-1">
                      {product.careInstructions.map((tip, idx) => (
                        <li key={idx}>{tip}</li>
                      ))}
                    </ul>
                  )}

                  {activeTab === 'shipping' && (
                    <div className="space-y-1.5">
                      <p className="text-[#1A1A1A] font-semibold">Cash On Delivery (COD) Available</p>
                      <p>Doorstep delivery across India. Orders are confirmed directly on WhatsApp with our showroom team.</p>
                      <p>Complimentary luxury velvet presentation box with every jewellery piece.</p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Section: Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-[#EAE6DF] bg-white p-6 sm:p-8">
            <h3 className="font-serif text-lg text-[#1A1A1A] mb-4">
              Complete Your Look
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedProducts.map(rel => (
                <div
                  key={rel.id}
                  onClick={() => setSelectedProduct(rel)}
                  className="flex items-center gap-3 p-2 border border-[#EAE6DF] hover:border-[#D4AF37] cursor-pointer transition-colors bg-[#FAF8F5]"
                >
                  <div className="w-14 h-14 bg-[#18181C] overflow-hidden flex-shrink-0">
                    <JewelleryImage product={rel} showBadge={false} />
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-serif text-xs font-semibold text-[#1A1A1A] truncate">{rel.name}</h4>
                    <p className="font-serif text-xs text-[#6B1D2F] font-bold tabular-nums">₹{rel.price.toLocaleString('en-IN')}</p>
                    <p className="text-[10px] text-[#706E6B]">{rel.weight}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
