import { Link } from 'react-router-dom';
import { MessageCircle, Instagram, Facebook, Music2 } from 'lucide-react';
import { generateWhatsAppMessage, generateWhatsAppURL } from '@/data/products';

const exploreLinks = [
  { label: 'Produk', to: '/products' },
  { label: 'Bantal', to: '/products?category=Pillows' },
  { label: 'Kasur', to: '/products?category=Mattresses' },
  { label: 'Seprai Penutup', to: '/products?category=Bed+Covers' },
  { label: 'Seprai', to: '/products?category=Bedsheets' },
];

const companyLinks = [
  { label: 'Tentang Kami', to: '/about' },
  { label: 'Kisah Kami', to: '/about' },
  { label: 'Tanya Jawab', to: '/faq' },
  { label: 'Kontak', to: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-plum text-ivory">
      <div className="container-wide py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-1">
            <div className="inline-flex rounded-full bg-ivory px-4 py-2">
              <img src="/kumora-logo-with-text.png" alt="Kumora" className="h-7 w-auto object-contain" />
            </div>
            <p className="mt-3 text-sm text-ivory/70">Kenyamanan untuk hidup yang lebih baik.</p>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory/60">
              Perlengkapan tidur dan kamar yang dirancang dengan penuh perhatian untuk kenyamanan setiap hari.
            </p>
          </div>

          <div>
            <h3 className="eyebrow text-ivory/50">Jelajahi</h3>
            <ul className="mt-5 space-y-3">
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
            <ul className="mt-5 space-y-3">
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

          <div>
            <h3 className="eyebrow text-ivory/50">Terhubung</h3>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={generateWhatsAppURL(generateWhatsAppMessage())}
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

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-ivory/10 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-ivory/50">© 2026 Kumora. Hak cipta dilindungi.</p>
          <p className="text-xs text-ivory/40">Situs prototipe — data merek fiktif</p>
        </div>
      </div>
    </footer>
  );
}
