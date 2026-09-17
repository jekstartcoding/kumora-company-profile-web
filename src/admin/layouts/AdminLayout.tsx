// AdminLayout ala Filament: sidebar gelap (brand, grup resource, footer versi),
// topbar dengan breadcrumb-halaman + user menu + logout. Mobile: sidebar drawer.
// Restrukturisasi: dirender di dalam app frontend (path /admin/*), tanpa Router sendiri.
import { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Boxes, HelpCircle, ListTree, LogOut, Menu, X } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const NAV_ITEMS = [
  { to: '/admin/products', label: 'Products', icon: Boxes },
  { to: '/admin/quiz-options', label: 'Quiz Options', icon: HelpCircle },
  { to: '/admin/quiz-mappings', label: 'Quiz Mappings', icon: ListTree },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string>('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? '');
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="adm-sidebar-brand">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-plum font-serif text-lg text-white">
          K
        </span>
        <span className="font-serif text-lg tracking-wide">Kumora</span>
        <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-gray-300">
          Admin
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto py-2">
        <p className="adm-sidebar-section">Catalog</p>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `adm-nav-item ${isActive ? 'adm-nav-item-active' : ''}`
            }
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="adm-sidebar-footer">
        <div className="flex items-center gap-1 text-gray-400">
          Kumora CMS
          <span className="ml-auto rounded bg-white/10 px-1.5 py-0.5 text-[10px]">v1.0</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="adm-shell">
      {/* Sidebar desktop */}
      <aside className="adm-sidebar hidden lg:flex">{sidebar}</aside>

      {/* Sidebar mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-charcoal/50" onClick={() => setMobileOpen(false)} />
          <aside className="adm-sidebar translate-x-0">{sidebar}</aside>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="absolute right-4 top-4 rounded-lg bg-white/10 p-2 text-white"
            aria-label="Tutup menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="adm-topbar">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Buka menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="text-sm font-semibold text-charcoal">Dashboard</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium leading-tight text-charcoal">{userEmail}</p>
              <p className="text-xs leading-tight text-gray-500">Administrator</p>
            </div>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-plum/10 font-semibold text-plum">
              {userEmail ? userEmail[0].toUpperCase() : '?'}
            </span>
            <button type="button" onClick={handleLogout} className="adm-btn-ghost" title="Keluar">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </header>

        <main className="adm-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
