import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { generateWhatsAppMessage, generateWhatsAppURL } from '@/data/products';
import { motion, useReducedMotion } from 'framer-motion';
import { staggerContainer } from '@/lib/animations';

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
        {/* Soft plum overlay preserves image detail while improving text visibility. */}
        <div className="absolute inset-0 bg-gradient-to-t from-plum-800/95 via-plum/65 to-plum/20" />
      </div>

      <motion.div
        className="container-wide relative flex min-h-[100svh] flex-col justify-end pb-20 pt-32 md:pb-28 md:pt-40"
        initial="hidden"
        animate="show"
        variants={staggerContainer(0.07)}
      >
        <div className="max-w-2xl">
          <motion.p
            className="eyebrow text-ivory/80"
            variants={shouldReduce ? undefined : { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}
          >
            Seni Istirahat yang Lebih Baik
          </motion.p>
          <motion.h1
            className="mt-5 font-serif text-hero text-ivory"
            variants={shouldReduce ? undefined : { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 } } }}
          >
            Tidur Lebih Nyenyak.
            <br />
            Hidup Lebih Baik.
          </motion.h1>
          <motion.p
            className="mt-6 max-w-lg text-base leading-relaxed text-ivory/85 md:text-lg"
            variants={shouldReduce ? undefined : { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 } } }}
          >
            Kumora menghadirkan perlengkapan tidur dan kamar yang dirancang dengan penuh perhatian untuk kenyamanan yang lebih baik setiap hari.
          </motion.p>
          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            variants={shouldReduce ? undefined : { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.16 } } }}
          >
            <Link to="/products" className="btn-primary">
              Lihat Produk
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={generateWhatsAppURL(generateWhatsAppMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ivory/40 bg-ivory/10 px-7 py-3.5 text-sm font-medium text-ivory backdrop-blur-sm transition-colors duration-300 ease-out hover:bg-ivory/20"
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
