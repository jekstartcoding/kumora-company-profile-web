// LoginPage admin ala Filament: kartu bersih di latar gelap brand (charcoal/plum).
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (authError) {
      setError(
        authError.message === 'Invalid login credentials'
          ? 'Email atau password salah.'
          : authError.message
      );
      return;
    }
    navigate('/admin/products');
  };

  return (
    <div className="adm-login-wrap">
      <div className="adm-login-card">
        <div className="mb-8 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-plum font-serif text-2xl text-white shadow-lg">
            K
          </span>
          <h1 className="mt-4 font-serif text-2xl text-charcoal">Kumora Admin</h1>
          <p className="mt-1 text-sm text-gray-500">
            Masuk untuk mengelola produk dan quiz.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="adm-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="adm-input"
              placeholder="admin@kumora.id"
            />
          </div>
          <div>
            <label htmlFor="password" className="adm-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="adm-input"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-600">
              {error}
            </p>
          )}

          <button type="submit" disabled={busy} className="adm-btn-primary w-full py-2.5">
            <LogIn className="h-4 w-4" />
            {busy ? 'Memeriksa…' : 'Masuk'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-400">
          Akses internal — hanya untuk pengelola Kumora.
        </p>
      </div>
    </div>
  );
}
