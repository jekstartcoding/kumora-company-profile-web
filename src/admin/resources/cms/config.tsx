// Fase 5.3/6.1/6.2 (plan CMS) — config seluruh resource CMS.
// mode "singleton" → dirender SingletonResourceForm (langsung edit, tanpa list).
// mode "list" → ResourceTable + form modal (tambah/edit/hapus/reorder).
// endpoint = path di bawah /api/admin (apiClient menambah base URL + JWT).
import type { FormFieldConfig, ResourceConfig, ResourceColumn } from '../types';

type AnyConfig = ResourceConfig<Record<string, unknown>>;

const f = (
  key: string,
  label: string,
  type: FormFieldConfig['type'] = 'text',
  extra: Partial<FormFieldConfig> = {}
): FormFieldConfig => ({ key, label, type, ...extra });

// ============ HOMEPAGE — SINGLETON (8) ============

const homeHero: AnyConfig = {
  name: 'Home Hero',
  endpoint: '/cms/home-hero',
  mode: 'singleton',
  formFields: [
    f('hook', 'Hook (eyebrow text)'),
    f('title', 'Title'),
    f('subtitle', 'Subtitle', 'textarea'),
    f('background_image_url', 'Background Image', 'image-upload'),
    f('cta_1_text', 'CTA 1 — Text'),
    f('cta_1_url', 'CTA 1 — URL', 'text', { helpText: 'Path relatif (/shop/pillows) atau URL lengkap https://' }),
    f('cta_2_text', 'CTA 2 — Text'),
    f('cta_2_url', 'CTA 2 — URL', 'text', { helpText: 'Path relatif atau URL lengkap https://wa.me/…' }),
  ],
};

const homeShowcaseSection: AnyConfig = {
  name: 'Showcase Produk — Section',
  endpoint: '/cms/home-showcase-section',
  mode: 'singleton',
  formFields: [f('eyebrow', 'Eyebrow'), f('title', 'Title'), f('subtitle', 'Subtitle', 'textarea')],
};

const homePhilosophyTeaser: AnyConfig = {
  name: 'Filosofi (Teaser)',
  endpoint: '/cms/home-philosophy-teaser',
  mode: 'singleton',
  formFields: [
    f('eyebrow', 'Eyebrow'),
    f('title', 'Title'),
    f('paragraph_1', 'Paragraf 1', 'textarea'),
    f('paragraph_2', 'Paragraf 2', 'textarea'),
    f('link_text', 'Link — Text'),
    f('link_url', 'Link — URL', 'text', { helpText: 'Path relatif (/about) atau URL lengkap' }),
    f('image_url', 'Image', 'image-upload'),
  ],
};

const homeTrustSection: AnyConfig = {
  name: 'Trust Strip — Section',
  endpoint: '/cms/home-trust-section',
  mode: 'singleton',
  formFields: [f('eyebrow', 'Eyebrow'), f('title', 'Title')],
};

const homeCategorySection: AnyConfig = {
  name: 'Kategori (Tiles) — Section',
  endpoint: '/cms/home-category-section',
  mode: 'singleton',
  formFields: [f('eyebrow', 'Eyebrow'), f('title', 'Title')],
};

const homeBanner: AnyConfig = {
  name: 'Banner',
  endpoint: '/cms/home-banner',
  mode: 'singleton',
  formFields: [f('title', 'Title'), f('subtitle', 'Subtitle', 'textarea'), f('background_image_url', 'Background Image', 'image-upload')],
};

const homeTestimonialsSection: AnyConfig = {
  name: 'Testimoni — Section',
  endpoint: '/cms/home-testimonials-section',
  mode: 'singleton',
  formFields: [f('eyebrow', 'Eyebrow'), f('title', 'Title')],
};

const homeFinalCta: AnyConfig = {
  name: 'CTA Akhir — Homepage',
  endpoint: '/cms/home-final-cta',
  mode: 'singleton',
  formFields: [
    f('title', 'Title'),
    f('subtitle', 'Subtitle', 'textarea'),
    f('cta_1_text', 'CTA 1 — Text'),
    f('cta_1_url', 'CTA 1 — URL'),
    f('cta_2_text', 'CTA 2 — Text'),
    f('cta_2_url', 'CTA 2 — URL'),
    f('cta_3_text', 'CTA 3 — Text'),
    f('cta_3_url', 'CTA 3 — URL', 'text', { helpText: 'URL lengkap https://wa.me/… untuk CTA WhatsApp' }),
  ],
};

// ============ ABOUT — SINGLETON (6) ============

const aboutHero: AnyConfig = {
  name: 'About Hero',
  endpoint: '/cms/about-hero',
  mode: 'singleton',
  formFields: [
    f('eyebrow', 'Eyebrow'),
    f('title', 'Title'),
    f('subtitle', 'Subtitle', 'textarea'),
    f('background_image_url', 'Background Image', 'image-upload'),
  ],
};

const aboutStory: AnyConfig = {
  name: 'Brand Story',
  endpoint: '/cms/about-story',
  mode: 'singleton',
  formFields: [f('title', 'Title'), f('paragraph_1', 'Paragraf 1', 'textarea'), f('paragraph_2', 'Paragraf 2', 'textarea'), f('image_url', 'Image', 'image-upload')],
};

const aboutMilestonesSection: AnyConfig = {
  name: 'Milestones — Section',
  endpoint: '/cms/about-milestones-section',
  mode: 'singleton',
  formFields: [f('eyebrow', 'Eyebrow'), f('title', 'Title')],
};

const aboutVisionMission: AnyConfig = {
  name: 'Visi & Misi',
  endpoint: '/cms/about-vision-mission',
  mode: 'singleton',
  formFields: [
    f('vision_label', 'Label Visi'),
    f('vision_text', 'Teks Visi', 'textarea'),
    f('mission_label', 'Label Misi'),
  ],
};

const aboutValuesSection: AnyConfig = {
  name: 'Nilai Utama — Section',
  endpoint: '/cms/about-values-section',
  mode: 'singleton',
  formFields: [f('eyebrow', 'Eyebrow'), f('title', 'Title')],
};

const aboutFinalCta: AnyConfig = {
  name: 'CTA Akhir — About',
  endpoint: '/cms/about-final-cta',
  mode: 'singleton',
  formFields: [f('title', 'Title'), f('subtitle', 'Subtitle', 'textarea'), f('cta_text', 'CTA — Text'), f('cta_url', 'CTA — URL')],
};

// ============ LIST / REPEATER (6) ============

const showcaseProducts: AnyConfig = {
  name: 'Showcase Produk',
  endpoint: '/cms/showcase-products',
  mode: 'list',
  columns: [
    { key: 'order_index', label: '#' },
    { key: 'product_id', label: 'Product ID' },
  ],
  formFields: [f('product_id', 'Product ID (uuid dari resource Products)', 'text', { helpText: 'ID produk dari menu Products — nanti diganti dropdown pencarian' })],
};

const trustItems: AnyConfig = {
  name: 'Trust Items',
  endpoint: '/cms/trust-items',
  mode: 'list',
  columns: [
    { key: 'order_index', label: '#' },
    { key: 'icon_name', label: 'Ikon' },
    { key: 'title', label: 'Judul' },
    { key: 'description', label: 'Deskripsi' },
  ],
  formFields: [f('icon_name', 'Nama Ikon (lucide)', 'text', { helpText: 'mis. layers, heart, sparkles, headphones' }), f('title', 'Judul'), f('description', 'Deskripsi', 'textarea')],
};

const testimonials: AnyConfig = {
  name: 'Testimoni',
  endpoint: '/cms/testimonials',
  mode: 'list',
  columns: [
    { key: 'order_index', label: '#' },
    { key: 'author_name', label: 'Nama' },
    { key: 'author_location', label: 'Lokasi' },
    { key: 'rating', label: 'Rating' },
    { key: 'comment', label: 'Komentar' },
    { key: 'is_published', label: 'Publik' },
  ],
  formFields: [
    f('author_name', 'Nama'),
    f('author_location', 'Lokasi'),
    f('rating', 'Rating (1–5)', 'number', { min: 1, max: 5 }),
    f('comment', 'Komentar', 'textarea'),
    f('is_published', 'Publik', 'toggle', { helpText: 'Aktif = tampil di situs customer' }),
  ],
};

const milestones: AnyConfig = {
  name: 'Milestones',
  endpoint: '/cms/milestones',
  mode: 'list',
  columns: [
    { key: 'order_index', label: '#' },
    { key: 'counter_number', label: 'Counter' },
    { key: 'year', label: 'Tahun' },
    { key: 'title', label: 'Judul' },
    { key: 'description', label: 'Deskripsi' },
  ],
  formFields: [f('counter_number', 'Angka Counter', 'number'), f('year', 'Tahun', 'number'), f('title', 'Judul'), f('description', 'Deskripsi', 'textarea')],
};

const missionItems: AnyConfig = {
  name: 'Mission Items',
  endpoint: '/cms/mission-items',
  mode: 'list',
  columns: [
    { key: 'order_index', label: '#' },
    { key: 'text', label: 'Teks Misi' },
  ],
  formFields: [f('text', 'Teks Misi', 'textarea')],
};

const values: AnyConfig = {
  name: 'Nilai Utama',
  endpoint: '/cms/values',
  mode: 'list',
  columns: [
    { key: 'order_index', label: '#' },
    { key: 'title', label: 'Nilai' },
    { key: 'description', label: 'Deskripsi' },
  ],
  formFields: [f('title', 'Nilai'), f('description', 'Deskripsi', 'textarea')],
};

// ============ CATEGORY CONTENT (kasus khusus 6.3) ============
// Bukan singleton murni & bukan repeater: 3 row tetap (pillows/bolsters/beds),
// PATCH per kategori — UI: 3 kartu berdampingan, tanpa tambah/hapus kategori.

export interface CategoryContentConfig {
  name: string;
  endpoint: string;
  mode: 'category-content';
  categories: { category: string; label: string }[];
  fields: FormFieldConfig[];
}

export const categoryContent: CategoryContentConfig = {
  name: 'Kategori (Tiles)',
  endpoint: '/cms/category-content',
  mode: 'category-content',
  categories: [
    { category: 'pillows', label: 'Pillows' },
    { category: 'bolsters', label: 'Bolsters' },
    { category: 'beds', label: 'Beds' },
  ],
  fields: [
    f('display_name', 'Display Name'),
    f('description', 'Deskripsi', 'textarea'),
    f('tile_image_url', 'Tile Image', 'image-upload'),
    f('link_text', 'Link Text'),
  ],
};

// ============ Struktur sidebar (plan 5.1) ============

export interface CmsNavGroup {
  label: string;
  items: { slug: string; label: string }[];
}

export const CMS_NAV: {
  homepage: CmsNavGroup;
  about: CmsNavGroup;
} = {
  homepage: {
    label: 'Homepage',
    items: [
      { slug: 'home-hero', label: 'Hero' },
      { slug: 'showcase-products', label: 'Showcase Produk' },
      { slug: 'home-showcase-section', label: 'Showcase — Section' },
      { slug: 'home-philosophy-teaser', label: 'Filosofi (Teaser)' },
      { slug: 'trust-items', label: 'Trust Strip' },
      { slug: 'home-trust-section', label: 'Trust Strip — Section' },
      { slug: 'category-content', label: 'Kategori (Tiles)' },
      { slug: 'home-category-section', label: 'Kategori — Section' },
      { slug: 'home-banner', label: 'Banner' },
      { slug: 'testimonials', label: 'Testimoni' },
      { slug: 'home-testimonials-section', label: 'Testimoni — Section' },
      { slug: 'home-final-cta', label: 'CTA Akhir' },
    ],
  },
  about: {
    label: 'About',
    items: [
      { slug: 'about-hero', label: 'Hero' },
      { slug: 'about-story', label: 'Brand Story' },
      { slug: 'milestones', label: 'Milestones' },
      { slug: 'about-milestones-section', label: 'Milestones — Section' },
      { slug: 'about-vision-mission', label: 'Visi & Misi' },
      { slug: 'mission-items', label: 'Mission Items' },
      { slug: 'values', label: 'Nilai Utama' },
      { slug: 'about-values-section', label: 'Nilai Utama — Section' },
      { slug: 'about-final-cta', label: 'CTA Akhir' },
    ],
  },
};

export const CMS_SINGLETON_CONFIGS: Record<string, AnyConfig> = Object.fromEntries(
  [homeHero, homeShowcaseSection, homePhilosophyTeaser, homeTrustSection, homeCategorySection, homeBanner, homeTestimonialsSection, homeFinalCta, aboutHero, aboutStory, aboutMilestonesSection, aboutVisionMission, aboutValuesSection, aboutFinalCta].map((c) => [c.endpoint.split('/').pop()!, c])
);

export const CMS_LIST_CONFIGS: Record<string, AnyConfig> = Object.fromEntries(
  [showcaseProducts, trustItems, testimonials, milestones, missionItems, values].map((c) => [c.endpoint.split('/').pop()!, c])
);

export type { ResourceColumn };
