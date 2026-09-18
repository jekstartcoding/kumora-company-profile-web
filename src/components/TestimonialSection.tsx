// Fase 7.2 (plan CMS) — testimoni dari home_testimonials_section + testimonials
// (baris is_published=false tersaring implisit lewat RLS).
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useMotionPreference';
import { revealVariants, staggerContainer } from '@/lib/animations';
import { useViewportAmount } from '@/hooks/useViewportAmount';
import { useCmsData, getTestimonials } from '@/lib/cms';

export default function TestimonialSection() {
  const shouldReduce = useReducedMotion();
  const viewportAmount = useViewportAmount();
  const { data } = useCmsData(getTestimonials);

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
            <p className="eyebrow">{data?.section.eyebrow ?? '…'}</p>
            <h2 className="mt-3 font-serif text-section text-charcoal text-balance">
              {data?.section.title ?? '…'}
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
          {(data?.items ?? []).map((t) => (
            <motion.figure
              key={t.id}
              variants={shouldReduce ? undefined : revealVariants}
              className="flex flex-col rounded-2xl border border-rose/40 bg-ivory p-7 md:p-8"
            >
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`h-4 w-4 ${s <= t.rating ? 'fill-mauve text-mauve' : 'text-rose'}`}
                  />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 font-serif text-lg leading-relaxed text-charcoal md:text-xl">
                "{t.comment}"
              </blockquote>
              <figcaption className="mt-6 text-sm text-charcoal-muted">
                <span className="font-medium text-charcoal">{t.author_name}</span>
                <span className="text-charcoal-muted"> — {t.author_location}</span>
              </figcaption>
            </motion.figure>
          ))}
          {!data &&
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl border border-rose/40 bg-ivory p-7 md:p-8">
                <div className="h-4 w-24 rounded bg-mist" />
                <div className="mt-5 h-4 w-full rounded bg-mist" />
                <div className="mt-2 h-4 w-2/3 rounded bg-mist" />
              </div>
            ))}
        </motion.div>
      </div>
    </section>
  );
}
