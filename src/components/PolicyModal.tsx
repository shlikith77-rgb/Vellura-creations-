import React from 'react';
import { X, ShieldAlert, FileText } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const PolicyModal: React.FC = () => {
  const { activePolicy, setActivePolicy, storeSettings } = useShop();

  if (!activePolicy) return null;

  const policyContent: Record<string, { title: string; content: string[] }> = {
    shipping: {
      title: 'Shipping & Delivery Policy',
      content: [
        'Notice: This policy is a sample template. The store owner will configure official delivery windows and courier partners prior to public launch.',
        'We offer doorstep delivery across India for all confirmed artificial jewellery and decorative candle orders.',
        'Cash on Delivery (COD) is available nationwide. Our showroom team verifies dispatch details directly via WhatsApp (+91 92533 42413) upon receipt of order.',
        'Orders above ₹1,500 qualify for complimentary standard shipping. Standard delivery generally completes in 4 to 7 business days depending on delivery location.',
      ],
    },
    returns: {
      title: 'Return & Exchange Policy',
      content: [
        'Notice: Sample policy preview. Final return and exchange timeframes will be updated by the store owner.',
        'Given the delicate craftsmanship of luxury artificial jewellery and hand-poured decorative candles, exchanges are welcomed in the unlikely event of transit breakage or manufacturing defects reported upon unboxing.',
        'Customers are requested to share unboxing video or photographs to our WhatsApp concierge (+91 92533 42413) within 48 hours of delivery.',
        'All returned items must remain in their original unworn condition with the authentic Vellura velvet box packaging intact.',
      ],
    },
    cancellation: {
      title: 'Cancellation Policy',
      content: [
        'Notice: Sample policy preview for demo purposes.',
        'Cash on Delivery orders may be cancelled prior to showroom dispatch by contacting our WhatsApp support with your Order ID.',
        'Once an order is handed over to our courier partner and tracking details are generated, cancellations cannot be processed in transit.',
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      content: [
        'Notice: Standard privacy statement. Subject to final review by store administration.',
        'Vellura Creations is committed to safeguarding customer confidentiality. Personal information including name, phone number, shipping address, and email is collected solely to process and fulfill your orders.',
        'We do not sell, rent, or trade customer contact details to third-party marketing entities.',
        'For inquiries regarding data removal, contact our showroom team at +91 92533 42413.',
      ],
    },
    terms: {
      title: 'Terms & Conditions',
      content: [
        'Notice: Legal conditions template for demo evaluation.',
        'All artificial jewellery and decorative candle pieces sold by Vellura Creations are presented with accurate dimensions, weights, and high-resolution photographs.',
        'Slight natural color or stone setting variations may occur due to handcrafted finishing and photographic lighting.',
        'Placing an order constitutes an agreement to accept delivery and tender cash/UPI payment upon doorstep handover.',
      ],
    },
  };

  const current = policyContent[activePolicy] || {
    title: 'Store Information',
    content: ['Information regarding Vellura Creations policies.'],
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div 
        className="relative bg-white w-full max-w-2xl max-h-[85vh] overflow-y-auto border border-[#D4AF37]/30 shadow-2xl flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-[#121214] text-[#FAF8F5] flex items-center justify-between border-b border-[#D4AF37]/30">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-serif text-lg font-semibold">{current.title}</h3>
          </div>

          <button
            onClick={() => setActivePolicy(null)}
            className="p-1.5 text-[#DCD6CB] hover:text-[#D4AF37] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-4 bg-[#FAF8F5] text-xs text-[#4A4A4A] leading-relaxed">
          {/* Safety Notice */}
          <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 flex items-start gap-2 rounded">
            <ShieldAlert className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <p className="text-[11px]">
              Placeholder policy preview: To be verified and customized by the owner of Vellura Creations with finalized business guidelines before official launch.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {current.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div className="pt-4 border-t border-[#EAE6DF] text-[11px] text-[#706E6B]">
            <p>For immediate support, contact <strong>{storeSettings.storeName}</strong> on WhatsApp: <strong>{storeSettings.whatsappNumber}</strong></p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#EAE6DF] flex justify-end">
          <button
            onClick={() => setActivePolicy(null)}
            className="px-5 py-2 bg-[#121214] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider hover:bg-[#2A2A30]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
