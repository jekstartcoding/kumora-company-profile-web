import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { generateWhatsAppMessage, generateWhatsAppURL } from '@/data/products';
import { motion, useReducedMotion } from 'framer-motion';
import { staggerContainer, cardVariants } from '@/lib/animations';

const heroImg =
  'https://images.pexels.com/photos/7534543/pexels-photo-7534543.jpeg?auto=compress&cs=tinysrgb&w=1600';

export default function HeroSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-ivory">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Kamar tidur elegan dengan tempat tidur nyaman dan pencahayaan alami yang hangat"
          className="h-full w-full object-cover"
          {...{ fetchpriority: 'high' }}
        />
        {/* Darken overlay to improve text visibility (fading from bottom to top) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      </div>

      <motion.div className="container-wide relative flex min-h-[100svh] flex-col justify-end pb-20 pt-32 md:pb-28 md:pt-40" variants={staggerContainer(0.08)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
        <div className="max-w-2xl">
          <motion.p className="eyebrow text-ivory/80" variants={shouldReduce ? undefined : cardVariants}>
            Seni Istirahat yang Lebih Baik
          </motion.p>
          <motion.h1 className="mt-5 font-serif text-hero text-ivory" variants={shouldReduce ? undefined : cardVariants}>
            Tidur Lebih Nyenyak.
            <br />
            Hidup Lebih Baik.
          </motion.h1>
          <motion.p className="mt-6 max-w-lg text-base leading-relaxed text-ivory/85 md:text-lg" variants={shouldReduce ? undefined : cardVariants}>
            Kumora menghadirkan perlengkapan tidur dan kamar yang dirancang dengan penuh perhatian untuk kenyamanan yang lebih baik setiap hari.
          </motion.p>
          <motion.div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center" variants={shouldReduce ? undefined : cardVariants}>
            <Link to="/products" className="btn-primary">
              Lihat Produk
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={generateWhatsAppURL(generateWhatsAppMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ivory/40 bg-ivory/10 px-7 py-3.5 text-sm font-medium text-ivory backdrop-blur-sm transition-all duration-300 hover:bg-ivory/20"
            >
              <MessageCircle className="h-4 w-4" />
              Hubungi Kami
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
