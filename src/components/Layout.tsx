import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { pageVariants } from '@/lib/animations';

export default function Layout({ children }: { children: ReactNode }) {
  useScrollToTop();
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
        <motion.main
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          className="flex-1"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
