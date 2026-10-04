import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const FloatingWhatsApp: React.FC = () => {
  const { storeSettings, getWhatsAppDirectUrl } = useShop();
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end gap-3">
      {/* Tooltip prompt */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 p-3 bg-[#121214] text-[#FAF8F5] border border-[#D4AF37]/50 shadow-2xl animate-in slide-in-from-right-4 duration-300">
          <div className="text-xs">
            <p className="font-semibold text-[#D4AF37]">Need assistance?</p>
            <p className="text-[11px] text-[#DCD6CB]">Chat directly with our showroom team</p>
          </div>
          <button 
            onClick={() => setShowTooltip(false)}
            className="text-[#8E8B85] hover:text-white p-0.5"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={getWhatsAppDirectUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95 group relative border-2 border-white/20"
        title="Chat with Vellura Creations on WhatsApp"
        aria-label="WhatsApp Concierge"
      >
        <MessageCircle className="w-7 h-7 fill-current stroke-none" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-600 rounded-full border-2 border-[#121214] animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-600 rounded-full border-2 border-[#121214]" />
      </a>
    </div>
  );
};
