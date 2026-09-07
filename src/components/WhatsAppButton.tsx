import { MessageCircle } from 'lucide-react';
import { generateWhatsAppMessage, generateWhatsAppURL } from '@/data/products';

export default function WhatsAppButton() {
  return (
    <a
      href={generateWhatsAppURL(generateWhatsAppMessage())}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hubungi kami di WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-plum text-ivory shadow-lg shadow-plum/30 transition-colors duration-300 ease-out hover:bg-plum-700 sm:bottom-6 sm:right-6"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-plum px-4 py-2 text-xs font-medium text-ivory opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 md:block">
        Hubungi kami
      </span>
    </a>
  );
}
