// Fase 9.1 — Client Supabase TUNGGAL untuk seluruh frontend (customer + admin).
// Read-only untuk customer (RLS hanya mengizinkan SELECT); admin panel memakai
// client ini hanya untuk auth (login/logout/session).
//
// Kenapa satu client: supabase-js mem-warning "Multiple GoTrueClient instances
// detected" begitu ada >1 instance GoTrueAuth dalam satu halaman — walau
// storage key-nya berbeda. Key: Publishable key (keputusan user: auth admin
// tetap publishable); publishable & anon memetakan ke role `anon` yang sama,
// jadi read customer tidak berubah. ANON_KEY dipertahankan sebagai fallback
// untuk .env lama.
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const supabaseKey = publishableKey || anonKey;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'VITE_SUPABASE_URL dan VITE_SUPABASE_PUBLISHABLE_KEY (atau fallback VITE_SUPABASE_ANON_KEY) wajib diisi — lihat .env.example'
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    // persistSession true: dibutuhkan admin panel (login bertahan). Aman untuk
    // customer — tanpa login customer, session hanya ada di browser admin.
    persistSession: true,
    autoRefreshToken: true,
    // Login memakai email+password (tanpa redirect OAuth/magic-link), jadi
    // URL tidak perlu diparse mencari code session.
    detectSessionInUrl: false,
  },
});
