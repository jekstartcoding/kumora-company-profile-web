// Fase 7.1 (plan CMS) — utilitas fetch konten CMS dari Supabase (public read via
// RLS, Publishable key). Read jalur langsung ke Supabase — konsisten dengan
// prinsip plan backend: read langsung, write lewat backend Express.
// Setiap getter mengikuti nama yang didefinisikan di plan 7.1.
import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
// Mapper produk resmi — showcase harus melalui toProduct sama seperti katalog
// (ProductCard mengharapkan bentuk mapped: rating, images, variants, dst).
import { PRODUCT_SELECT, toProduct, type DbProduct } from './productApi';
import type { Product } from '@/data/types';

// ============ Types (mengikuti kolom tabel CMS Fase 1) ============

export interface HomeHero {
  hook: string;
  title: string;
  subtitle: string;
  background_image_url: string | null;
  cta_1_text: string;
  cta_1_url: string;
  cta_2_text: string;
  cta_2_url: string;
}

export interface HomeShowcaseSection {
  eyebrow: string;
  title: string;
  subtitle: string;
}

export interface HomePhilosophyTeaser {
  eyebrow: string;
  title: string;
  paragraph_1: string;
  paragraph_2: string;
  link_text: string;
  link_url: string;
  image_url: string | null;
}

export interface HomeTrustSection {
  eyebrow: string;
  title: string;
}

export interface TrustItem {
  id: string;
  icon_name: string;
  title: string;
  description: string;
  order_index: number;
}

export interface HomeCategorySection {
  eyebrow: string;
  title: string;
}

export interface CategoryContent {
  category: 'pillows' | 'bolsters' | 'beds';
  display_name: string;
  description: string;
  tile_image_url: string | null;
  link_text: string;
}

export interface HomeBanner {
  title: string;
  subtitle: string;
  background_image_url: string | null;
}

export interface HomeTestimonialsSection {
  eyebrow: string;
  title: string;
}

export interface Testimonial {
  id: string;
  author_name: string;
  author_location: string;
  rating: number;
  comment: string;
  order_index: number;
}

export interface HomeFinalCta {
  title: string;
  subtitle: string;
  cta_1_text: string;
  cta_1_url: string;
  cta_2_text: string;
  cta_2_url: string;
  cta_3_text: string;
  cta_3_url: string;
}

export interface AboutHero {
  eyebrow: string;
  title: string;
  subtitle: string;
  background_image_url: string | null;
}

export interface AboutStory {
  title: string;
  paragraph_1: string;
  paragraph_2: string;
  image_url: string | null;
}

export interface AboutMilestonesSection {
  eyebrow: string;
  title: string;
}

export interface Milestone {
  id: string;
  counter_number: number;
  year: number;
  title: string;
  description: string;
  order_index: number;
}

export interface AboutVisionMission {
  vision_label: string;
  vision_text: string;
  mission_label: string;
}

export interface MissionItem {
  id: string;
  text: string;
  order_index: number;
}

export interface AboutValuesSection {
  eyebrow: string;
  title: string;
}

export interface AboutValue {
  id: string;
  title: string;
  description: string;
  order_index: number;
}

export interface AboutFinalCta {
  title: string;
  subtitle: string;
  cta_text: string;
  cta_url: string;
}

// ============ Getters (plan 7.1) ============

async function single<T>(table: string): Promise<T> {
  const { data, error } = await supabase.from(table).select('*').eq('id', 1).maybeSingle();
  if (error) throw error;
  return data as T;
}

async function ordered<T>(table: string, orderBy: string = 'order_index'): Promise<T[]> {
  const { data, error } = await supabase.from(table).select('*').order(orderBy);
  if (error) throw error;
  return (data ?? []) as T[];
}

export async function getHomeHero(): Promise<HomeHero> {
  return single<HomeHero>('home_hero');
}

export async function getHomeShowcase(): Promise<{ section: HomeShowcaseSection; products: Product[] }> {
  const [section, rows] = await Promise.all([
    single<HomeShowcaseSection>('home_showcase_section'),
    ordered<{ product_id: string }>('home_showcase_products'),
  ]);
  const ids = rows.map((r) => r.product_id);
  if (ids.length === 0) return { section, products: [] };
  const { data, error } = await supabase.from('products').select(PRODUCT_SELECT).in('id', ids);
  if (error) throw error;
  // Pertahankan urutan sesuai order_index showcase.
  const byId = new Map((data ?? []).map((p) => [(p as { id: string }).id, toProduct(p as unknown as DbProduct)]));
  const products = ids.map((id) => byId.get(id)).filter(Boolean) as Product[];
  return { section, products };
}

export async function getHomePhilosophyTeaser(): Promise<HomePhilosophyTeaser> {
  return single<HomePhilosophyTeaser>('home_philosophy_teaser');
}

export async function getHomeTrust(): Promise<{ section: HomeTrustSection; items: TrustItem[] }> {
  const [section, items] = await Promise.all([
    single<HomeTrustSection>('home_trust_section'),
    ordered<TrustItem>('home_trust_items'),
  ]);
  return { section, items };
}

export async function getCategoryTiles(): Promise<{ section: HomeCategorySection; categories: CategoryContent[] }> {
  // category_content tidak punya order_index (3 row tetap, PK category) —
  // urutkan dengan urutan kanonik pillows/bolsters/beds.
  const CANON = ['pillows', 'bolsters', 'beds'];
  const [section, rows] = await Promise.all([
    single<HomeCategorySection>('home_category_section'),
    ordered<CategoryContent & { category: string }>('category_content' as string, 'category'),
  ]);
  const categories = [...rows].sort((a, b) => CANON.indexOf(a.category) - CANON.indexOf(b.category));
  return { section, categories };
}

export async function getHomeBanner(): Promise<HomeBanner> {
  return single<HomeBanner>('home_banner');
}

export async function getTestimonials(): Promise<{ section: HomeTestimonialsSection; items: Testimonial[] }> {
  // is_published=false tersaring implisit lewat RLS (plan Fase 2).
  const [section, items] = await Promise.all([
    single<HomeTestimonialsSection>('home_testimonials_section'),
    ordered<Testimonial>('testimonials'),
  ]);
  return { section, items };
}

export async function getHomeFinalCta(): Promise<HomeFinalCta> {
  return single<HomeFinalCta>('home_final_cta');
}

export async function getAboutHero(): Promise<AboutHero> {
  return single<AboutHero>('about_hero');
}

export async function getAboutStory(): Promise<AboutStory> {
  return single<AboutStory>('about_story');
}

export async function getAboutMilestones(): Promise<{ section: AboutMilestonesSection; items: Milestone[] }> {
  const [section, items] = await Promise.all([
    single<AboutMilestonesSection>('about_milestones_section'),
    ordered<Milestone>('about_milestones'),
  ]);
  return { section, items };
}

export async function getAboutVisionMission(): Promise<{ vm: AboutVisionMission; missionItems: MissionItem[] }> {
  const [vm, missionItems] = await Promise.all([
    single<AboutVisionMission>('about_vision_mission'),
    ordered<MissionItem>('about_mission_items'),
  ]);
  return { vm, missionItems };
}

export async function getAboutValues(): Promise<{ section: AboutValuesSection; items: AboutValue[] }> {
  const [section, items] = await Promise.all([
    single<AboutValuesSection>('about_values_section'),
    ordered<AboutValue>('about_values'),
  ]);
  return { section, items };
}

export async function getAboutFinalCta(): Promise<AboutFinalCta> {
  return single<AboutFinalCta>('about_final_cta');
}

// ============ Hooks (pola loading sama dengan useProducts) ============

export function useCmsData<T>(fetcher: () => Promise<T>): { data: T | null; loading: boolean; error: string | null } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetcher()
      .then((d) => {
        if (!cancelled) setData(d);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Gagal memuat konten');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error };
}
