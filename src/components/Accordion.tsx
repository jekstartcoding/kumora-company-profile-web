import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useMotionPreference';
import { revealVariants, staggerContainer } from '@/lib/animations';
import { useViewportAmount } from '@/hooks/useViewportAmount';

export interface AccordionItem {
  question: string;
  answer: string;
}

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const shouldReduce = useReducedMotion();
  const viewportAmount = useViewportAmount();

  return (
    <motion.div
      className="divide-y divide-rose/50 border-y border-rose/50"
      variants={staggerContainer(0.05)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: viewportAmount }}
    >
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <motion.div key={i} variants={shouldReduce ? undefined : revealVariants}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors duration-300 ease-out hover:text-plum md:py-6"
              aria-expanded={isOpen}
            >
              <span className="font-serif text-lg text-charcoal md:text-xl">
                {item.question}
              </span>
              <motion.span
                initial={false}
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-rose text-charcoal transition-colors"
              >
                {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={shouldReduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={shouldReduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 text-sm leading-relaxed text-charcoal-muted md:text-base">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
