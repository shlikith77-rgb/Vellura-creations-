import React from 'react';
import { CheckCircle2, MessageCircle, ArrowRight, Printer, Sparkles, Home } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const OrderConfirmationModal: React.FC = () => {
  const { 
    confirmedOrder, 
    setConfirmedOrder, 
    getWhatsAppOrderUrl, 
    storeSettings 
  } = useShop();

  if (!confirmedOrder) return null;

  const handleWhatsAppConfirm = () => {
    window.open(getWhatsAppOrderUrl(confirmedOrder), '_blank');
  };

  const handleClose = () => {
    setConfirmedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div 
        className="relative bg-white w-full max-w-2xl max-h-[94vh] overflow-y-auto border border-[#D4AF37]/50 shadow-2xl flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner */}
        <div className="bg-[#121214] text-[#FAF8F5] p-6 sm:p-8 text-center relative border-b border-[#D4AF37]/30">
          <div className="w-16 h-16 rounded-full bg-[#1C1C22] border-2 border-[#D4AF37] flex items-center justify-center mx-auto mb-3 shadow-lg">
            <CheckCircle2 className="w-9 h-9 text-[#D4AF37]" />
          </div>

          <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block mb-1">
            Order Received
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5] font-normal tracking-tight">
            Thank you for shopping with Vellura Creations
          </h2>
          <p className="text-xs text-[#DCD6CB] mt-2 font-light max-w-md mx-auto">
            Your Cash on Delivery reservation has been registered with our showroom dispatch team.
          </p>
        </div>

        {/* Order Details Body */}
        <div className="p-6 sm:p-8 space-y-6 bg-[#FAF8F5]">
          
          {/* Order ID & Status Ribbon */}
          <div className="p-4 bg-white border border-[#EAE6DF] flex flex-wrap items-center justify-between gap-3 shadow-sm">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-[#706E6B]">Showroom Order ID</p>
              <p className="font-mono text-xl font-bold text-[#1A1A1A] tracking-wider">
                #{confirmedOrder.id}
              </p>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider">
                Cash On Delivery
              </span>
              <p className="text-[10px] text-[#706E6B] mt-0.5">Pay upon delivery</p>
            </div>
          </div>

          {/* High Priority WhatsApp Action (Requirement 27 & 28) */}
          <div className="p-5 bg-gradient-to-r from-[#202E24] via-[#1A2E20] to-[#202E24] border border-[#25D366]/50 text-[#FAF8F5] shadow-lg space-y-3">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-[#25D366] flex-shrink-0" />
              <h4 className="font-serif text-lg font-semibold">
                Confirm Order on WhatsApp
              </h4>
            </div>
            <p className="text-xs text-[#DCD6CB] font-light leading-relaxed">
              Click below to send your prepared order details directly to our showroom owner on WhatsApp (<strong>{storeSettings.whatsappNumber}</strong>) for instant confirmation and dispatch priority.
            </p>
            <button
              onClick={handleWhatsAppConfirm}
              className="w-full py-3.5 px-6 bg-[#25D366] hover:bg-[#20BA5A] text-[#121214] text-xs font-bold uppercase tracking-[0.18em] flex items-center justify-center gap-2 transition-transform transform active:scale-98 shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Confirm Order on WhatsApp (+91 92533 42413)</span>
            </button>
            <p className="text-[10px] text-[#8E8B85] text-center italic">
              Opens WhatsApp with pre-filled items, price breakdown, and address.
            </p>
          </div>

          {/* Products Summary */}
          <div className="bg-white border border-[#EAE6DF] p-5 space-y-3">
            <h4 className="font-serif text-base font-semibold text-[#1A1A1A] border-b border-[#F2EFE9] pb-2">
              Order Items
            </h4>
            <div className="divide-y divide-[#F2EFE9] max-h-48 overflow-y-auto">
              {confirmedOrder.items.map(item => (
                <div key={item.id} className="py-2.5 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">{item.product.name}</p>
                    <p className="text-[11px] text-[#706E6B]">
                      Qty: {item.quantity} {item.selectedVariant ? `· ${item.selectedVariant}` : ''} {item.selectedSize ? `· ${item.selectedSize}` : ''}
                    </p>
                  </div>
                  <span className="font-mono font-semibold text-[#1A1A1A] tabular-nums">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#EAE6DF] space-y-1 text-xs text-[#706E6B]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums text-[#1A1A1A]">₹{confirmedOrder.subtotal.toLocaleString('en-IN')}</span>
              </div>
              {confirmedOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Festive Discount</span>
                  <span className="font-mono tabular-nums">-₹{confirmedOrder.discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between font-serif text-base font-bold text-[#1A1A1A] pt-2 border-t border-[#F2EFE9]">
                <span>Total Due on Delivery</span>
                <span className="text-lg tabular-nums text-[#6B1D2F]">
                  ₹{confirmedOrder.total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Shipping Address Snapshot */}
          <div className="bg-white border border-[#EAE6DF] p-5 text-xs text-[#4A4A4A] space-y-1">
            <h4 className="font-serif text-base font-semibold text-[#1A1A1A] mb-1">
              Delivery Address
            </h4>
            <p className="font-semibold text-[#1A1A1A]">{confirmedOrder.customerName}</p>
            <p>{confirmedOrder.address}, {confirmedOrder.city}, {confirmedOrder.state} - {confirmedOrder.pincode}</p>
            {confirmedOrder.landmark && <p className="text-[#8E8B85]">Landmark: {confirmedOrder.landmark}</p>}
            <p className="text-[#8E8B85]">Phone: {confirmedOrder.phone} | WhatsApp: {confirmedOrder.whatsappNumber}</p>
          </div>

          {/* Close & Continue Shopping */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleClose}
              className="flex-1 py-3 bg-[#121214] text-[#FAF8F5] hover:bg-[#2A2A30] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Back to Storefront</span>
            </button>

            <button
              onClick={() => window.print()}
              className="py-3 px-5 border border-[#DCD6CB] text-[#1A1A1A] hover:bg-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Receipt</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
