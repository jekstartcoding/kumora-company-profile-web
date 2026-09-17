import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useMotionPreference';
import type { Product } from '@/data/types';
import { revealVariants } from '@/lib/animations';

interface CollectionCardProps {
  product: Pick<Product, 'slug' | 'name' | 'lifestyleImages' | 'sensoryDescriptor'>;
}

export default function CollectionCard({ product }: CollectionCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const reduce = useReducedMotion();
  const image = product.lifestyleImages[0];

  return (
    <motion.article
      variants={reduce ? undefined : revealVariants}
      initial={reduce ? undefined : 'hidden'}
      whileInView={reduce ? undefined : 'show'}
      viewport={{ once: true, amount: 0.15 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      className="group"
    >
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[3/2] overflow-hidden rounded-3xl bg-sand/40 md:aspect-[4/5]">
          {!imgLoaded && (
            <div className="absolute inset-0 skeleton-shimmer rounded-3xl" />
          )}
          <img
            src={image}
            alt={product.name}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            className={`h-full w-full object-cover transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] ${
              imgLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
        <div className="mt-5 flex items-start justify-between gap-5">
          <div>
            <h2 className="font-serif text-xl leading-tight text-charcoal text-balance sm:text-2xl">{product.name}</h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-charcoal-muted">
              {product.sensoryDescriptor}
            </p>
          </div>
          <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-charcoal transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </Link>
    </motion.article>
  );
}
