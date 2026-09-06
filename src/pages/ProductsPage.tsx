import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer } from '@/lib/animations';
import ProductCard from '@/components/ProductCard';
import SectionHeading from '@/components/SectionHeading';
import {
  products,
  filterProducts,
  sortProducts,
  type ProductCategory,
  type SortOption,
} from '@/data/products';

const categoryOptions: (ProductCategory | 'Semua')[] = [
  'Semua',
  'Bantal',
  'Kasur',
  'Seprai Penutup',
  'Seprai',
  'Guling',
  'Aksesori',
];

const categoryUrlMap: Record<string, ProductCategory | 'Semua'> = {
  'Bantal': 'Bantal',
  'Kasur': 'Kasur',
  'Seprai Penutup': 'Seprai Penutup',
  'Seprai': 'Seprai',
  'Guling': 'Guling',
  'Aksesori': 'Aksesori',
  'Pillows': 'Bantal',
  'Mattresses': 'Kasur',
  'Bed Covers': 'Seprai Penutup',
  'Bedsheets': 'Seprai',
  'Bolsters': 'Guling',
  'Accessories': 'Aksesori',
};

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Unggulan' },
  { value: 'newest', label: 'Terbaru' },
  { value: 'price-asc', label: 'Harga: Rendah ke Tinggi' },
  { value: 'price-desc', label: 'Harga: Tinggi ke Rendah' },
];

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<ProductCategory | 'Semua'>(
    categoryParam && categoryParam in categoryUrlMap ? categoryUrlMap[categoryParam] : 'Semua'
  );
  const [sort, setSort] = useState<SortOption>('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    if (categoryParam && categoryParam in categoryUrlMap) {
      setCategory(categoryUrlMap[categoryParam]);
    } else {
      setCategory('Semua');
    }
  }, [categoryParam]);

  const handleCategoryChange = (cat: ProductCategory | 'Semua') => {
    setCategory(cat);
    if (cat === 'Semua') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      searchParams.set('category', cat);
      setSearchParams(searchParams);
    }
    setFiltersOpen(false);
  };

  const handleReset = () => {
    setSearch('');
    setCategory('Semua');
    setSort('featured');
    setSearchParams({});
  };

  const filtered = useMemo(() => {
    const result = filterProducts(products, { search, category });
    return sortProducts(result, sort);
  }, [search, category, sort]);

  const hasActiveFilters = search !== '' || category !== 'Semua' || sort !== 'featured';

  return (
    <>
      <section className="bg-sand/40 pb-12 pt-28 md:pt-36">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Koleksi Kumora"
            title="Temukan Kenyamanan Anda"
            description="Jelajahi bantal, kasur, perlengkapan tidur, dan aksesori kamar yang dirancang untuk kenyamanan sehari-hari."
          />
        </div>
      </section>

      <section className="bg-ivory pb-20 pt-8 md:pb-28">
        <div className="container-wide">
          {/* Controls */}
          <div className="flex flex-col gap-4 border-b border-sand-dark/40 pb-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-muted" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari produk..."
                  className="w-full rounded-full border border-sand-dark/50 bg-ivory py-3 pl-11 pr-4 text-sm text-charcoal placeholder:text-charcoal-muted/60 focus:border-maroon focus:outline-none focus:ring-1 focus:ring-maroon"
                />
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setFiltersOpen((v) => !v)}
                  className="inline-flex items-center gap-2 rounded-full border border-sand-dark/50 px-5 py-3 text-sm font-medium text-charcoal transition-colors hover:border-clay hover:text-clay lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filter
                </button>
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortOption)}
                    className="appearance-none rounded-full border border-sand-dark/50 bg-ivory py-3 pl-5 pr-10 text-sm font-medium text-charcoal focus:border-maroon focus:outline-none focus:ring-1 focus:ring-maroon"
                  >
                    {sortOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-charcoal-muted">
                    ▾
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop category bar */}
            <div className="hidden flex-wrap items-center gap-2 lg:flex">
              {categoryOptions.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    category === cat
                      ? 'bg-clay text-ivory'
                      : 'border border-sand-dark/40 text-charcoal-light hover:border-clay hover:text-clay'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Mobile category drawer */}
            {filtersOpen && (
              <div className="flex flex-wrap items-center gap-2 lg:hidden">
                {categoryOptions.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      category === cat
                        ? 'bg-clay text-ivory'
                        : 'border border-sand-dark/40 text-charcoal-light hover:border-clay hover:text-clay'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Results count */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-charcoal-muted">
              {filtered.length} {filtered.length === 1 ? 'produk' : 'produk'}
            </p>
            {hasActiveFilters && (
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-clay transition-colors hover:text-terracotta"
              >
                <X className="h-3.5 w-3.5" />
                Reset Filter
              </button>
            )}
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <motion.div
              className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4"
              variants={staggerContainer(0.06)}
              initial="hidden"
              animate="show"
            >
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </motion.div>
          ) : (
            <div className="mt-16 flex flex-col items-center justify-center rounded-2xl border border-sand-dark/40 bg-sand/30 px-6 py-16 text-center">
              <h3 className="font-serif text-2xl text-clay">Produk tidak ditemukan</h3>
              <p className="mt-3 max-w-sm text-sm text-charcoal-muted">
                Coba cari produk lain atau reset filter.
              </p>
              <button onClick={handleReset} className="btn-secondary mt-6">
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
