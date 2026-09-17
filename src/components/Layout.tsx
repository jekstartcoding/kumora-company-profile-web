import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';
import Footer from './Footer';
import ScrollProgress from './ScrollProgress';
import WhatsAppButton from './WhatsAppButton';
import { useScrollToTop } from '@/hooks/useScrollToTop';

export default function Layout({ children }: { children: ReactNode }) {
  useScrollToTop();
  const location = useLocation();
  const hideWhatsApp = location.pathname.startsWith('/product/');

  return (
    <div className="flex min-h-screen flex-col">
      <BottomNav />
      <ScrollProgress />

      <main className="flex-1">
        {children}
      </main>

      <Footer />
      {!hideWhatsApp && <WhatsAppButton />}
    </div>
  );
}
