// Fase 9 — Utilitas data produk. SEBELUMNYA: array statis. KINI: query Supabase
// (read-only, RLS Fase 2 hanya mengizinkan SELECT). Nama & kontrak fungsi dipertahankan
// persis dari versi statis (plan 9.2: "Tipe Product di frontend tidak berubah bentuknya
// — hanya sumber datanya yang berubah"), dengan tiga perbedaan wajar:
//   1. Semua fetch kini async (network request sungguhan — plan 9.3).
//   2. `id` produk bertipe string UUID (dari database).
//   3. `specifications` dihapus dari tipe (tak pernah dipakai UI, tak ada di DB).
// rating/reviewCount dihitung live dari product_reviews; shortDescription di-derive
// dari sensory_descriptor (keputusan user Fase 9).
// Konstanta NON-produk (WhatsApp, TESTIMONIALS, FAQS, TIMELINE, CORE_VALUES, CATEGORIES,
// formatIDR) pindah ke `./content` — tetap statis karena bukan katalog.
import { supabase } from '@/lib/supabaseClient';
import {
  PRODUCT_SELECT,
  DataFetchError,
  toProduct,
  type DbProduct,
} from '@/lib/productApi';
import type { Product, ProductCategory } from './types';

export type { Product, ProductCategory } from './types';
export { CATEGORY_LABELS } from './types';

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .order('created_at', { ascending: true });
  if (error) throw new DataFetchError(error.message);
  return (data ?? []).map((p) => toProduct(p as unknown as DbProduct));
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw new DataFetchError(error.message);
  return data ? toProduct(data as unknown as DbProduct) : undefined;
}

export async function getRelatedProducts(product: Product, count = 3): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .eq('category', product.category)
    .order('created_at', { ascending: true });
  if (error) throw new DataFetchError(error.message);
  return (data ?? [])
    .map((p) => toProduct(p as unknown as DbProduct))
    .filter((p) => p.id !== product.id)
    .slice(0, count);
}

export async function getGiftSafeProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .eq('gift_safe', true)
    .order('created_at', { ascending: true });
  if (error) throw new DataFetchError(error.message);
  return (data ?? []).map((p) => toProduct(p as unknown as DbProduct));
}

export function filterProducts(
  list: Product[],
  options: { category?: ProductCategory }
): Product[] {
  if (options.category) return list.filter((p) => p.category === options.category);
  return list;
}

// ===== Hook loading (plan 9.3) =====
import { useEffect, useState } from 'react';

export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

// Satu fetch untuk seluruh katalog (skala kecil), di-cache per sesi modul supaya
// HomePage / ProductsPage / CollectionPage tidak me-refetch berulang saat pindah halaman.
let catalogCache: Product[] | null = null;
let catalogPromise: Promise<Product[]> | null = null;

async function loadCatalog(): Promise<Product[]> {
  if (catalogCache) return catalogCache;
  if (!catalogPromise) {
    catalogPromise = getProducts().then((rows) => {
      catalogCache = rows;
      return rows;
    });
  }
  return catalogPromise;
}

/** Fetch katalog produk dengan loading & error state (9.3). */
export function useProducts(): ProductsState {
  const [state, setState] = useState<ProductsState>({
    products: catalogCache ?? [],
    loading: !catalogCache,
    error: null,
  });

  useEffect(() => {
    let alive = true;
    loadCatalog()
      .then((rows) => {
        if (alive) setState({ products: rows, loading: false, error: null });
      })
      .catch((e: unknown) => {
        if (alive) {
          setState({
            products: [],
            loading: false,
            error: e instanceof Error ? e.message : 'Gagal memuat produk',
          });
        }
      });
    return () => {
      alive = false;
    };
  }, []);

  return state;
}
