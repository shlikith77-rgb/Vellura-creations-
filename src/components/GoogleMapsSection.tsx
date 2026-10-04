import React from 'react';
import { MapPin, Navigation, Phone, Clock, MessageCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const GoogleMapsSection: React.FC = () => {
  const { storeSettings, getWhatsAppDirectUrl } = useShop();

  return (
    <section id="location" className="py-20 bg-[#FAF8F5] border-t border-[#EAE6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium block">
            Showroom Destination
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-normal tracking-tight">
            VISIT VELLURA CREATIONS
          </h2>
          <p className="text-sm text-[#706E6B] font-light">
            Experience the tactile elegance of our jewellery and decorative candles in person.
          </p>
        </div>

        {/* Showroom Details + Map Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Details Card (lg:col-span-5) */}
          <div className="lg:col-span-5 bg-white border border-[#EAE6DF] p-8 flex flex-col justify-between shadow-sm">
            <div className="space-y-6">
              
              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#C5A059] font-semibold block mb-1">
                  Retail Flagship
                </span>
                <h3 className="font-serif text-2xl text-[#1A1A1A] font-normal">
                  {storeSettings.storeName}
                </h3>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3.5 text-xs text-[#4A4A4A]">
                <MapPin className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-[#1A1A1A] mb-0.5">Showroom Address</p>
                  <p className="leading-relaxed">{storeSettings.address}</p>
                  <p className="text-[#8E8B85] mt-0.5">{storeSettings.city}</p>
                </div>
              </div>

              {/* Contact */}
              <div className="flex items-start gap-3.5 text-xs text-[#4A4A4A]">
                <Phone className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-[#1A1A1A] mb-0.5">Contact / WhatsApp</p>
                  <p className="font-mono text-sm">{storeSettings.displayPhone}</p>
                  <p className="text-[11px] text-[#8E8B85]">Showroom Concierge & Order Queries</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3.5 text-xs text-[#4A4A4A]">
                <Clock className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-[#1A1A1A] mb-0.5">Showroom Hours</p>
                  <p>Monday – Saturday: 10:30 AM – 8:30 PM</p>
                  <p>Sunday: 11:00 AM – 7:00 PM</p>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="pt-8 border-t border-[#F2EFE9] space-y-3">
              <a
                href={storeSettings.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#121214] hover:bg-[#2A2A30] text-[#FAF8F5] text-xs font-semibold uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Navigation className="w-4 h-4 text-[#D4AF37]" />
                <span>Get Directions</span>
              </a>

              <a
                href={getWhatsAppDirectUrl('Hello Vellura Creations, I would like to confirm your showroom timing and address before visiting.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#128C7E] text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Enquire Before Visiting</span>
              </a>
            </div>

          </div>

          {/* Right Map Canvas (lg:col-span-7) */}
          <div className="lg:col-span-7 relative min-h-[360px] bg-slate-100 border border-[#EAE6DF] overflow-hidden shadow-sm">
            <iframe
              title="Vellura Creations Location Map"
              src={storeSettings.googleMapsEmbedUrl}
              className="w-full h-full min-h-[360px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Map Overlay Badge */}
            <div className="absolute top-4 left-4 bg-[#121214]/90 backdrop-blur-sm border border-[#D4AF37]/30 px-3 py-1.5 text-xs text-[#FAF8F5] shadow-lg pointer-events-none">
              <span className="font-serif font-semibold">{storeSettings.storeName}</span>
              <span className="text-[10px] text-[#D4AF37] block">Local Artificial Jewellery Dealer</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
