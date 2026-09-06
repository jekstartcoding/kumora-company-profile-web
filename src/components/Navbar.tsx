import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { generateWhatsAppMessage, generateWhatsAppURL } from '@/data/products';

const navLinks = [
  { label: 'Beranda', to: '/' },
  { label: 'Tentang Kami', to: '/about' },
  { label: 'Produk', to: '/products' },
  { label: 'Tanya Jawab', to: '/faq' },
  { label: 'Kontak', to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const isHome = location.pathname === '/';
  const solid = scrolled || !isHome || menuOpen;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid
            ? 'bg-ivory/90 shadow-[0_1px_0_0_rgba(0,0,0,0.06)] backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <nav className="container-wide flex h-16 items-center justify-between md:h-20">
          <Link to="/" className="flex items-center" aria-label="Kumora">
            <picture>
              <source media="(min-width: 1024px)" srcSet="/kumora-logo-with-text.png" />
              <img
                src="/kumora-logo-without-text.png"
                alt="Kumora"
                className="h-10 w-auto object-contain md:h-12 lg:h-10"
              />
            </picture>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-300 ${
                    isActive
                      ? 'text-clay'
                      : solid
                        ? 'text-charcoal-light hover:text-clay'
                        : 'text-charcoal-light hover:text-clay'
                  } relative`
                }
              >
                {({ isActive }) => (
                  <span className="relative">
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1.5 left-0 h-px w-full bg-maroon"
                      />
                    )}
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={generateWhatsAppURL(generateWhatsAppMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full bg-clay px-5 py-2.5 text-sm font-medium text-ivory transition-all duration-300 hover:bg-clay-700 hover:shadow-md md:inline-flex"
            >
              <MessageCircle className="h-4 w-4" />
              Chat dengan Kami
            </a>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-clay transition-colors hover:bg-clay/5 lg:hidden"
              aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${
          menuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div
          className={`absolute inset-0 bg-clay/20 backdrop-blur-sm transition-opacity duration-300 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 flex h-full w-[78%] max-w-sm flex-col bg-ivory shadow-2xl transition-transform duration-400 ease-out ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex h-16 items-center justify-between border-b border-sand-dark/40 px-6">
            <img src="/kumora-logo-without-text.png" alt="Kumora" className="h-10 w-auto object-contain" />
            <button
              onClick={() => setMenuOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-clay hover:bg-clay/5"
              aria-label="Tutup menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 py-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3.5 text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-clay/8 text-clay'
                      : 'text-charcoal-light hover:bg-clay/5 hover:text-clay'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          <div className="border-t border-sand-dark/40 p-6">
            <a
              href={generateWhatsAppURL(generateWhatsAppMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-clay px-6 py-3.5 text-sm font-medium text-ivory transition-all hover:bg-clay-700"
            >
              <MessageCircle className="h-4 w-4" />
              Chat dengan Kami
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
