import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, MessageCircle, Check } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import Rating from '@/components/Rating';
import ProductCard from '@/components/ProductCard';
import { getProductBySlug, getRelatedProducts, formatIDR, generateWhatsAppMessage, generateWhatsAppURL } from '@/data/products';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setActiveImage(0);
  }, [slug]);

  if (!product) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-ivory pt-20">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-plum">Produk tidak ditemukan</h1>
          <p className="mt-3 text-charcoal-muted">Produk yang Anda cari tidak tersedia.</p>
          <Link to="/products" className="btn-primary mt-6">
            Kembali ke Produk
          </Link>
        </div>
      </section>
    );
  }

  const related = getRelatedProducts(product);
  const whatsappURL = generateWhatsAppURL(
    generateWhatsAppMessage({ name: product.name, price: product.price })
  );

  return (
    <>
      <section className="bg-ivory pt-24 md:pt-28">
        <div className="container-wide">
          <Breadcrumb
            items={[
              { label: 'Beranda', to: '/' },
              { label: 'Produk', to: '/products' },
              { label: product.category, to: `/products?category=${encodeURIComponent(product.category)}` },
              { label: product.name },
            ]}
          />
        </div>
      </section>

      <section className="bg-ivory pb-20 pt-8 md:pb-28">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Gallery */}
            <div>
              <div className="overflow-hidden rounded-3xl bg-sand/40">
                <motion.img
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="aspect-square w-full object-cover"
                  layoutId={`product-image-${product.id}`}
                />
              </div>
              {product.images.length > 1 && (
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`overflow-hidden rounded-xl transition-opacity duration-300 ease-out ${
                        activeImage === i
                          ? 'ring-2 ring-plum ring-offset-2 ring-offset-ivory'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                      aria-label={`Lihat gambar ${i + 1}`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} thumbnail ${i + 1}`}
                        className="aspect-square w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="lg:pt-4">
              <span className="eyebrow">{product.category}</span>
              <h1 className="mt-3 font-serif text-display text-plum text-balance">
                {product.name}
              </h1>
              <div className="mt-4">
                <Rating rating={product.rating} reviewCount={product.reviewCount} size="md" />
              </div>
                <p className="mt-6 text-2xl font-medium text-plum md:text-3xl">
                {formatIDR(product.price)}
              </p>
              <p className="mt-5 text-base leading-relaxed text-charcoal-muted">
                {product.description}
              </p>

              {/* Specifications */}
              <div className="mt-8">
                <h2 className="eyebrow">Spesifikasi</h2>
                <dl className="mt-4 divide-y divide-rose/30 border-y border-rose/30">
                  {product.specifications.map((spec, i) => (
                    <div key={i} className="flex justify-between py-3">
                      <dt className="text-sm text-charcoal-muted">{spec.label}</dt>
                      <dd className="text-sm font-medium text-charcoal">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Product purchase CTA */}
              <div className="mt-8 rounded-2xl border border-rose/40 bg-blush/30 p-6 md:p-7">
                <p className="font-serif text-lg text-plum">Tertarik dengan produk ini?</p>
                <p className="mt-1.5 text-sm text-charcoal-muted">
                  Chat dengan kami melalui WhatsApp untuk informasi lebih lanjut.
                </p>
                <a
                  href={whatsappURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-5 w-full sm:w-auto"
                >
                  <MessageCircle className="h-4 w-4" />
                  Beli
                </a>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-charcoal-muted">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-mauve" /> Tanpa pembayaran online
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-mauve" /> Bantuan personal
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="bg-mist/50 py-20 md:py-28">
          <div className="container-wide">
            <div className="flex items-end justify-between">
              <h2 className="font-serif text-section text-plum">Anda Mungkin Juga Suka</h2>
              <Link to="/products" className="link-arrow hidden sm:inline-flex">
                Lihat Semua <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
