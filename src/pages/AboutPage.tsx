import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { TIMELINE, CORE_VALUES } from '@/data/products';
import { motion, useReducedMotion } from 'framer-motion';
import { staggerContainer, cardVariants } from '@/lib/animations';

const heroImg =
  'https://images.pexels.com/photos/37436121/pexels-photo-37436121.jpeg?auto=compress&cs=tinysrgb&w=1600';
const storyImg =
  'https://images.pexels.com/photos/8135502/pexels-photo-8135502.jpeg?auto=compress&cs=tinysrgb&w=1200';

const missions = [
  'Menciptakan produk tidur yang nyaman dan dapat diandalkan.',
  'Terus meningkatkan bahan dan desain produk.',
  'Memberikan pengalaman pelanggan yang mudah dan personal.',
  'Membangun hubungan jangka panjang dengan pelanggan.',
];

function PageHero() {
  return (
    <section className="relative min-h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Interior kamar tidur elegan" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-forest/50" />
      </div>
      <div className="container-wide relative flex min-h-[70vh] flex-col justify-end pb-16 pt-32 md:pb-24">
        <div className="max-w-2xl">
          <p className="eyebrow text-ivory/80">Kisah Kami</p>
          <h1 className="mt-4 font-serif text-hero text-ivory text-balance">
            Dirancang untuk Istirahat yang Lebih Baik.
          </h1>
          <p className="mt-5 max-w-lg text-base text-ivory/85 md:text-lg">
            Kumora adalah merek perlengkapan tidur dan kamar yang berfokus pada membuat kenyamanan
            sehari-hari terasa lebih penuh perhatian, mudah dijangkau, dan personal.
          </p>
        </div>
      </div>
    </section>
  );
}

function OurStory() {
  return (
    <section className="bg-ivory py-20 md:py-28">
      <div className="container-wide">
        <motion.div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16" variants={staggerContainer(0.06)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
          <div className="overflow-hidden rounded-3xl">
            <img
              src={storyImg}
              alt="Kamar tidur bergaya dengan dekorasi hangat"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div>
            <motion.h2 className="font-serif text-display text-forest text-balance" variants={cardVariants}>
              Satu Gagasan Sederhana: Istirahat Lebih Baik untuk Keseharian
            </motion.h2>
            <motion.div className="mt-6 space-y-4 text-base leading-relaxed text-charcoal-muted" variants={cardVariants}>
              <p>
                Kumora didirikan pada tahun 2015 dengan gagasan sederhana: setiap orang berhak atas
                tempat istirahat yang nyaman. Apa yang dimulai sebagai koleksi kecil bantal sehari-hari
                perlahan berkembang menjadi rangkaian perlengkapan kamar yang lebih luas.
              </p>
              <p>
                Saat ini, Kumora menggabungkan bantal, kasur, seprai, dan aksesori kamar dalam satu
                merek, sambil tetap berpegang pada prinsip awal: menjadikan istirahat sehari-hari
                lebih baik.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section className="bg-sand/50 py-20 md:py-28">
      <div className="container-wide">
        <motion.div variants={staggerContainer(0.06)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
          <SectionHeading eyebrow="Perjalanan Kami" title="Pencapaian" align="center" />
        </motion.div>

        {/* Desktop horizontal timeline */}
        <div className="mt-16 hidden md:block">
          <div className="relative">
            <div className="absolute left-0 right-0 top-6 h-px bg-sand-dark" />
            <motion.div className="grid grid-cols-5 gap-4" variants={staggerContainer(0.04)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.12 }}>
              {TIMELINE.map((item, i) => (
                <motion.div key={i} className="relative" variants={cardVariants}>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border-2 border-forest bg-ivory font-serif text-sm text-forest">
                    {item.year.slice(-2)}
                  </div>
                  <div className="mt-5 text-center">
                    <p className="font-serif text-lg text-forest">{item.year}</p>
                    <h3 className="mt-1 text-sm font-semibold text-charcoal">{item.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-charcoal-muted">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="mt-12 md:hidden">
          <div className="relative space-y-8 pl-8">
            <div className="absolute bottom-2 left-3 top-2 w-px bg-sand-dark" />
            {TIMELINE.map((item, i) => (
              <motion.div key={i} className="relative" variants={cardVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.12 }}>
                <div className="absolute -left-[1.65rem] top-1.5 flex h-3 w-3 items-center justify-center rounded-full border-2 border-forest bg-ivory" />
                <p className="font-serif text-lg text-forest">{item.year}</p>
                <h3 className="mt-0.5 text-sm font-semibold text-charcoal">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-charcoal-muted">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function VisionMission() {
  return (
    <section className="bg-ivory py-20 md:py-28">
      <div className="container-wide">
        <motion.div className="grid gap-10 lg:grid-cols-2 lg:gap-16" variants={staggerContainer(0.06)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
          <div>
            <p className="eyebrow">Visi</p>
            <motion.h2 className="mt-3 font-serif text-section text-forest text-balance" variants={cardVariants}>
              Menjadi nama terpercaya dalam kenyamanan tidur dan kamar sehari-hari.
            </motion.h2>
          </div>
          <div>
            <p className="eyebrow">Misi</p>
            <motion.ul className="mt-4 space-y-3" variants={cardVariants}>
              {missions.map((m, i) => (
                <li key={i} className="flex items-start gap-3 text-base text-charcoal-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {m}
                </li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CoreValues() {
  return (
    <section className="bg-sand/50 py-20 md:py-28">
      <div className="container-wide">
        <motion.div variants={staggerContainer(0.06)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
          <SectionHeading eyebrow="Yang Kami Pegang" title="Nilai Utama" align="center" />
        </motion.div>
        <motion.div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8" variants={staggerContainer(0.06)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.12 }}>
          {CORE_VALUES.map((val, i) => (
            <motion.div key={i} variants={cardVariants} className="rounded-2xl border border-sand-dark/40 bg-ivory p-7 text-center md:p-8">
              <h3 className="font-serif text-2xl text-forest">{val.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal-muted">{val.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function BrandCTA() {
  return (
    <section className="bg-forest py-20 md:py-28">
      <div className="container-wide">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-display text-ivory text-balance">
            Jelajahi Koleksi Kumora
          </h2>
          <p className="mt-5 text-base text-ivory/70">
            Temukan perlengkapan tidur dan kamar yang dirancang dengan penuh perhatian.
          </p>
          <Link
            to="/products"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-ivory px-7 py-3.5 text-sm font-medium text-forest transition-all duration-300 hover:bg-gold"
          >
            Lihat Produk
            <ArrowRight className="h-4 w-4" />
          </Link>
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
