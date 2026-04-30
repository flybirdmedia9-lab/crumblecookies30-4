import { MessageCircle } from "lucide-react";
import { getGeneralWhatsAppUrl } from "@/lib/whatsapp";

export const WhatsAppButton = () => {
  return (
    <a
      href={getGeneralWhatsAppUrl()}
      target="_blank"
      rel="noreferrer"
      aria-label="Order on WhatsApp"
      className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-warm transition-smooth animate-float hover:scale-110"
    >
      <MessageCircle className="h-7 w-7" fill="currentColor" />
      <span className="sr-only">Chat on WhatsApp</span>
    </a>
  );
};
