import React from 'react';
import { Award, Sparkles, Gem, Gift, ShieldCheck, MessageCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const TrustStrip: React.FC = () => {
  const { getWhatsAppDirectUrl } = useShop();

  const trustItems = [
    {
      icon: Award,
      title: 'Premium Quality',
      subtitle: 'AAA+ stones & micro-plated finish',
    },
    {
      icon: Sparkles,
      title: 'Elegant Designs',
      subtitle: 'Royal bridal & contemporary styles',
    },
    {
      icon: Gem,
      title: 'Carefully Curated',
      subtitle: 'Hand-inspected showroom catalog',
    },
    {
      icon: Gift,
      title: 'Beautiful Gift Options',
      subtitle: 'Luxury packaging & combo sets',
    },
    {
      icon: ShieldCheck,
      title: 'Trusted Local Brand',
      subtitle: 'Established reputed jewellery dealer',
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Support',
      subtitle: 'Direct personalized concierge',
      href: getWhatsAppDirectUrl(),
    },
  ];

  return (
    <section className="bg-[#FAF8F5] border-y border-[#EAE6DF] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-4">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            const content = (
              <div className="flex flex-col items-center text-center p-3 group transition-transform duration-300 hover:-translate-y-1">
                <div className="w-11 h-11 rounded-full bg-[#121214] text-[#D4AF37] border border-[#D4AF37]/30 flex items-center justify-center mb-3 shadow-sm group-hover:border-[#D4AF37] transition-colors">
                  <Icon className="w-5 h-5 stroke-[1.5]" />
                </div>
                <h4 className="font-serif text-sm font-semibold text-[#1A1A1A] tracking-wide mb-0.5">
                  {item.title}
                </h4>
                <p className="text-[11px] text-[#706E6B] leading-tight max-w-[150px]">
                  {item.subtitle}
                </p>
              </div>
            );

            if (item.href) {
              return (
                <a 
                  key={index} 
                  href={item.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block cursor-pointer"
                  title="Contact on WhatsApp"
                >
                  {content}
                </a>
              );
            }

            return <div key={index}>{content}</div>;
          })}
        </div>
      </div>
    </section>
  );
};
