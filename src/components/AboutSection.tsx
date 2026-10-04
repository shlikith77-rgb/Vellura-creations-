import React from 'react';
import { Sparkles, CheckCircle2, Shield, HeartHandshake, Eye, Award } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AboutSection: React.FC = () => {
  const { storeSettings, getWhatsAppDirectUrl, siteContent } = useShop();

  const reasons = [
    {
      title: 'Curated Designs',
      desc: 'Selected with discerning taste, balancing traditional royal motifs and contemporary festive aesthetics.',
    },
    {
      title: 'Premium Presentation',
      desc: 'Every piece is packaged in luxury velvet jewelry chests, ready for grand gifting and heirloom preservation.',
    },
    {
      title: 'Wide Variety',
      desc: 'Extensive showroom collection spanning bridal chokers, tennis necklaces, earrings, and floating festival candles.',
    },
    {
      title: 'Perfect for Gifting',
      desc: 'Thoughtfully paired jewellery and candle hampers designed to make birthdays, weddings, and festivals memorable.',
    },
    {
      title: 'Personal Assistance',
      desc: 'Direct concierge support via WhatsApp (+91 92533 42413) to help with styling advice, sizing, and order tracking.',
    },
    {
      title: 'Cash on Delivery',
      desc: 'Convenient Cash on Delivery payment option with prompt doorstep dispatch across India.',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-[#FAF8F5] border-t border-[#EAE6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Story (Requirement 18) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Vellura Heritage</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#1A1A1A] tracking-tight leading-tight">
              {siteContent.aboutTitle}
            </h2>

            <p className="text-base text-[#4A4A4A] font-light leading-relaxed">
              {siteContent.aboutStory1}
            </p>

            <p className="text-sm text-[#706E6B] font-light leading-relaxed">
              {siteContent.aboutStory2}
            </p>

            <div className="pt-2 flex items-center gap-4">
              <a
                href={getWhatsAppDirectUrl('Hello Vellura Creations, I would like to learn more about your showroom collection.')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#121214] text-[#FAF8F5] hover:bg-[#2A2A30] text-xs font-semibold uppercase tracking-[0.18em] transition-colors"
              >
                Connect With Us
              </a>
              <span className="text-xs text-[#706E6B] font-mono">
                {storeSettings.displayPhone}
              </span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative p-6 sm:p-10 bg-[#121214] text-[#FAF8F5] border border-[#D4AF37]/40 shadow-xl">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block">
                  Showroom Philosophy
                </span>
                <blockquote className="font-serif text-2xl sm:text-3xl font-light italic leading-snug text-[#FAF8F5]">
                  {siteContent.aboutQuote}
                </blockquote>
                <div className="pt-4 border-t border-[#2A2A30] flex items-center justify-between text-xs text-[#8E8B85]">
                  <span>{storeSettings.storeName}</span>
                  <span>Premium Artificial Jewellery & Decorative Candles</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Why Choose Vellura Creations (Requirement 19) */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium block">
              The Dealer Difference
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-normal tracking-tight">
              WHY VELLURA CREATIONS?
            </h3>
            <p className="text-sm text-[#706E6B] font-light">
              Crafted with care, presented with luxury, and backed by direct local customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((reason, idx) => (
              <div
                key={idx}
                className="p-6 bg-white border border-[#EAE6DF] hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="w-10 h-10 rounded-full bg-[#121214] text-[#D4AF37] flex items-center justify-center mb-4 border border-[#D4AF37]/30">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-xl font-normal text-[#1A1A1A] mb-2">
                  {reason.title}
                </h4>
                <p className="text-xs text-[#706E6B] font-light leading-relaxed">
                  {reason.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
