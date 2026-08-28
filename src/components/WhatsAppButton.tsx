import { MessageCircle } from 'lucide-react';
import { generateWhatsAppMessage, generateWhatsAppURL } from '@/data/products';
import { motion, useReducedMotion } from 'framer-motion';
import { cardVariants } from '@/lib/animations';

export default function WhatsAppButton() {
  const shouldReduce = useReducedMotion();

  return (
    <motion.a
      href={generateWhatsAppURL(generateWhatsAppMessage())}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hubungi kami di WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-all duration-300 hover:scale-105 hover:shadow-xl sm:bottom-6 sm:right-6"
      variants={shouldReduce ? undefined : cardVariants}
      initial="hidden"
      animate="show"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-forest px-4 py-2 text-xs font-medium text-ivory opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block">
        Hubungi kami
      </span>
    </motion.a>
  );
}
