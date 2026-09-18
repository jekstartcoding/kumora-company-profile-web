// Restrukturisasi arsitektur — admin panel kini bagian dari app frontend Kumora
// (bukan sub-app terpisah di repo backend). Dirender dari App.tsx utama via
// <Route path="/admin/*">; guard & layout di dalam sini, tanpa BrowserRouter
// sendiri (sudah disediakan root app).
// Fase 5/6 plan CMS — route /admin/cms/:slug untuk seluruh resource CMS.
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import AuthGuard from './components/AuthGuard';
import LoginPage from './pages/LoginPage';
import ProductsPage from './resources/products/ProductsPage';
import ProductFormPage from './resources/products/ProductFormPage';
import QuizOptionsPage from './resources/quizOptions/QuizOptionsPage';
import QuizMappingsPage from './resources/quizMappings/QuizMappingsPage';
import CmsSingletonPage from './resources/cms/CmsSingletonPage';
import CmsListPage from './resources/cms/CmsListPage';
import CategoryContentPage from './resources/cms/CategoryContentPage';
import { CMS_NAV } from './resources/cms/config';

function CmsResourceRoute() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug ?? '';
  const allSlugs = [...CMS_NAV.homepage.items, ...CMS_NAV.about.items];
  const found = allSlugs.find((i) => i.slug === slug);
  if (!found) {
    return <Navigate to="/admin" replace />;
  }
  if (slug === 'category-content') return <CategoryContentPage />;
  // Daftar repeater punya config list; sisanya singleton.
  const isList = ['showcase-products', 'trust-items', 'testimonials', 'milestones', 'mission-items', 'values'].includes(slug);
  return isList ? <CmsListPage slug={slug} /> : <CmsSingletonPage slug={slug} />;
}

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin/login" element={<LoginPage />} />
      <Route
        path="/admin"
        element={
          <AuthGuard>
            <AdminLayout />
          </AuthGuard>
        }
      >
        <Route index element={<Navigate to="/admin/products" replace />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/new" element={<ProductFormPage />} />
        <Route path="products/:id" element={<ProductFormPage />} />
        <Route path="quiz-options" element={<QuizOptionsPage />} />
        <Route path="quiz-mappings" element={<QuizMappingsPage />} />
        <Route path="cms/:slug" element={<CmsResourceRoute />} />
      </Route>
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}
