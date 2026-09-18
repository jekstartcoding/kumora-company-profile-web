import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useMotionPreference';
import type { Product } from '@/data/types';
import { formatIDR, generateWhatsAppURL } from '@/data/content';
import { revealVariants } from '@/lib/animations';
import { computeDiscount } from '@/lib/productApi';
import DiscountPrice from '@/components/DiscountPrice';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const reduce = useReducedMotion();
  const whatsappURL = generateWhatsAppURL({
    type: 'standard',
    productName: product.name,
    variantLabel: product.variants[0]?.label ?? 'default variant',
  });

  return (
    <motion.article
      className="group flex h-full flex-col"
      variants={reduce ? undefined : revealVariants}
      initial={reduce ? undefined : 'hidden'}
      whileInView={reduce ? undefined : 'show'}
      viewport={{ once: true, amount: 0.15 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
    >
      <Link
        to={`/product/${product.slug}`}
        className="block overflow-hidden rounded-2xl bg-sand/40 transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
      >
        <div className="relative aspect-[3/2] overflow-hidden md:aspect-[4/5]">
          {!imgLoaded && (
            <div className="absolute inset-0 skeleton-shimmer rounded-2xl" />
          )}
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            className={`h-full w-full object-cover transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] ${
              imgLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
      </Link>
      <div className="mt-4 flex flex-1 flex-col md:mt-5">
        <span className="eyebrow text-[11px]">{product.category}</span>
        <h3 className="mt-2 font-serif text-xl leading-snug text-charcoal">
          <Link
            to={`/product/${product.slug}`}
            className="transition-colors duration-300 ease-out hover:text-plum"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-charcoal-muted line-clamp-2">
          {product.shortDescription}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-1">
          {(() => {
            const discount = computeDiscount(
              product.price,
              product.discountPercentage,
              product.discountAmount
            );
            return discount.active ? (
              <DiscountPrice discount={discount} size="sm" />
            ) : (
              <span className="text-base font-medium text-plum">{formatIDR(product.price)}</span>
            );
          })()}
          <div className="flex items-center gap-3">
            <Link to={`/product/${product.slug}`} className="link-arrow text-xs">
              Lihat Produk
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <a
              href={whatsappURL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-plum px-3 py-2 text-xs font-medium text-ivory transition-colors duration-300 ease-out hover:bg-plum-700"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Beli
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
