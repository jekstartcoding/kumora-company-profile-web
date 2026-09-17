import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Layers, Heart, Sparkles, Headphones } from 'lucide-react';
import HeroSection from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/SectionHeading';
import CategorySection from '@/components/CategorySection';
import TestimonialSection from '@/components/TestimonialSection';
import { useProducts } from '@/data/products';
import { generateWhatsAppURL } from '@/data/content';
import { revealVariants, staggerContainer } from '@/lib/animations';
import { useViewportAmount } from '@/hooks/useViewportAmount';

const aboutImg =
  'https://images.pexels.com/photos/27164976/pexels-photo-27164976.jpeg?auto=compress&cs=tinysrgb&w=1200';

const statementImg =
  'https://images.pexels.com/photos/13009040/pexels-photo-13009040.jpeg?auto=compress&cs=tinysrgb&w=1600';

const principles = [
  {
    icon: Layers,
    title: 'Bahan Terpilih',
    description: 'Kami memilih bahan dengan perhatian pada kenyamanan dan daya tahan sehari-hari.',
  },
  {
    icon: Heart,
    title: 'Kenyamanan Sehari-hari',
    description: 'Produk kami dirancang untuk mendukung istirahat yang lebih baik tanpa mengorbankan kegunaan.',
  },
  {
    icon: Sparkles,
    title: 'Kualitas yang Terasa',
    description:
      'Kami memperhatikan bahan, konstruksi, dan detail yang membuat produk sehari-hari lebih baik.',
  },
  {
    icon: Headphones,
    title: 'Layanan Personal',
    description:
      'Tim kami siap melayani lewat WhatsApp untuk membantu pelanggan menemukan produk yang tepat.',
  },
];

function FeaturedSection() {
  const { products, loading, error } = useProducts();
  const featured = products.slice(0, 4);
  const viewportAmount = useViewportAmount();

  return (
    <section className="bg-ivory py-20 md:py-28">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Koleksi Kami"
          title="Kenyamanan yang Dipilih untuk Anda"
          description="Temukan perlengkapan sehari-hari yang dirancang untuk menjadikan kamar Anda lebih nyaman."
        />

        {error ? (
          <p className="mt-12 text-center text-sm text-charcoal-muted">Gagal memuat produk — coba muat ulang halaman.</p>
        ) : (
          <motion.div
            className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8"
            variants={staggerContainer(0.06)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: viewportAmount }}
          >
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
              : featured.map((product, i) => <ProductCard key={product.id} product={product} index={i} />)}
          </motion.div>
        )}

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
  const viewportAmount = useViewportAmount();

  return (
    <section className="bg-mist/50 py-20 md:py-28">
      <div className="container-wide">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <p className="eyebrow">Filosofi Kami</p>
            <h2 className="mt-3 font-serif text-display text-charcoal text-balance">
              Dibuat untuk Istirahat yang Nyata
            </h2>
            <p className="mt-6 text-base leading-relaxed text-charcoal-muted">
              Kumora lahir dari pemahaman sederhana: istirahat berkualitas membutuhkan perlengkapan
              yang benar-benar bekerja untuk tubuh Anda. Kami tidak percaya pada klaim berlebihan —
              kami fokus pada bahan terbaik, konstruksi yang teliti, dan kenyamanan yang konsisten
              setiap malam.
            </p>
            <p className="mt-4 text-base leading-relaxed text-charcoal-muted">
              Setiap produk kami uji langsung dalam kehidupan sehari-hari, memastikan setiap serat dan
              lapisan memberikan kenyamanan yang Anda rasakan sejak pemakaian pertama.
            </p>
            <Link to="/about" className="link-arrow mt-8">
              Kenali Kisah Kami
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <motion.div
            className="order-1 overflow-hidden rounded-3xl lg:order-2"
            variants={revealVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: viewportAmount }}
          >
            <img
              src={aboutImg}
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
  return (
    <section className="bg-ivory py-20 md:py-28">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Mengapa Kumora"
          title="Dibuat dengan Kenyamanan sebagai Dasar"
          align="center"
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-rose/40 bg-rose/40 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p, i) => (
            <div key={i} className="bg-ivory p-7 md:p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-mauve/15 text-charcoal">
                <p.icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <h3 className="mt-5 font-serif text-lg text-charcoal">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-muted">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatementSection() {
  const viewportAmount = useViewportAmount();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={statementImg}
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
            Istirahat Anda Berarti.
          </h2>
          <p className="mt-5 text-lg text-ivory/80">Karena hari yang lebih baik dimulai dari malam yang lebih nyenyak.</p>
        </motion.div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="bg-mist py-20 md:py-28">
      <div className="container-wide">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-display text-charcoal text-balance">
            Siap Menemukan Kenyamanan Anda?
          </h2>
          <p className="mt-5 text-base text-charcoal-muted">
            Jelajahi koleksi Kumora atau bicara langsung dengan tim kami untuk menemukan produk yang
            tepat untuk Anda.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/shop/pillows"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-plum px-7 py-3.5 text-center text-sm font-medium text-ivory transition-colors duration-300 ease-out hover:bg-plum-700 sm:w-auto"
            >
              Lihat Produk
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/quiz"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-plum/30 px-7 py-3.5 text-center text-sm font-medium text-plum transition-colors duration-300 ease-out hover:bg-plum/10 sm:w-auto"
            >
              Belum tahu yang cocok? Temukan pilihan Anda
            </Link>
            <a
              href={generateWhatsAppURL({
                type: 'standard',
                productName: 'Kumora products',
                variantLabel: 'general inquiry',
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-plum/30 px-7 py-3.5 text-center text-sm font-medium text-plum transition-colors duration-300 ease-out hover:bg-plum/10 sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" />
              Chat melalui WhatsApp
            </a>
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
