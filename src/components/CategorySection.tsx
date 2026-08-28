import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES, type ProductCategory } from '@/data/products';
import { motion, useReducedMotion } from 'framer-motion';
import { staggerContainer, cardVariants } from '@/lib/animations';

export default function CategorySection() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="bg-ivory py-20 md:py-28">
      <div className="container-wide">
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          <div className="max-w-2xl">
            <p className="eyebrow">Pilih Berdasarkan Kategori</p>
            <h2 className="mt-3 font-serif text-section text-forest text-balance">
              Temukan Kenyamanan Anda
            </h2>
          </div>

          <motion.div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5" variants={staggerContainer(0.06)}>
            {CATEGORIES.map((cat, i) => {
              const isLarge = i === 0 || i === 5;
              return (
                <motion.div
                  key={cat.name}
                  variants={shouldReduce ? undefined : cardVariants}
                  className={`group relative block overflow-hidden rounded-2xl ${isLarge ? 'sm:col-span-2 lg:col-span-1' : ''}`}
                >
                  <Link
                    to={`/products?category=${encodeURIComponent(cat.name)}`}
                    className="block"
                  >
                    <div className="aspect-[16/10] w-full overflow-hidden bg-sand lg:aspect-[4/3]">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-forest/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                      <h3 className="font-serif text-xl text-ivory md:text-2xl">{cat.name}</h3>
                      <p className="mt-1 text-sm text-ivory/80">{cat.description}</p>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-gold-light transition-all duration-300 group-hover:gap-2.5">
                        Lihat <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
