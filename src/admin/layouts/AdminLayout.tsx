// AdminLayout ala Filament: sidebar gelap (brand, grup resource, footer versi),
// topbar dengan breadcrumb-halaman + user menu + logout. Mobile: sidebar drawer.
// Restrukturisasi: dirender di dalam app frontend (path /admin/*), tanpa Router sendiri.
import { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Boxes, ChevronRight, CircleHelp, HelpCircle, Home, Info, ListTree, LogOut, Menu, PanelLeftClose, PanelLeftOpen, X } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { CMS_NAV } from '../resources/cms/config';

const NAV_ITEMS = [
  { to: '/admin/products', label: 'Products', icon: Boxes },
  { to: '/admin/quiz-options', label: 'Quiz Options', icon: HelpCircle },
  { to: '/admin/quiz-mappings', label: 'Quiz Mappings', icon: ListTree },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string>('');
  const [mobileOpen, setMobileOpen] = useState(false);
  // Foldable group CMS (Home Page / About Page) — persist per group in localStorage.
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    try {
      return JSON.parse(localStorage.getItem('kumora-admin-cms-groups') ?? '{}');
    } catch {
      return {};
    }
  });
  const toggleGroup = (key: string) => {
    setOpenGroups((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem('kumora-admin-cms-groups', JSON.stringify(next));
      } catch {
        /* private mode — state in-memory tetap jalan */
      }
      return next;
    });
  };
  // Minimize sidebar (desktop): rail ikon 80px. Persist di localStorage.
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem('kumora-admin-sidebar-collapsed') === '1';
    } catch {
      return false;
    }
  });
  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      try {
        localStorage.setItem('kumora-admin-sidebar-collapsed', prev ? '0' : '1');
      } catch {
        /* private mode — state in-memory tetap jalan */
      }
      return !prev;
    });
  };

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
      <div
        className={`adm-sidebar-brand ${collapsed ? 'adm-sidebar-brand-collapsed' : ''}`}
        title={collapsed ? 'Kumora Admin' : undefined}
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-plum font-serif text-lg text-white">
          K
        </span>
        {!collapsed && (
          <>
            <span className="font-serif text-lg tracking-wide">Kumora</span>
            <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-gray-300">
              Admin
            </span>
          </>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-2">
        <p className="adm-sidebar-section">Catalog</p>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => setMobileOpen(false)}
            title={collapsed ? item.label : undefined}
            className={({ isActive }) =>
              `adm-nav-item ${collapsed ? 'adm-nav-item-collapsed' : ''} ${
                isActive ? 'adm-nav-item-active' : ''
              }`
            }
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {!collapsed && item.label}
          </NavLink>
        ))}

        {!collapsed && (
          <>
            {/* Separator "CMS Section" — elemennya sama dengan "Catalog" (teks saja) */}
            <p className="adm-sidebar-section">CMS Section</p>
            {/* 2 grup halaman CMS, foldable: Home Page & About Page */}
            {([
              { key: 'homepage', group: CMS_NAV.homepage, icon: Home, label: 'Home Page' },
              { key: 'about', group: CMS_NAV.about, icon: Info, label: 'About Page' },
            ] as const).map(({ key, group, icon: GroupIcon, label }) => {
              const isOpen = openGroups[key] ?? true;
              // Grup dianggap aktif jika salah satu sub-item-nya sedang dibuka
              const hasActive = group.items.some((item) =>
                location.pathname === `/admin/cms/${item.slug}` ||
                location.pathname.startsWith(`/admin/cms/${item.slug}/`),
              );
              return (
                <div key={key}>
                  <button
                    type="button"
                    onClick={() => toggleGroup(key)}
                    className={`adm-nav-group-btn ${hasActive ? 'text-white' : ''}`}
                    aria-expanded={isOpen}
                  >
                    <GroupIcon className="h-4 w-4 shrink-0" />
                    {label}
                    <ChevronRight
                      className={`adm-nav-chevron ${isOpen ? 'rotate-90' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <div>
                      {group.items.map((item) => (
                        <NavLink
                          key={item.slug}
                          to={`/admin/cms/${item.slug}`}
                          onClick={() => setMobileOpen(false)}
                          className={({ isActive }) =>
                            `adm-nav-item ml-4 border-l border-white/10 pl-3 text-xs ${
                              isActive ? 'adm-nav-item-active' : ''
                            }`
                          }
                        >
                          <ChevronRight className="h-3 w-3 shrink-0 text-gray-500" />
                          {item.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}
      </nav>

      <div className={`adm-sidebar-footer ${collapsed ? 'text-center' : ''}`}>
        {collapsed ? (
          <div className="text-[10px] text-gray-500">v1.0</div>
        ) : (
          <div className="flex items-center gap-1 text-gray-400">
            Kumora CMS
            <span className="ml-auto rounded bg-white/10 px-1.5 py-0.5 text-[10px]">v1.0</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="adm-shell">
      {/* Sidebar desktop — sticky full-height (sampai bawah layar), bisa di-minimize */}
      <aside
        className={`adm-sidebar sticky top-0 hidden h-screen lg:flex ${
          collapsed ? 'adm-sidebar-collapsed' : 'w-64'
        }`}
      >
        {sidebar}
        <button
          type="button"
          onClick={toggleCollapsed}
          className="absolute -right-3 top-20 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-md transition-colors hover:bg-gray-100 hover:text-charcoal"
          title={collapsed ? 'Perluas sidebar' : 'Minimize sidebar'}
          aria-label={collapsed ? 'Perluas sidebar' : 'Minimize sidebar'}
        >
          {collapsed ? <PanelLeftOpen className="h-3.5 w-3.5" /> : <PanelLeftClose className="h-3.5 w-3.5" />}
        </button>
      </aside>

      {/* Sidebar mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-charcoal/50" onClick={() => setMobileOpen(false)} />
          <aside className="adm-sidebar fixed inset-y-0 left-0 w-64">{sidebar}</aside>
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
