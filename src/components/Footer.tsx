import { Link } from 'react-router-dom';
import { MessageCircle, Instagram, Facebook, Music2 } from 'lucide-react';
import { generateWhatsAppURL } from '@/data/content';

const exploreLinks = [
  { label: 'Pillows', to: '/shop/pillows' },
  { label: 'Bolsters', to: '/shop/bolsters' },
  { label: 'Beds', to: '/shop/beds' },
];

const companyLinks = [
  { label: 'Tentang Kami', to: '/about' },
  { label: 'Tanya Jawab', to: '/faq' },
  { label: 'Kontak', to: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-ivory">
      <div className="container-wide py-12 md:py-20">
        {/* Mobile: link list 2 kolom + sosial inline supaya footer ringkas; */}
        {/* md ke atas: layout 2 kolom, lg: 4 kolom seperti semula. */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:gap-8 lg:grid-cols-4">
          <div className="col-span-2 lg:col-span-1">
            <div className="inline-flex rounded-full bg-ivory px-4 py-2">
              <img src="/kumora-logo-with-text.png" alt="Kumora" className="h-7 w-auto object-contain" />
            </div>
            <p className="mt-2 text-sm text-ivory/70">Kenyamanan untuk hidup yang lebih baik.</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ivory/60 md:mt-6">
              Perlengkapan tidur dan kamar yang dirancang dengan penuh perhatian untuk kenyamanan setiap hari.
            </p>
          </div>

          <div>
            <h3 className="eyebrow text-ivory/50">Jelajahi</h3>
            <ul className="mt-4 space-y-2.5 md:mt-5 md:space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-ivory/75 transition-colors duration-300 ease-out hover:text-mauve"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-ivory/50">Perusahaan</h3>
            <ul className="mt-4 space-y-2.5 md:mt-5 md:space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-ivory/75 transition-colors duration-300 ease-out hover:text-mauve"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sosial media: baris inline di mobile (ringkas), stack di lg */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="eyebrow text-ivory/50">Terhubung</h3>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3 md:mt-5 lg:flex-col lg:space-y-3 lg:gap-x-0 lg:gap-y-0">
              <li>
                <a
                  href={generateWhatsAppURL({
                    type: 'standard',
                    productName: 'Kumora products',
                    variantLabel: 'general inquiry',
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-ivory/75 transition-colors duration-300 ease-out hover:text-mauve"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center gap-2 text-sm text-ivory/75 transition-colors duration-300 ease-out hover:text-mauve"
                >
                  <Instagram className="h-4 w-4" /> Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center gap-2 text-sm text-ivory/75 transition-colors duration-300 ease-out hover:text-mauve"
                >
                  <Music2 className="h-4 w-4" /> TikTok
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center gap-2 text-sm text-ivory/75 transition-colors duration-300 ease-out hover:text-mauve"
                >
                  <Facebook className="h-4 w-4" /> Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-ivory/10 pt-6 sm:flex-row sm:items-center md:mt-14 md:pt-8">
          <p className="text-xs text-ivory/50">© 2026 Kumora. Hak cipta dilindungi.</p>
          <p className="text-xs text-ivory/40">Situs prototipe — data merek fiktif</p>
        </div>
      </div>
    </footer>
  );
}
