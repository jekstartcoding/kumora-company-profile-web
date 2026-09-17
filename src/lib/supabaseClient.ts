// Fase 9.1 — Client Supabase untuk situs customer. Read-only (anon key, RLS Fase 2
// hanya mengizinkan SELECT). Key di-inject via Vite env (VITE_SUPABASE_URL /
// VITE_SUPABASE_ANON_KEY) — bukan hardcoded, supaya project Supabase bisa diganti
// per environment.
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY belum diisi — lihat .env.example'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
});
