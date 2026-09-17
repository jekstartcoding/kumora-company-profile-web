import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
// Admin panel (Filament-style) — CSS terpisah, diimpor via JS supaya @apply
// di dalamnya terkompilasi oleh Tailwind (impor dari index.css terlambat).
import './admin/admin.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
