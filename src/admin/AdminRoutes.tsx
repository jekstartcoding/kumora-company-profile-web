// Restrukturisasi arsitektur — admin panel kini bagian dari app frontend Kumora
// (bukan sub-app terpisah di repo backend). Dirender dari App.tsx utama via
// <Route path="/admin/*">; guard & layout di dalam sini, tanpa BrowserRouter
// sendiri (sudah disediakan root app).
import { Navigate, Route, Routes } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import AuthGuard from './components/AuthGuard';
import LoginPage from './pages/LoginPage';
import ProductsPage from './resources/products/ProductsPage';
import ProductFormPage from './resources/products/ProductFormPage';
import QuizOptionsPage from './resources/quizOptions/QuizOptionsPage';
import QuizMappingsPage from './resources/quizMappings/QuizMappingsPage';

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
      </Route>
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}
