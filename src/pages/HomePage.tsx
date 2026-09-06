import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Layers, Heart, Sparkles, Headphones } from 'lucide-react';
import HeroSection from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/SectionHeading';
import CategorySection from '@/components/CategorySection';
import TestimonialSection from '@/components/TestimonialSection';
import { getFeaturedProducts, generateWhatsAppMessage, generateWhatsAppURL } from '@/data/products';
import { cardVariants, staggerContainer } from '@/lib/animations';

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
  const featured = getFeaturedProducts();

  return (
    <motion.section
      className="bg-ivory py-20 md:py-28"
      variants={staggerContainer(0.06)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-120px' }}
    >
      <div className="container-wide">
        <motion.div variants={cardVariants}>
          <SectionHeading
            eyebrow="Koleksi Kami"
            title="Kenyamanan yang Dipilih untuk Anda"
            description="Temukan perlengkapan sehari-hari yang dirancang untuk menjadikan kamar Anda lebih nyaman."
          />
        </motion.div>

        <motion.div
          className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8"
          variants={staggerContainer(0.06)}
        >
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </motion.div>

        <div className="mt-12 flex justify-center">
          <Link to="/products" className="btn-secondary">
            Lihat Semua Produk
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.section>
  );
}

function AboutSection() {
  return (
    <motion.section
      className="bg-sand/50 py-20 md:py-28"
      variants={staggerContainer(0.06)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-120px' }}
    >
      <div className="container-wide">
        <motion.div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16" variants={cardVariants}>
          <div className="order-2 lg:order-1">
            <p className="eyebrow">Tentang Kumora</p>
            <h2 className="mt-3 font-serif text-display text-clay text-balance">
              Kenyamanan Berawal dari Cara Anda Beristirahat.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-charcoal-muted">
              <p>
                Kumora didirikan dengan keyakinan sederhana: istirahat yang lebih baik dimulai dari
                pilihan yang lebih baik. Dari bantal dan kasur hingga perlengkapan tidur, kami
                menciptakan produk yang menghadirkan kenyamanan, kualitas, dan desain yang dipikirkan
                dengan matang dalam kehidupan sehari-hari.
              </p>
              <p>
                Kami percaya kamar tidur seharusnya lebih dari sekadar tempat tidur. Ia harus menjadi
                ruang untuk melambat, mengisi ulang energi, dan merasa seperti di rumah.
              </p>
            </div>
            <Link to="/about" className="link-arrow mt-8">
              Kenali Kisah Kami
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="order-1 overflow-hidden rounded-3xl lg:order-2">
            <img
              src={aboutImg}
              alt="Kamar tidur minimalis dengan pencahayaan alami yang hangat"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover lg:aspect-[5/4]"
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function WhySection() {
  return (
    <motion.section
      className="bg-ivory py-20 md:py-28"
      variants={staggerContainer(0.06)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-120px' }}
    >
      <div className="container-wide">
        <motion.div variants={cardVariants}>
          <SectionHeading
            eyebrow="Mengapa Kumora"
            title="Dibuat dengan Kenyamanan sebagai Dasar"
            align="center"
          />
        </motion.div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-sand-dark/40 bg-sand-dark/40 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p, i) => (
            <div key={i} className="bg-ivory p-7 md:p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-clay/8 text-clay">
                <p.icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <h3 className="mt-5 font-serif text-lg text-clay">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-muted">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function StatementSection() {
  return (
    <motion.section
      className="relative overflow-hidden"
      variants={staggerContainer(0.06)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-120px' }}
    >
      <div className="absolute inset-0">
        <img
          src={statementImg}
          alt="Kamar tidur diterangi sinar matahari pagi yang hangat"
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-clay/50" />
      </div>
      <div className="container-wide relative py-24 md:py-36">
        <motion.div className="mx-auto max-w-3xl text-center" variants={cardVariants}>
          <h2 className="font-serif text-display text-ivory text-balance md:text-[3.5rem]">
            Istirahat Anda Berarti.
          </h2>
          <p className="mt-5 text-lg text-ivory/80">Karena hari yang lebih baik dimulai dari malam yang lebih nyenyak.</p>
        </motion.div>
      </div>
    </motion.section>
  );
}

function FinalCTA() {
  return (
    <motion.section
      className="bg-clay py-20 md:py-28"
      variants={staggerContainer(0.06)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-120px' }}
    >
      <div className="container-wide">
        <motion.div className="mx-auto max-w-2xl text-center" variants={cardVariants}>
          <h2 className="font-serif text-display text-ivory text-balance">
            Siap Menemukan Kenyamanan Anda?
          </h2>
          <p className="mt-5 text-base text-ivory/70">
            Jelajahi koleksi Kumora atau bicara langsung dengan tim kami untuk menemukan produk yang
            tepat untuk Anda.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ivory px-7 py-3.5 text-sm font-medium text-clay transition-all duration-300 hover:bg-gold hover:text-clay"
            >
              Lihat Produk
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={generateWhatsAppURL(generateWhatsAppMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ivory/30 px-7 py-3.5 text-sm font-medium text-ivory transition-all duration-300 hover:bg-ivory/10"
            >
              <MessageCircle className="h-4 w-4" />
              Chat melalui WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </motion.section>
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
