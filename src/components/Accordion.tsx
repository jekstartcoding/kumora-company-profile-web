import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { revealVariants, staggerContainer } from '@/lib/animations';

export interface AccordionItem {
  question: string;
  answer: string;
}

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className="divide-y divide-rose/50 border-y border-rose/50"
      variants={staggerContainer(0.05)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
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
              <span className="font-serif text-lg text-plum md:text-xl">
                {item.question}
              </span>
              <motion.span
                initial={false}
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-rose text-plum transition-colors"
              >
                {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </motion.span>
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
              aria-hidden={!isOpen}
            >
              <div className="overflow-hidden">
                <motion.p
                  initial={false}
                  animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -4 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="pb-6 text-sm leading-relaxed text-charcoal-muted md:text-base"
                >
                  {item.answer}
                </motion.p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
