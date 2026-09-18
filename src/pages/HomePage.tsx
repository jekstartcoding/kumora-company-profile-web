// Fase 7.2 (plan CMS) — seluruh section Homepage membaca dari Supabase (lib/cms).
// Tidak ada lagi string konten hardcoded — sumber: tabel CMS yang diedit lewat
// admin panel. Gambar lama (Pexels) hanya fallback visual ketika field gambar
// kosong/null di database.
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Layers, Heart, Sparkles, Headphones, HelpCircle } from 'lucide-react';
import HeroSection, { CtaLink } from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/SectionHeading';
import CategorySection from '@/components/CategorySection';
import TestimonialSection from '@/components/TestimonialSection';
import { revealVariants, staggerContainer } from '@/lib/animations';
import { useViewportAmount } from '@/hooks/useViewportAmount';
import {
  useCmsData,
  getHomeShowcase,
  getHomePhilosophyTeaser,
  getHomeTrust,
  getHomeBanner,
  getHomeFinalCta,
  type HomeShowcaseSection,
  type HomePhilosophyTeaser,
  type HomeTrustSection,
  type TrustItem,
  type HomeBanner,
  type HomeFinalCta,
} from '@/lib/cms';

const FALLBACK_ABOUT_IMG =
  'https://images.pexels.com/photos/27164976/pexels-photo-27164976.jpeg?auto=compress&cs=tinysrgb&w=1200';
const FALLBACK_STATEMENT_IMG =
  'https://images.pexels.com/photos/13009040/pexels-photo-13009040.jpeg?auto=compress&cs=tinysrgb&w=1600';

// Ikon trust items dipetakan dari icon_name (seed: layers/heart/sparkles/headphones).
const TRUST_ICONS: Record<string, typeof Layers> = {
  layers: Layers,
  heart: Heart,
  sparkles: Sparkles,
  headphones: Headphones,
};

function FeaturedSection() {
  const { data } = useCmsData<{ section: HomeShowcaseSection; products: import('@/data/types').Product[] }>(getHomeShowcase);
  const viewportAmount = useViewportAmount();

  const products = (data?.products ?? []) as unknown as import('@/data/types').Product[];

  return (
    <section className="bg-ivory py-20 md:py-28">
      <div className="container-wide">
        <SectionHeading
          eyebrow={data?.section.eyebrow ?? '…'}
          title={data?.section.title ?? '…'}
          description={data?.section.subtitle ?? '…'}
        />

        <motion.div
          className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8"
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: viewportAmount }}
        >
          {!data
            ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : products.map((product, i) => <ProductCard key={product.id} product={product} index={i} />)}
        </motion.div>

        <div className="mt-12 flex justify-center">
          <Link to="/shop/pillows" className="btn-secondary">
            Lihat Semua Produk
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="animate-pulse" aria-hidden="true">
      <div className="aspect-square w-full rounded-2xl bg-mist" />
      <div className="mt-4 h-4 w-3/4 rounded bg-mist" />
      <div className="mt-2 h-3 w-1/2 rounded bg-mist" />
    </div>
  );
}

function AboutSection() {
  const { data } = useCmsData<HomePhilosophyTeaser>(getHomePhilosophyTeaser);
  const viewportAmount = useViewportAmount();

  return (
    <section className="bg-mist/50 py-20 md:py-28">
      <div className="container-wide">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <p className="eyebrow">{data?.eyebrow ?? '…'}</p>
            <h2 className="mt-3 font-serif text-display text-charcoal text-balance">
              {data?.title ?? '…'}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-charcoal-muted">{data?.paragraph_1 ?? '…'}</p>
            <p className="mt-4 text-base leading-relaxed text-charcoal-muted">{data?.paragraph_2 ?? '…'}</p>
            {data && (
              <Link to={data.link_url} className="link-arrow mt-8">
                {data.link_text}
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
          <motion.div
            className="order-1 overflow-hidden rounded-3xl lg:order-2"
            variants={revealVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: viewportAmount }}
          >
            <img
              src={data?.image_url ?? FALLBACK_ABOUT_IMG}
              alt="Kamar tidur minimalis dengan pencahayaan alami yang hangat"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover lg:aspect-[5/4]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  const { data } = useCmsData<{ section: HomeTrustSection; items: TrustItem[] }>(getHomeTrust);

  return (
    <section className="bg-ivory py-20 md:py-28">
      <div className="container-wide">
        <SectionHeading
          eyebrow={data?.section.eyebrow ?? '…'}
          title={data?.section.title ?? '…'}
          align="center"
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-rose/40 bg-rose/40 sm:grid-cols-2 lg:grid-cols-4">
          {(data?.items ?? []).map((item) => {
            const Icon = TRUST_ICONS[item.icon_name] ?? HelpCircle;
            return (
              <div key={item.id} className="bg-ivory p-7 md:p-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-mauve/15 text-charcoal">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h3 className="mt-5 font-serif text-lg text-charcoal">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-muted">{item.description}</p>
              </div>
            );
          })}
          {!data && Array.from({ length: 4 }).map((_, i) => <div key={i} className="animate-pulse bg-ivory p-7 md:p-8"><div className="h-11 w-11 rounded-full bg-mist" /><div className="mt-5 h-4 w-2/3 rounded bg-mist" /><div className="mt-2 h-3 w-full rounded bg-mist" /></div>)}
        </div>
      </div>
    </section>
  );
}

function StatementSection() {
  const { data } = useCmsData<HomeBanner>(getHomeBanner);
  const viewportAmount = useViewportAmount();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={data?.background_image_url ?? FALLBACK_STATEMENT_IMG}
          alt="Kamar tidur diterangi sinar matahari pagi yang hangat"
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/55 via-charcoal/25 to-transparent" />
      </div>
      <div className="container-wide relative py-24 md:py-36">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={revealVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: viewportAmount }}
        >
          <h2 className="font-serif text-display text-ivory text-balance md:text-[3.5rem]">
            {data?.title ?? '…'}
          </h2>
          <p className="mt-5 text-lg text-ivory/80">{data?.subtitle ?? '…'}</p>
        </motion.div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const { data } = useCmsData<HomeFinalCta>(getHomeFinalCta);

  return (
    <section className="bg-mist py-20 md:py-28">
      <div className="container-wide">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-display text-charcoal text-balance">
            {data?.title ?? '…'}
          </h2>
          <p className="mt-5 text-base text-charcoal-muted">{data?.subtitle ?? '…'}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {data && (
              <>
                <CtaLink
                  url={data.cta_1_url}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-plum px-7 py-3.5 text-center text-sm font-medium text-ivory transition-colors duration-300 ease-out hover:bg-plum-700 sm:w-auto"
                >
                  {data.cta_1_text}
                  <ArrowRight className="h-4 w-4" />
                </CtaLink>
                <CtaLink
                  url={data.cta_2_url}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-plum/30 px-7 py-3.5 text-center text-sm font-medium text-plum transition-colors duration-300 ease-out hover:bg-plum/10 sm:w-auto"
                >
                  {data.cta_2_text}
                </CtaLink>
                <CtaLink
                  url={data.cta_3_url}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-plum/30 px-7 py-3.5 text-center text-sm font-medium text-plum transition-colors duration-300 ease-out hover:bg-plum/10 sm:w-auto"
                >
                  <MessageCircle className="h-4 w-4" />
                  {data.cta_3_text}
                </CtaLink>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedSection />
      <AboutSection />
      <WhySection />
      <CategorySection />
      <StatementSection />
      <TestimonialSection />
      <FinalCTA />
    </>
  );
}
