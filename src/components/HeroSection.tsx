// Fase 7.2 (plan CMS) — Hero membaca dari home_hero (Supabase). Loading: skeleton
// minimal; fallback data null → section tetap render tanpa teks.
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import BrandMark from '@/components/BrandMark';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useMotionPreference';
import { staggerContainer } from '@/lib/animations';
import { useCmsData, getHomeHero, type HomeHero } from '@/lib/cms';

// CTA plan 7.2: path relatif → React Router Link; URL lengkap → <a target=_blank>.
export function CtaLink({
  url,
  className,
  children,
}: {
  url: string;
  className: string;
  children: React.ReactNode;
}) {
  const isExternal = /^https?:\/\//i.test(url);
  if (isExternal) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link to={url} className={className}>
      {children}
    </Link>
  );
}

export default function HeroSection() {
  const shouldReduce = useReducedMotion();
  const { data } = useCmsData<HomeHero>(getHomeHero);

  const heroImg =
    data?.background_image_url ??
    'https://images.pexels.com/photos/7534543/pexels-photo-7534543.jpeg?auto=compress&cs=tinysrgb&w=1600';

  return (
    <section className="relative overflow-hidden bg-ivory md:min-h-[100svh]">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Kamar tidur elegan dengan tempat tidur nyaman dan pencahayaan alami yang hangat"
          className="h-full w-full object-cover"
          {...{ fetchpriority: 'high' }}
        />
        {/* Soft plum overlay preserves image detail while improving text visibility. */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/65 to-charcoal/20" />
      </div>

      <motion.div
        className="container-wide relative flex flex-col justify-start pb-24 pt-6 sm:pt-8 md:min-h-[100svh] md:pb-28"
        initial="hidden"
        animate="show"
        variants={staggerContainer(0.07)}
      >
        <div className="flex justify-center">
          <BrandMark />
        </div>
        <div className="max-w-2xl mt-10">
          <motion.p
            className="eyebrow text-ivory/80"
            variants={shouldReduce ? undefined : { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}
          >
            {data?.hook ?? '…'}
          </motion.p>
          <motion.h1
            className="mt-5 font-serif text-hero text-ivory"
            variants={shouldReduce ? undefined : { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 } } }}
          >
            {data?.title ?? '…'}
          </motion.h1>
          <motion.p
            className="mt-6 max-w-lg text-base leading-relaxed text-ivory/85 md:text-lg"
            variants={shouldReduce ? undefined : { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 } } }}
          >
            {data?.subtitle ?? '…'}
          </motion.p>
          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            variants={shouldReduce ? undefined : { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.16 } } }}
          >
            {data && (
              <>
                <CtaLink url={data.cta_1_url} className="btn-primary">
                  {data.cta_1_text}
                  <ArrowRight className="h-4 w-4" />
                </CtaLink>
                <CtaLink
                  url={data.cta_2_url}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-ivory/40 bg-ivory/10 px-7 py-3.5 text-sm font-medium text-ivory backdrop-blur-sm transition-colors duration-300 ease-out hover:bg-ivory/20"
                >
                  <MessageCircle className="h-4 w-4" />
                  {data.cta_2_text}
                </CtaLink>
              </>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
