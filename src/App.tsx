import { BrowserRouter, Navigate, Routes, Route, useParams, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import PageTransition from '@/components/PageTransition';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import CollectionPage from '@/pages/CollectionPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import FAQPage from '@/pages/FAQPage';
import ContactPage from '@/pages/ContactPage';
import QuizPage from '@/pages/Quiz';

function LegacyProductRedirect() {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={slug ? `/product/${slug}` : '/shop/pillows'} replace />;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
        <Route path="/shop/:category" element={<PageTransition><CollectionPage /></PageTransition>} />
        <Route path="/product/:slug" element={<PageTransition><ProductDetailPage /></PageTransition>} />
        <Route path="/products" element={<Navigate to="/shop/pillows" replace />} />
        <Route path="/products/:slug" element={<LegacyProductRedirect />} />
        <Route path="/quiz" element={<PageTransition><QuizPage /></PageTransition>} />
        <Route path="/faq" element={<PageTransition><FAQPage /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
        <Route path="*" element={<PageTransition><HomePage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </BrowserRouter>
  );
}
