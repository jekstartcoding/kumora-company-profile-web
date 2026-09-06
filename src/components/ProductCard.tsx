import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Product } from '@/data/products';
import { formatIDR } from '@/data/products';
import { cardVariants, imageVariants } from '@/lib/animations';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      className="group flex flex-col"
      variants={reduce ? undefined : cardVariants}
      initial={reduce ? undefined : 'hidden'}
      whileInView={reduce ? undefined : 'show'}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.45 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{ transformOrigin: 'center' }}
    >
      <Link to={`/products/${product.slug}`} className="block overflow-hidden rounded-2xl bg-sand/40">
        <div className="relative aspect-[4/5] overflow-hidden">
          <motion.img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover"
            variants={reduce ? undefined : imageVariants}
            initial={reduce ? undefined : 'hidden'}
            animate={reduce ? undefined : 'show'}
            style={{ willChange: 'transform, opacity, filter' }}
            layoutId={`product-image-${product.id}`}
          />
          {product.new && (
            <span className="absolute left-3 top-3 rounded-full bg-ivory/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-maroon backdrop-blur-sm">
              Baru
            </span>
          )}
        </div>
      </Link>
      <div className="mt-5 flex flex-1 flex-col">
        <span className="eyebrow text-[11px]">{product.category}</span>
        <h3 className="mt-2 font-serif text-xl leading-snug text-clay">
          <Link
            to={`/products/${product.slug}`}
            className="transition-colors hover:text-terracotta"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-charcoal-muted">
          {product.shortDescription}
        </p>
        <div className="mt-4 flex items-center justify-between pt-1">
          <span className="text-base font-medium text-clay">{formatIDR(product.price)}</span>
          <Link
            to={`/products/${product.slug}`}
            className="link-arrow text-xs"
          >
            Lihat Produk
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
