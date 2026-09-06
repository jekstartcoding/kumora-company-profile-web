import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { staggerContainer, cardVariants } from '@/lib/animations';

export interface AccordionItem {
  question: string;
  answer: string;
}

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const shouldReduce = useReducedMotion();

  return (
    <motion.div className="divide-y divide-sand-dark/50 border-y border-sand-dark/50" variants={staggerContainer(0.06)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.12 }}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <motion.div key={i} variants={shouldReduce ? undefined : cardVariants}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-clay md:py-6"
              aria-expanded={isOpen}
            >
              <span className="font-serif text-lg text-clay md:text-xl">
                {item.question}
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-sand-dark text-clay transition-colors">
                {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </span>
            </button>
            <div
              className="grid transition-all duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <p className="pb-6 text-sm leading-relaxed text-charcoal-muted md:text-base">
                  {item.answer}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
