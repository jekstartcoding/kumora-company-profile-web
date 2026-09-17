import { Star } from 'lucide-react';
import { TESTIMONIALS } from '@/data/content';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useMotionPreference';
import { revealVariants, staggerContainer } from '@/lib/animations';
import { useViewportAmount } from '@/hooks/useViewportAmount';

export default function TestimonialSection() {
  const shouldReduce = useReducedMotion();
  const viewportAmount = useViewportAmount();

  return (
    <section className="bg-blush/30 py-20 md:py-28">
      <div className="container-wide">
        <motion.div
          variants={staggerContainer(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: viewportAmount }}
        >
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Testimoni</p>
            <h2 className="mt-3 font-serif text-section text-charcoal text-balance">
              Disukai Mereka yang Tidurnya Lebih Nyenyak
            </h2>
          </div>
        </motion.div>

        <motion.div
          className="mt-14 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-8"
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: viewportAmount }}
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={i}
              variants={shouldReduce ? undefined : revealVariants}
              className="flex flex-col rounded-2xl border border-rose/40 bg-ivory p-7 md:p-8"
            >
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="h-4 w-4 fill-mauve text-mauve" />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 font-serif text-lg leading-relaxed text-charcoal md:text-xl">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 text-sm text-charcoal-muted">
                <span className="font-medium text-charcoal">{t.author}</span>
                <span className="text-charcoal-muted"> — {t.location}</span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
