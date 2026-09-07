import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Product } from '@/data/products';
import { formatIDR, generateWhatsAppMessage, generateWhatsAppURL } from '@/data/products';
import { revealVariants } from '@/lib/animations';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const reduce = useReducedMotion();
  const whatsappURL = generateWhatsAppURL(
    generateWhatsAppMessage({ name: product.name, price: product.price })
  );

  return (
    <motion.article
      className="group flex h-full flex-col"
      variants={reduce ? undefined : revealVariants}
      initial={reduce ? undefined : 'hidden'}
      whileInView={reduce ? undefined : 'show'}
      viewport={{ once: true, amount: 0.15 }}
    >
      <Link
        to={`/products/${product.slug}`}
        className="block overflow-hidden rounded-2xl bg-sand/40 transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          />
          {product.new && (
            <span className="absolute left-3 top-3 rounded-full bg-blush/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-plum backdrop-blur-sm">
              Baru
            </span>
          )}
        </div>
      </Link>
      <div className="mt-5 flex flex-1 flex-col">
        <span className="eyebrow text-[11px]">{product.category}</span>
        <h3 className="mt-2 font-serif text-xl leading-snug text-plum">
          <Link
            to={`/products/${product.slug}`}
            className="transition-colors duration-300 ease-out hover:text-mauve"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-charcoal-muted">
          {product.shortDescription}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-1">
          <span className="text-base font-medium text-plum">{formatIDR(product.price)}</span>
          <div className="flex items-center gap-3">
            <Link to={`/products/${product.slug}`} className="link-arrow text-xs">
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
