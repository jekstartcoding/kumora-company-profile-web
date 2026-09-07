import { MessageCircle, Mail, MapPin, Clock, Instagram, Music2, Facebook } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { generateWhatsAppMessage, generateWhatsAppURL } from '@/data/products';
import { motion, useReducedMotion } from 'framer-motion';
import { revealVariants, staggerContainer } from '@/lib/animations';

const contactInfo = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+62 812-3456-7890',
    href: generateWhatsAppURL(generateWhatsAppMessage()),
    external: true,
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@kumora.id',
    href: 'mailto:hello@kumora.id',
  },
  {
    icon: MapPin,
    label: 'Showroom',
    value: 'Jl. Example No. 123\nBandung, Jawa Barat',
  },
  {
    icon: Clock,
    label: 'Jam Buka',
    value: 'Senin – Sabtu\n09.00 – 18.00 WIB',
  },
];

function MapPlaceholder() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-rose/40 bg-sand">
      <div className="relative aspect-[16/10] w-full bg-gradient-to-br from-blush via-sand to-rose/40">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(rgba(113,135,125,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(113,135,125,0.15) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute left-0 right-0 top-1/2 h-3 -translate-y-1/2 bg-rose/30" />
        <div className="absolute bottom-0 left-1/3 top-0 w-3 bg-rose/30" />
        <div className="absolute left-2/3 top-0 h-full w-2 bg-rose/20" />
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-plum text-ivory shadow-lg">
            <MapPin className="h-5 w-5" />
          </div>
          <div className="mt-3 rounded-lg bg-ivory/95 px-4 py-2 text-center shadow-md backdrop-blur-sm">
            <p className="font-serif text-sm text-plum">Ruang Pamer Kumora</p>
            <p className="text-xs text-charcoal-muted">Bandung, Jawa Barat</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const shouldReduce = useReducedMotion();

  return (
    <>
      <section className="bg-mist/50 pb-12 pt-28 md:pt-36">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Hubungi Kami"
            title="Mari Bicara"
            description="Memiliki pertanyaan tentang produk kami? Tim kami siap membantu."
          />
        </div>
      </section>

      <section className="bg-ivory pb-20 pt-12 md:pb-28">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-serif text-section text-plum">Informasi Kontak</h2>
              <motion.div
                className="mt-8 space-y-6"
                variants={staggerContainer(0.05)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                {contactInfo.map((info, i) => (
                  <motion.div
                    key={i}
                    variants={shouldReduce ? undefined : revealVariants}
                    className="flex items-start gap-4"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mauve/15 text-plum">
                      <info.icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="eyebrow">{info.label}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          target={info.external ? '_blank' : undefined}
                          rel={info.external ? 'noopener noreferrer' : undefined}
                          className="mt-1 block whitespace-pre-line text-base text-charcoal transition-colors duration-300 ease-out hover:text-plum"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="mt-1 whitespace-pre-line text-base text-charcoal">
                          {info.value}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <div className="mt-10">
                <p className="eyebrow">Ikuti Kami</p>
                <div className="mt-4 flex items-center gap-3">
                  {[
                    { icon: Instagram, label: 'Instagram' },
                    { icon: Music2, label: 'TikTok' },
                    { icon: Facebook, label: 'Facebook' },
                  ].map((social, i) => (
                    <a
                      key={i}
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      aria-label={social.label}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-rose/40 text-charcoal-light transition-colors duration-300 ease-out hover:border-plum hover:bg-plum hover:text-ivory"
                    >
                      <social.icon className="h-5 w-5" strokeWidth={1.5} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="rounded-3xl bg-plum p-8 text-center md:p-10">
                <h3 className="font-serif text-2xl text-ivory">Chat dengan kami melalui WhatsApp</h3>
                <p className="mt-3 text-sm text-ivory/70">
                  Cara tercepat untuk menghubungi tim kami. Kami siap membantu Anda menemukan produk yang tepat.
                </p>
                <a
                  href={generateWhatsAppURL(generateWhatsAppMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-ivory px-7 py-3.5 text-sm font-medium text-plum transition-colors duration-300 ease-out hover:bg-blush-dark"
                >
                  <MessageCircle className="h-4 w-4" />
                  Mulai Percakapan
                </a>
              </div>

              <div className="mt-8">
                <MapPlaceholder />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
