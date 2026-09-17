import { NavLink, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import CollectionCard from '@/components/CollectionCard';
import SectionHeading from '@/components/SectionHeading';
import { CATEGORY_LABELS, useProducts, filterProducts, type ProductCategory } from '@/data/products';
import { staggerContainer } from '@/lib/animations';
import { useViewportAmount } from '@/hooks/useViewportAmount';

const validCategories: ProductCategory[] = ['pillows', 'bolsters', 'beds'];

export default function CollectionPage() {
  const viewportAmount = useViewportAmount();
  const { category } = useParams<{ category: ProductCategory }>();
  const isValidCategory = category && validCategories.includes(category);
  const selectedCategory = isValidCategory ? category : 'pillows';
  const { products, loading, error } = useProducts();
  const collection = filterProducts(products, { category: selectedCategory }).slice(0, 4);

  return (
    <>
      <section className="bg-blush/30 pb-12 pt-12 md:pt-16">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Koleksi Kumora"
            title={CATEGORY_LABELS[selectedCategory]}
            description="Pilih perlengkapan yang terasa tepat untuk cara Anda beristirahat."
          />
          <nav aria-label="Kategori produk" className="mt-8 flex flex-wrap gap-2">
            {validCategories.map((categoryOption) => (
              <NavLink
                key={categoryOption}
                to={`/shop/${categoryOption}`}
                className={({ isActive }) =>
                  `rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'border-plum bg-plum text-ivory'
                      : 'border-plum/20 text-plum hover:border-plum hover:bg-plum/5'
                  }`
                }
              >
                {CATEGORY_LABELS[categoryOption]}
              </NavLink>
            ))}
          </nav>
        </div>
      </section>

      <section className="bg-ivory pb-24 pb-nav-safe pt-12 md:pb-32 md:pt-16">
        <div className="container-wide">
          {error ? (
            <p className="text-sm text-charcoal-muted">Gagal memuat koleksi — coba muat ulang halaman.</p>
          ) : (
            <motion.div
              className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:gap-x-8"
              variants={staggerContainer(0.06)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: viewportAmount }}
            >
              {loading
                ? Array.from({ length: 4 }).map((_, i) => <CollectionCardSkeleton key={i} />)
                : collection.map((product) => <CollectionCard key={product.id} product={product} />)}
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}

function CollectionCardSkeleton() {
  return (
    <div className="animate-pulse" aria-hidden="true">
      <div className="aspect-[4/5] w-full rounded-3xl bg-mist" />
      <div className="mt-4 h-4 w-2/3 rounded bg-mist" />
      <div className="mt-2 h-3 w-1/2 rounded bg-mist" />
    </div>
  );
}
