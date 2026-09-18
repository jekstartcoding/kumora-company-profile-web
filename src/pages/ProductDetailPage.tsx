import { useEffect, useState } from 'react';
import { ArrowRight, Check, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useMotionPreference';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import Breadcrumb from '@/components/Breadcrumb';
import GiftToggle, { type PurchaseContext } from '@/components/GiftToggle';
import ProductCard from '@/components/ProductCard';
import Rating from '@/components/Rating';
import { formatIDR, generateWhatsAppURL } from '@/data/content';
import {
  getProductBySlug,
  getRelatedProducts,
  type Product,
} from '@/data/products';
import { computeDiscount } from '@/lib/productApi';
import DiscountPrice from '@/components/DiscountPrice';
import type { ProductVariant } from '@/data/types';
import { entryDecelerateVariants } from '@/lib/animations';

function ProductTextureGallery({ product }: { product: Product }) {
  return (
    <section className="mt-14 border-t border-rose/30 pt-12" aria-labelledby="texture-heading">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Closer look</p>
          <h2 id="texture-heading" className="mt-2 font-serif text-section text-charcoal">
            Rasakan dari dekat
          </h2>
        </div>
        <span className="text-xs text-charcoal-muted">Tekstur dan detail bahan</span>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
        {product.textureImages.map((image, index) => (
          <img
            key={`${image}-${index}`}
            src={image}
            alt={`${product.name} detail tekstur ${index + 1}`}
            loading="lazy"
            className="aspect-square w-full rounded-2xl object-cover"
          />
        ))}
      </div>
    </section>
  );
}

function SensorySpecBlock({ product }: { product: Product }) {
  const firmness = Math.min(5, Math.max(1, product.sensorySpec.firmnessRating));

  return (
    <section className="mt-8 rounded-2xl bg-mist/60 p-5 md:p-6" aria-labelledby="sensory-heading">
      <p className="eyebrow">How it feels</p>
      <h2 id="sensory-heading" className="mt-2 font-serif text-2xl text-charcoal">
        Karakter kenyamanan
      </h2>
      <div className="mt-5">
        <div className="flex items-center justify-between text-xs text-charcoal-muted">
          <span>Lembut</span>
          <span>Firmness {firmness}/5</span>
          <span>Tegas</span>
        </div>
        <div className="mt-2 grid grid-cols-5 gap-1.5" aria-label={`Firmness ${firmness} dari 5`}>
          {[1, 2, 3, 4, 5].map((level) => (
            <span
              key={level}
              className={`h-2 rounded-full ${level <= firmness ? 'bg-mauve' : 'bg-rose/50'}`}
            />
          ))}
        </div>
      </div>
      <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-charcoal-muted">Material isian</dt>
          <dd className="mt-1 font-medium text-charcoal">{product.sensorySpec.fillMaterial}</dd>
        </div>
        <div>
          <dt className="text-charcoal-muted">Bobot rasa</dt>
          <dd className="mt-1 font-medium text-charcoal">
            {product.sensorySpec.fillWeightEquivalent}
          </dd>
        </div>
      </dl>
    </section>
  );
}

function DeliveryEstimateBadge({ estimate }: { estimate: string }) {
  return (
    <div className="mt-6 rounded-xl border border-rose/40 bg-blush/35 px-4 py-3 text-sm text-charcoal">
      <span className="font-medium text-charcoal">Perkiraan pengiriman</span>
      <span className="mx-2 text-charcoal/60">|</span>
      {estimate}
    </div>
  );
}

function ReturnPolicyBlock({ policy }: { policy: string }) {
  return (
    <div className="mt-3 rounded-xl border border-rose/30 px-4 py-3 text-sm leading-relaxed text-charcoal-muted">
      <span className="font-medium text-charcoal">Kebijakan retur: </span>
      {policy}
    </div>
  );
}

function BrandStoryLine({ text }: { text: string }) {
  return (
    <p className="mt-8 border-l-2 border-mauve pl-4 text-sm italic leading-relaxed text-charcoal-muted">
      {text}
    </p>
  );
}

function ReviewsSection({ product }: { product: Product }) {
  return (
    <section className="bg-ivory py-20 md:py-28" aria-labelledby="reviews-heading">
      <div className="container-wide">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Pengalaman pelanggan</p>
            <h2 id="reviews-heading" className="mt-2 font-serif text-section text-charcoal">
              Ulasan tentang {product.name}
            </h2>
          </div>
          <Rating rating={product.rating} reviewCount={product.reviewCount} size="sm" />
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {product.reviews.map((review) => (
            <article key={review.id} className="rounded-2xl border border-rose/35 bg-mist/35 p-6">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium text-charcoal">{review.author}</p>
                <Rating rating={review.rating} size="sm" />
                {review.sleepPosition && (
                  <span className="rounded-full bg-sand px-2.5 py-1 text-[11px] text-charcoal-muted">
                    {review.sleepPosition}
                  </span>
                )}
                {review.bodyType && (
                  <span className="rounded-full bg-sand px-2.5 py-1 text-[11px] text-charcoal-muted">
                    {review.bodyType}
                  </span>
                )}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-charcoal-muted">{review.comment}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StickyWhatsAppCTA({
  product,
  variant,
  purchaseContext,
  fromQuiz,
}: {
  product: Product;
  variant: ProductVariant;
  purchaseContext: PurchaseContext;
  fromQuiz: boolean;
}) {
  const whatsappURL = generateWhatsAppURL({
    type: purchaseContext === 'gift' ? 'gift' : fromQuiz ? 'quiz' : 'standard',
    productName: product.name,
    variantLabel: variant.label,
    quizResultLabel: product.name,
  });

  return (
    <div className="fixed inset-x-0 bottom-nav-cta-safe z-40 border-t border-rose/40 bg-ivory/95 px-5 py-3 shadow-[0_-8px_24px_rgba(73,47,70,0.08)] backdrop-blur-md md:sticky md:bottom-4 md:mx-auto md:mt-10 md:max-w-md md:rounded-full md:border md:shadow-lg">
      <a
        href={whatsappURL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary w-full"
      >
        <MessageCircle className="h-4 w-4" />
        Chat to Order
      </a>
    </div>
  );
}

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const shouldReduceMotion = useReducedMotion();
  const fromQuiz = searchParams.get('from') === 'quiz';
  const [activeImage, setActiveImage] = useState(0);
  const [purchaseContext, setPurchaseContext] = useState<PurchaseContext>('self');
  const [selectedVariantId, setSelectedVariantId] = useState('');
  // Fase 9 — produk kini async dari Supabase (bukan lagi lookup array statis).
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setActiveImage(0);
    setPurchaseContext('self');
    setSelectedVariantId('');
  }, [slug]);

  // Fase 9.3 — fetch produk + related dengan loading & error state.
  useEffect(() => {
    let alive = true;
    if (!slug) {
      setProduct(undefined);
      setRelated([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    getProductBySlug(slug)
      .then((p) => {
        if (!alive) return;
        setProduct(p);
        setLoading(false);
        if (p) {
          getRelatedProducts(p)
            .then((r) => {
              if (alive) setRelated(r);
            })
            .catch(() => {
              if (alive) setRelated([]);
            });
        } else {
          setRelated([]);
        }
      })
      .catch((e: unknown) => {
        if (!alive) return;
        setError(e instanceof Error ? e.message : 'Gagal memuat produk');
        setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [slug]);

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (error) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-ivory pt-20">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-charcoal">Gagal memuat produk</h1>
          <p className="mt-3 text-charcoal-muted">Terjadi kendala saat mengambil data. Coba muat ulang halaman.</p>
          <Link to="/shop/pillows" className="btn-primary mt-6">
            Kembali ke Produk
          </Link>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-ivory pt-20">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-charcoal">Produk tidak ditemukan</h1>
          <p className="mt-3 text-charcoal-muted">Produk yang Anda cari tidak tersedia.</p>
          <Link to="/shop/pillows" className="btn-primary mt-6">
            Kembali ke Produk
          </Link>
        </div>
      </section>
    );
  }

  const defaultVariant =
    product.variants.find((variant) => variant.isDefault) ?? product.variants[0];
  if (!defaultVariant) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-ivory px-6 pt-16 text-center">
        <div>
          <h1 className="font-serif text-3xl text-charcoal">Varian produk belum tersedia</h1>
          <p className="mt-3 text-charcoal-muted">Silakan kembali ke koleksi untuk memilih produk lain.</p>
          <Link to={`/shop/${product.category}`} className="btn-primary mt-6">
            Kembali ke Koleksi
          </Link>
        </div>
      </section>
    );
  }
  const selectedVariant =
    product.variants.find((variant) => variant.id === selectedVariantId) ?? defaultVariant;

  return (
    <>
      <section className="bg-ivory pt-8 md:pt-12">
        <div className="container-wide">
          <Breadcrumb
            items={[
              { label: 'Beranda', to: '/' },
              { label: 'Shop', to: `/shop/${product.category}` },
              { label: product.category },
              { label: product.name },
            ]}
          />
        </div>
      </section>

      <section className="bg-ivory pb-40 pb-nav-cta-safe pt-8 md:pb-36">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <motion.div
              variants={shouldReduceMotion ? undefined : entryDecelerateVariants}
              initial={shouldReduceMotion ? undefined : 'hidden'}
              animate={shouldReduceMotion ? undefined : 'show'}
            >
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
                  {product.images.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      className={`overflow-hidden rounded-xl transition-opacity duration-300 ${
                        activeImage === index
                          ? 'ring-2 ring-plum ring-offset-2 ring-offset-ivory'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                      aria-label={`Lihat gambar ${index + 1}`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        className="aspect-square w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
              <ProductTextureGallery product={product} />
            </motion.div>

            <motion.div
              variants={shouldReduceMotion ? undefined : entryDecelerateVariants}
              initial={shouldReduceMotion ? undefined : 'hidden'}
              animate={shouldReduceMotion ? undefined : 'show'}
              transition={shouldReduceMotion ? undefined : { delay: 0.12 }}
              className="lg:pt-4"
            >
              <span className="eyebrow">{product.category}</span>
              <h1 className="mt-3 font-serif text-display text-charcoal text-balance">{product.name}</h1>
              <div className="mt-4">
                <Rating rating={product.rating} reviewCount={product.reviewCount} size="md" />
              </div>
              {(() => {
                const discount = computeDiscount(
                  selectedVariant.price,
                  product.discountPercentage,
                  product.discountAmount
                );
                return discount.active ? (
                  <div className="mt-6">
                    <DiscountPrice discount={discount} size="lg" />
                  </div>
                ) : (
                  <p className="mt-6 text-2xl font-medium text-plum md:text-3xl">
                    {formatIDR(selectedVariant.price)}
                  </p>
                );
              })()}
              <p className="mt-5 text-base leading-relaxed text-charcoal-muted">{product.description}</p>

              <DeliveryEstimateBadge estimate={product.deliveryEstimate} />
              <ReturnPolicyBlock policy={product.returnPolicyText} />

              <div className="mt-8">
                <p className="eyebrow">Pilih varian</p>
                <div className="mt-3 grid gap-2">
                  {product.variants.map((variant) => (
                    <label
                      key={variant.id}
                      className={`flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 text-sm transition-colors ${
                        selectedVariant.id === variant.id
                          ? 'border-plum bg-plum/5 text-plum'
                          : 'border-rose/40 text-charcoal-muted hover:border-plum/50'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="product-variant"
                          value={variant.id}
                          checked={selectedVariant.id === variant.id}
                          onChange={() => setSelectedVariantId(variant.id)}
                          className="h-4 w-4 accent-plum"
                        />
                        {variant.label}
                      </span>
                      <span className="flex items-center gap-2">
                        {(() => {
                          const d = computeDiscount(
                            variant.price,
                            product.discountPercentage,
                            product.discountAmount
                          );
                          return d.active ? (
                            <>
                              <span className="text-xs text-charcoal-muted line-through">
                                {formatIDR(d.originalPrice)}
                              </span>
                              <span className="font-medium text-plum">{formatIDR(d.finalPrice)}</span>
                            </>
                          ) : (
                            <span className="font-medium">{formatIDR(variant.price)}</span>
                          );
                        })()}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <SensorySpecBlock product={product} />
              <GiftToggle
                value={purchaseContext}
                onChange={setPurchaseContext}
                giftSafe={product.giftSafe}
              />
              <BrandStoryLine text={product.brandStoryLine} />

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-charcoal-muted">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-charcoal" /> Tanpa pembayaran online
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-charcoal" /> Bantuan personal
                </span>
              </div>
              <StickyWhatsAppCTA
                product={product}
                variant={selectedVariant}
                purchaseContext={purchaseContext}
                fromQuiz={fromQuiz}
              />
            </motion.div>
          </div>
        </div>
      </section>

      <ReviewsSection product={product} />

      {related.length > 0 && (
        <section className="bg-mist/50 py-20 md:py-28">
          <div className="container-wide">
            <div className="flex items-end justify-between">
              <h2 className="font-serif text-section text-charcoal">Anda Mungkin Juga Suka</h2>
              <Link to={`/shop/${product.category}`} className="link-arrow hidden sm:inline-flex">
                Lihat Semua <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
              {related.map((relatedProduct, index) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function ProductDetailSkeleton() {
  return (
    <section className="bg-ivory pb-40 pb-nav-cta-safe pt-8 md:pb-36" aria-hidden="true">
      <div className="container-wide">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="animate-pulse">
            <div className="aspect-square w-full rounded-3xl bg-sand/60" />
            <div className="mt-4 grid grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-xl bg-mist" />
              ))}
            </div>
          </div>
          <div className="animate-pulse lg:pt-4">
            <div className="h-3 w-24 rounded bg-mist" />
            <div className="mt-4 h-9 w-3/4 rounded bg-mist" />
            <div className="mt-4 h-4 w-1/2 rounded bg-mist" />
            <div className="mt-6 h-7 w-32 rounded bg-mist" />
            <div className="mt-5 space-y-2">
              <div className="h-3 w-full rounded bg-mist" />
              <div className="h-3 w-5/6 rounded bg-mist" />
            </div>
            <div className="mt-8 space-y-2">
              <div className="h-12 w-full rounded-xl bg-mist" />
              <div className="h-12 w-full rounded-xl bg-mist" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
