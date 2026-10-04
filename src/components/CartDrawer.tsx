import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { JewelleryImage } from './JewelleryImage';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    cartSubtotal, 
    cartDiscount, 
    cartTotal,
    cartCount,
    setIsCheckoutOpen,
    appliedOffer,
    applyCoupon,
    removeCoupon
  } = useShop();

  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ text: string; error?: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    setCouponMessage({ text: res.message, error: !res.success });
    if (res.success) setCouponCode('');
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in">
      <div 
        className="w-full max-w-md bg-[#FAF8F5] text-[#1A1A1A] h-full shadow-2xl flex flex-col justify-between border-l border-[#D4AF37]/30"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Drawer Header */}
        <div className="p-5 bg-[#121214] text-[#FAF8F5] flex items-center justify-between border-b border-[#D4AF37]/30">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-serif text-lg tracking-wider font-semibold">Your Shopping Bag</h3>
            <span className="text-xs text-[#8E8B85]">({cartCount} items)</span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-[#DCD6CB] hover:text-[#D4AF37] transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Trust Strip */}
        <div className="bg-[#FAF3E0] px-4 py-2 text-center text-xs text-[#8A6D3B] border-b border-[#EAE6DF] font-medium">
          {cartTotal >= 1500 ? (
            <span>✓ Eligible for <strong>Free Express Doorstep Delivery</strong> across India</span>
          ) : (
            <span>Add ₹{(1500 - cartTotal).toLocaleString('en-IN')} more to unlock <strong>Free Delivery</strong></span>
          )}
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-[#EAE6DF]">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-white border border-[#EAE6DF] flex items-center justify-center text-[#8E8B85]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-xl text-[#1A1A1A]">Your shopping bag is empty</h4>
              <p className="text-xs text-[#706E6B] max-w-xs">
                Discover our royal artificial jewellery and decorative candles to begin.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 bg-[#121214] text-[#FAF8F5] text-xs uppercase tracking-wider font-semibold hover:bg-[#2A2A30] transition-colors"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="py-4 flex gap-4 items-start">
                {/* Thumbnail */}
                <div className="w-18 h-20 bg-[#18181C] border border-[#EAE6DF] flex-shrink-0 overflow-hidden">
                  <JewelleryImage product={item.product} showBadge={false} />
                </div>

                {/* Details */}
                <div className="flex-1 overflow-hidden">
                  <h4 className="font-serif text-sm font-semibold text-[#1A1A1A] truncate">
                    {item.product.name}
                  </h4>

                  {/* Metadata */}
                  <div className="text-[11px] text-[#706E6B] space-y-0.5 mt-0.5">
                    {item.selectedVariant && <p>Variant: {item.selectedVariant}</p>}
                    {item.selectedSize && <p>Fit: {item.selectedSize}</p>}
                    <p className="text-[10px] text-[#8E8B85]">Weight: {item.product.weight}</p>
                  </div>

                  {/* Price & Quantity Controls */}
                  <div className="mt-2.5 flex items-center justify-between">
                    <div className="flex items-center border border-[#DCD6CB] bg-white">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-xs hover:bg-[#F2EFE9]"
                      >
                        -
                      </button>
                      <span className="w-7 text-center text-xs font-semibold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stockQuantity}
                        className="w-6 h-6 flex items-center justify-center text-xs hover:bg-[#F2EFE9] disabled:opacity-30"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-serif text-sm font-bold text-[#1A1A1A] tabular-nums">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#8E8B85] hover:text-[#6B1D2F] transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer */}
        {cart.length > 0 && (
          <div className="p-5 bg-white border-t border-[#EAE6DF] space-y-4">
            
            {/* Coupon Code Input */}
            <div>
              {appliedOffer ? (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-800">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Coupon <strong>{appliedOffer.code}</strong> applied ({appliedOffer.discountPercent}% OFF)</span>
                  </div>
                  <button onClick={removeCoupon} className="text-xs text-emerald-700 underline font-semibold">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Coupon (e.g. FESTIVE15)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-[#FAF8F5] border border-[#EAE6DF] text-xs uppercase placeholder:normal-case focus:outline-none focus:border-[#121214]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-[#121214] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider hover:bg-[#2A2A30]"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponMessage && (
                <p className={`text-[11px] mt-1 ${couponMessage.error ? 'text-red-600' : 'text-emerald-700'}`}>
                  {couponMessage.text}
                </p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-[#706E6B] border-t border-[#F2EFE9] pt-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums text-[#1A1A1A]">₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Special Festive Discount</span>
                  <span className="font-mono tabular-nums">-₹{cartDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-emerald-700 font-semibold">
                  {cartTotal >= 1500 ? 'FREE' : '₹99 (Add above ₹1,500 for Free)'}
                </span>
              </div>
              <div className="pt-2 border-t border-[#EAE6DF] flex justify-between items-baseline text-base font-serif font-bold text-[#1A1A1A]">
                <span>Total Amount</span>
                <span className="text-xl tabular-nums text-[#6B1D2F]">
                  ₹{(cartTotal + (cartTotal >= 1500 ? 0 : 99)).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 bg-[#6B1D2F] hover:bg-[#801B31] text-white text-xs font-semibold uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-colors shadow-lg"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#8E8B85]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Cash on Delivery Available · WhatsApp Order Confirmation</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
