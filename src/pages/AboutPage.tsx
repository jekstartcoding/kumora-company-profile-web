// Fase 7.2 (plan CMS) — seluruh section About membaca dari Supabase (lib/cms).
// Tidak ada lagi string konten hardcoded — sumber: tabel CMS.
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import BrandMark from '@/components/BrandMark';
import SectionHeading from '@/components/SectionHeading';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useMotionPreference';
import { revealVariants, staggerContainer } from '@/lib/animations';
import { useViewportAmount } from '@/hooks/useViewportAmount';
import {
  useCmsData,
  getAboutHero,
  getAboutStory,
  getAboutMilestones,
  getAboutVisionMission,
  getAboutValues,
  getAboutFinalCta,
} from '@/lib/cms';

const FALLBACK_HERO_IMG =
  'https://images.pexels.com/photos/37436121/pexels-photo-37436121.jpeg?auto=compress&cs=tinysrgb&w=1600';
const FALLBACK_STORY_IMG =
  'https://images.pexels.com/photos/8135502/pexels-photo-8135502.jpeg?auto=compress&cs=tinysrgb&w=1200';

function PageHero() {
  const { data } = useCmsData(getAboutHero);

  return (
    <section className="relative min-h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={data?.background_image_url ?? FALLBACK_HERO_IMG}
          alt="Interior kamar tidur elegan"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/55 via-charcoal/25 to-transparent" />
      </div>
      <div className="container-wide relative flex flex-col justify-end pb-16 pt-8 md:min-h-[70vh] md:pb-24">
        <div className="flex justify-center">
          <BrandMark />
        </div>
        <div className="max-w-2xl mt-10 md:flex-1 md:flex md:flex-col md:justify-end">
          <p className="eyebrow text-ivory/80">{data?.eyebrow ?? '…'}</p>
          <h1 className="mt-4 font-serif text-hero text-ivory text-balance">{data?.title ?? '…'}</h1>
          <p className="mt-5 max-w-lg text-base text-ivory/85 md:text-lg">{data?.subtitle ?? '…'}</p>
        </div>
      </div>
    </section>
  );
}

function OurStory() {
  const { data } = useCmsData(getAboutStory);
  const viewportAmount = useViewportAmount();

  return (
    <section className="bg-ivory py-20 md:py-28">
      <div className="container-wide">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            className="overflow-hidden rounded-3xl"
            variants={revealVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: viewportAmount }}
          >
            <img
              src={data?.image_url ?? FALLBACK_STORY_IMG}
              alt="Kamar tidur bergaya dengan dekorasi hangat"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </motion.div>
          <motion.div
            variants={revealVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: viewportAmount }}
          >
            <h2 className="font-serif text-display text-charcoal text-balance">{data?.title ?? '…'}</h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-charcoal-muted">
              <p>{data?.paragraph_1 ?? '…'}</p>
              <p>{data?.paragraph_2 ?? '…'}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  const { data } = useCmsData(getAboutMilestones);
  const shouldReduce = useReducedMotion();
  const viewportAmount = useViewportAmount();
  const items = data?.items ?? [];

  return (
    <section className="bg-mist/50 py-20 md:py-28">
      <div className="container-wide">
        <SectionHeading eyebrow={data?.section.eyebrow ?? '…'} title={data?.section.title ?? '…'} align="center" />

        <motion.div
          className="mt-16 hidden md:block"
          variants={staggerContainer(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: viewportAmount }}
        >
          <div className="relative">
            <div className="absolute left-0 right-0 top-6 h-px bg-rose" />
            <div className="grid grid-cols-5 gap-4">
              {items.map((item) => (
                <motion.div key={item.id} className="relative" variants={shouldReduce ? undefined : revealVariants}>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border-2 border-mauve bg-ivory font-serif text-sm text-charcoal">
                    {String(item.year).slice(-2)}
                  </div>
                  <div className="mt-5 text-center">
                    <p className="font-serif text-lg text-charcoal">{item.year}</p>
                    <h3 className="mt-1 text-sm font-semibold text-charcoal">{item.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-charcoal-muted">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="mt-12 md:hidden">
          <div className="relative space-y-8 pl-6 sm:pl-10">
            <div className="absolute bottom-2 left-3 top-2 w-px bg-rose" />
            {items.map((item) => (
              <div key={item.id} className="relative">
                <div className="absolute -left-[1.65rem] top-1.5 flex h-3 w-3 items-center justify-center rounded-full border-2 border-mauve bg-ivory" />
                <p className="font-serif text-lg text-charcoal">{item.year}</p>
                <h3 className="mt-0.5 text-sm font-semibold text-charcoal">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-charcoal-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function VisionMission() {
  const { data } = useCmsData(getAboutVisionMission);

  return (
    <section className="bg-ivory py-20 md:py-28">
      <div className="container-wide">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow">{data?.vm.vision_label ?? '…'}</p>
            <h2 className="mt-3 font-serif text-section text-charcoal text-balance">
              {data?.vm.vision_text ?? '…'}
            </h2>
          </div>
          <div>
            <p className="eyebrow">{data?.vm.mission_label ?? '…'}</p>
            <ul className="mt-4 space-y-3">
              {(data?.missionItems ?? []).map((m) => (
                <li key={m.id} className="flex items-start gap-3 text-base text-charcoal-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-plum" />
                  {m.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function CoreValues() {
  const { data } = useCmsData(getAboutValues);
  const shouldReduce = useReducedMotion();
  const viewportAmount = useViewportAmount();

  return (
    <section className="bg-blush/30 py-20 md:py-28">
      <div className="container-wide">
        <SectionHeading eyebrow={data?.section.eyebrow ?? '…'} title={data?.section.title ?? '…'} align="center" />
        <motion.div
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
          variants={staggerContainer(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: viewportAmount }}
        >
          {(data?.items ?? []).map((val) => (
            <motion.div
              key={val.id}
              variants={shouldReduce ? undefined : revealVariants}
              className="rounded-2xl border border-rose/40 bg-ivory p-7 text-center md:p-8"
            >
              <h3 className="font-serif text-2xl text-charcoal">{val.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal-muted">{val.description}</p>
            </motion.div>
          ))}
          {!data &&
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl border border-rose/40 bg-ivory p-7 text-center md:p-8">
                <div className="mx-auto h-6 w-24 rounded bg-mist" />
                <div className="mt-3 h-3 w-full rounded bg-mist" />
              </div>
            ))}
        </motion.div>
      </div>
    </section>
  );
}

function BrandCTA() {
  const { data } = useCmsData(getAboutFinalCta);

  return (
    <section className="bg-mist py-20 md:py-28">
      <div className="container-wide">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-display text-charcoal text-balance">{data?.title ?? '…'}</h2>
          <p className="mt-5 text-base text-charcoal-muted">{data?.subtitle ?? '…'}</p>
          {data && (
            <Link
              to={data.cta_url}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-plum px-7 py-3.5 text-sm font-medium text-ivory transition-colors duration-300 ease-out hover:bg-plum-700"
            >
              {data.cta_text}
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHero />
      <OurStory />
      <Timeline />
      <VisionMission />
      <CoreValues />
      <BrandCTA />
    </>
  );
}
