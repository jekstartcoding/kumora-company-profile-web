// AuthGuard: route admin dibungkus guard yang cek sesi Supabase Auth.
// Belum login → redirect ke /admin/login. Sesi sedang dicek → tampilkan loading.
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function AuthGuard({ children }: { children: ReactNode }) {
  const [checking, setChecking] = useState(true);
  const [authed, setAuthed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setAuthed(!!data.session);
      setChecking(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthed(!!session);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-charcoal text-sm text-gray-300">
        <span className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-gray-500 border-t-white" />
        Memeriksa sesi…
      </div>
    );
  }

  if (!authed) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
