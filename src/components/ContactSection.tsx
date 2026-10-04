import React, { useState } from 'react';
import { MessageCircle, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ContactSection: React.FC = () => {
  const { storeSettings, getWhatsAppDirectUrl } = useShop();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    const enquiryMessage = `New Website Enquiry:
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email || 'N/A'}
Message: ${formData.message || 'I would like to inquire about your collections.'}`;

    // Open WhatsApp with enquiry
    window.open(getWhatsAppDirectUrl(enquiryMessage), '_blank');
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 bg-[#121214] text-[#FAF8F5] border-t border-[#D4AF37]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Info (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-medium block">
              Direct Showroom Line
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#FAF8F5]">
              {storeSettings.storeName}
            </h2>
            <p className="text-sm text-[#DCD6CB] font-light leading-relaxed">
              We welcome private bridal consultations, bulk gifting requests, and festive inquiries. Contact our showroom dealer team directly.
            </p>

            <div className="pt-2 space-y-4">
              <div className="flex items-center gap-3 text-sm text-[#DCD6CB]">
                <div className="w-10 h-10 rounded-full bg-[#1C1C22] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-[#8E8B85]">WhatsApp & Direct Line</p>
                  <p className="font-serif text-lg font-semibold text-[#FAF8F5] tracking-wide">
                    {storeSettings.displayPhone}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-[#DCD6CB]">
                <div className="w-10 h-10 rounded-full bg-[#1C1C22] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-[#8E8B85]">Showroom Inquiries</p>
                  <p className="font-mono text-sm text-[#FAF8F5]">velluracreations@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <a
                href={getWhatsAppDirectUrl('Hello Vellura Creations, I would like to chat with your concierge.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-5 bg-[#25D366] hover:bg-[#20BA5A] text-[#121214] text-xs font-semibold uppercase tracking-[0.18em] flex items-center justify-center gap-2 transition-colors shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={`tel:${storeSettings.whatsappNumber.replace(/[^0-9+]/g, '')}`}
                className="py-3 px-5 border border-[#D4AF37]/50 hover:bg-[#D4AF37]/15 text-[#FAF8F5] text-xs font-semibold uppercase tracking-[0.18em] flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>Call Now</span>
              </a>
            </div>
          </div>

          {/* Right Column: Enquiry Form (lg:col-span-7) */}
          <div className="lg:col-span-7 bg-[#1A1A20] border border-[#D4AF37]/30 p-6 sm:p-8 shadow-xl">
            <h3 className="font-serif text-2xl font-normal text-[#FAF8F5] mb-2">
              Send an Enquiry
            </h3>
            <p className="text-xs text-[#8E8B85] mb-6 font-light">
              Fill out the details below and connect immediately with our showroom specialist.
            </p>

            {submitted ? (
              <div className="p-6 bg-[#25D366]/10 border border-[#25D366]/40 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-[#25D366] mx-auto" />
                <h4 className="font-serif text-lg text-[#FAF8F5]">Enquiry Prepared</h4>
                <p className="text-xs text-[#DCD6CB]">
                  Connecting to WhatsApp with your enquiry details...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#DCD6CB] mb-1 font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radhika Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#121214] border border-[#2C2C32] focus:border-[#D4AF37] text-xs text-[#FAF8F5] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#DCD6CB] mb-1 font-medium">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#121214] border border-[#2C2C32] focus:border-[#D4AF37] text-xs text-[#FAF8F5] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#DCD6CB] mb-1 font-medium">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#121214] border border-[#2C2C32] focus:border-[#D4AF37] text-xs text-[#FAF8F5] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#DCD6CB] mb-1 font-medium">
                    Message / Requirement
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about the jewellery design, candle fragrance, or event you're shopping for..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#121214] border border-[#2C2C32] focus:border-[#D4AF37] text-xs text-[#FAF8F5] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#D4AF37] hover:bg-[#E6CA65] text-[#121214] text-xs font-semibold uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Enquiry</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
