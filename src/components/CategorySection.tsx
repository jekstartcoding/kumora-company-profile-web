// Fase 7.2 (plan CMS) — kategori tiles dari home_category_section + category_content
// (display_name, description, tile_image_url, link_text dari database).
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useMotionPreference';
import { revealVariants, staggerContainer } from '@/lib/animations';
import { useViewportAmount } from '@/hooks/useViewportAmount';
import { useCmsData, getCategoryTiles, type CategoryContent } from '@/lib/cms';

// Fallback tile image per kategori (dipakai hanya jika tile_image_url null di DB).
const FALLBACK_TILE: Record<string, string> = {
  pillows:
    'https://images.pexels.com/photos/16394333/pexels-photo-16394333.jpeg?auto=compress&cs=tinysrgb&w=1200',
  bolsters:
    'https://images.pexels.com/photos/4110345/pexels-photo-4110345.jpeg?auto=compress&cs=tinysrgb&w=1200',
  beds: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1200',
};

export default function CategorySection() {
  const shouldReduce = useReducedMotion();
  const viewportAmount = useViewportAmount();
  const { data } = useCmsData(getCategoryTiles);

  return (
    <section className="bg-ivory py-20 md:py-28">
      <div className="container-wide">
        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: viewportAmount }}
        >
          <div className="max-w-2xl">
            <p className="eyebrow">{data?.section.eyebrow ?? '…'}</p>
            <h2 className="mt-3 font-serif text-section text-charcoal text-balance">
              {data?.section.title ?? '…'}
            </h2>
          </div>

          <motion.div
            className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
            variants={staggerContainer(0.06)}
          >
            {(data?.categories ?? []).map((cat: CategoryContent, i: number) => {
              const isLarge = i === 0 || i === 2;
              return (
                <motion.div
                  key={cat.category}
                  variants={shouldReduce ? undefined : revealVariants}
                  className={`group relative block overflow-hidden rounded-2xl ${isLarge ? 'sm:col-span-2 lg:col-span-1' : ''}`}
                >
                  <Link to={`/shop/${cat.category}`} className="block">
                    <div className="aspect-[3/2] w-full overflow-hidden bg-blush md:aspect-[16/10] lg:aspect-[4/3]">
                      <img
                        src={cat.tile_image_url ?? FALLBACK_TILE[cat.category]}
                        alt={cat.display_name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-charcoal/5 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                      <h3 className="font-serif text-xl text-ivory md:text-2xl">{cat.display_name}</h3>
                      <p className="mt-1 text-sm text-ivory/80">{cat.description}</p>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-ivory/90 transition-[gap,color] duration-300 ease-out group-hover:gap-2.5">
                        {cat.link_text} <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
            {!data &&
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/3] w-full rounded-2xl bg-mist" />
                </div>
              ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
