import { MessageCircle } from 'lucide-react';
import { generateWhatsAppURL } from '@/data/products';

export default function WhatsAppButton() {
  return (
    <a
      href={generateWhatsAppURL({
        type: 'standard',
        productName: 'Kumora products',
        variantLabel: 'general inquiry',
      })}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hubungi kami di WhatsApp"
      className="group fixed bottom-[calc(var(--bottom-nav-h,72px)+16px+env(safe-area-inset-bottom,0px))] right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-plum text-ivory shadow-lg shadow-plum/30 transition-colors duration-300 ease-out hover:bg-plum-700 sm:right-6 md:bottom-[calc(var(--bottom-nav-h,72px)+24px)]"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-plum px-4 py-2 text-xs font-medium text-ivory opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 md:block">
        Hubungi kami
      </span>
    </a>
  );
}
