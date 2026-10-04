import React, { useState } from 'react';
import { X, ShieldCheck, Check, Truck, ArrowRight, AlertCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartSubtotal, 
    cartDiscount, 
    cartTotal,
    placeOrder 
  } = useShop();

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    whatsappNumber: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
    notes: '',
  });

  const [sameAsPhone, setSameAsPhone] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const shippingFee = cartTotal >= 1500 ? 0 : 99;
  const finalPayable = cartTotal + shippingFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phone || !formData.address || !formData.pincode) {
      return;
    }

    setIsSubmitting(true);

    const waPhone = sameAsPhone ? formData.phone : (formData.whatsappNumber || formData.phone);

    // Place COD order
    placeOrder({
      customerName: formData.customerName,
      phone: formData.phone,
      whatsappNumber: waPhone,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      landmark: formData.landmark,
      notes: formData.notes,
    });

    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div 
        className="relative bg-white w-full max-w-3xl max-h-[94vh] overflow-y-auto border border-[#D4AF37]/30 shadow-2xl flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-[#121214] text-[#FAF8F5] flex items-center justify-between border-b border-[#D4AF37]/30">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold block">
              Vellura Express Checkout
            </span>
            <h3 className="font-serif text-xl font-normal text-[#FAF8F5]">
              Cash on Delivery Order Details
            </h3>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 text-[#DCD6CB] hover:text-[#D4AF37] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 bg-[#FAF8F5]">
          
          {/* Order Summary Snapshot */}
          <div className="bg-white border border-[#EAE6DF] p-4 text-xs space-y-2">
            <div className="flex justify-between items-center font-serif text-sm font-semibold text-[#1A1A1A] border-b border-[#F2EFE9] pb-2">
              <span>Selected Showroom Pieces ({cart.reduce((a, b) => a + b.quantity, 0)} items)</span>
              <span className="tabular-nums text-[#6B1D2F]">Payable: ₹{finalPayable.toLocaleString('en-IN')}</span>
            </div>
            <div className="divide-y divide-[#F5F3EE] max-h-32 overflow-y-auto">
              {cart.map(item => (
                <div key={item.id} className="py-1.5 flex justify-between text-[#706E6B]">
                  <span className="truncate max-w-[240px]">
                    {item.product.name} × {item.quantity}
                    {item.selectedVariant ? ` (${item.selectedVariant})` : ''}
                  </span>
                  <span className="font-mono tabular-nums text-[#1A1A1A]">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Personal Details */}
          <div>
            <h4 className="font-serif text-base text-[#1A1A1A] font-semibold mb-3">
              1. Customer Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#1A1A1A] mb-1 font-medium">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#DCD6CB] text-xs focus:outline-none focus:border-[#121214]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#1A1A1A] mb-1 font-medium">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#DCD6CB] text-xs focus:outline-none focus:border-[#121214]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="flex items-center gap-2 text-xs text-[#706E6B] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sameAsPhone}
                    onChange={(e) => setSameAsPhone(e.target.checked)}
                    className="accent-[#6B1D2F]"
                  />
                  <span>WhatsApp Number is same as Mobile Number</span>
                </label>
                {!sameAsPhone && (
                  <div className="mt-2">
                    <label className="block text-xs uppercase tracking-wider text-[#1A1A1A] mb-1 font-medium">
                      WhatsApp Number for Order Confirmation *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.whatsappNumber}
                      onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-[#DCD6CB] text-xs focus:outline-none focus:border-[#121214]"
                    />
                  </div>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs uppercase tracking-wider text-[#1A1A1A] mb-1 font-medium">
                  Email Address (For e-receipt)
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#DCD6CB] text-xs focus:outline-none focus:border-[#121214]"
                />
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div>
            <h4 className="font-serif text-base text-[#1A1A1A] font-semibold mb-3">
              2. Delivery Address (Across India)
            </h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#1A1A1A] mb-1 font-medium">
                  Complete Street Address / House / Apartment No. *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="House No, Apartment/Street Name"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#DCD6CB] text-xs focus:outline-none focus:border-[#121214]"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#1A1A1A] mb-1 font-medium">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jaipur"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#DCD6CB] text-xs focus:outline-none focus:border-[#121214]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#1A1A1A] mb-1 font-medium">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajasthan"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#DCD6CB] text-xs focus:outline-none focus:border-[#121214]"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs uppercase tracking-wider text-[#1A1A1A] mb-1 font-medium">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 302001"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#DCD6CB] text-xs focus:outline-none focus:border-[#121214]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#1A1A1A] mb-1 font-medium">
                  Landmark (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Near temple, metro station, or market"
                  value={formData.landmark}
                  onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#DCD6CB] text-xs focus:outline-none focus:border-[#121214]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#1A1A1A] mb-1 font-medium">
                  Special Instructions / Gifting Note
                </label>
                <input
                  type="text"
                  placeholder="e.g. Please add luxury gift ribbon or call before delivery"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#DCD6CB] text-xs focus:outline-none focus:border-[#121214]"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Section (Requirement 26: Clearly show Cash on Delivery. If online payment is not connected, do not pretend) */}
          <div className="border-t border-[#EAE6DF] pt-4">
            <h4 className="font-serif text-base text-[#1A1A1A] font-semibold mb-3">
              3. Payment Method
            </h4>
            <div className="p-4 bg-white border-2 border-[#6B1D2F] flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-[#6B1D2F] flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#6B1D2F]" />
                </div>
                <div>
                  <p className="font-serif text-sm font-semibold text-[#1A1A1A]">
                    Cash on Delivery (COD)
                  </p>
                  <p className="text-[11px] text-[#706E6B]">
                    Pay in cash or UPI to courier agent upon doorstep delivery.
                  </p>
                </div>
              </div>

              <span className="text-xs font-mono font-bold text-[#6B1D2F] bg-[#6B1D2F]/10 px-2.5 py-1">
                Selected
              </span>
            </div>

            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#8E8B85]">
              <AlertCircle className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Direct showroom COD with WhatsApp order dispatch verification.</span>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#6B1D2F] hover:bg-[#801B31] disabled:bg-[#CCCCCC] text-white text-xs font-semibold uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-colors shadow-xl"
            >
              <span>Place Cash on Delivery Order (₹{finalPayable.toLocaleString('en-IN')})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-center text-[10px] text-[#8E8B85] mt-2">
              By placing this order you will receive an Order ID with instant WhatsApp confirmation.
            </p>
          </div>

        </form>
      </div>
    </div>
  );
};
