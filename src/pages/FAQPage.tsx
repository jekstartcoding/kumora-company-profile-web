import Accordion from '@/components/Accordion';
import SectionHeading from '@/components/SectionHeading';
import { FAQS, generateWhatsAppMessage, generateWhatsAppURL } from '@/data/products';
import { MessageCircle } from 'lucide-react';

export default function FAQPage() {
  return (
    <>
      <section className="bg-sand/40 pb-12 pt-28 md:pt-36">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Pusat Bantuan"
            title="Pertanyaan yang Sering Diajukan"
            description="Temukan jawaban atas pertanyaan umum tentang produk dan layanan Kumora."
          />
        </div>
      </section>

      <section className="bg-ivory pb-20 pt-12 md:pb-28">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl">
            <Accordion items={FAQS} />
          </div>

          <div className="mx-auto mt-14 max-w-2xl rounded-2xl border border-sand-dark/40 bg-sand/30 p-8 text-center md:p-10">
            <h2 className="font-serif text-2xl text-forest">Masih memiliki pertanyaan?</h2>
            <p className="mt-3 text-sm text-charcoal-muted">
              Tim kami siap membantu. Hubungi kami langsung melalui WhatsApp.
            </p>
            <a
              href={generateWhatsAppURL(generateWhatsAppMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp mt-6"
            >
              <MessageCircle className="h-4 w-4" />
              Chat melalui WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
