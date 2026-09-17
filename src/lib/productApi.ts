// Fase 9.2 — Mapper & konstanta query Supabase → bentuk `Product` frontend.
// TIPES frontend tidak berubah bentuk (9.2) — konsumen tetap menerima bentuk
// `Product` dari types.ts. Utilitas bernama (filterProducts, getProductBySlug,
// getRelatedProducts, getGiftSafeProducts) ada di src/data/products.ts, kini async.
//   - rating/reviewCount dihitung live dari rows product_reviews
//   - shortDescription di-derive dari sensory_descriptor (keputusan user Fase 9)
//   - specifications dihapus dari tipe (tidak pernah dipakai komponen UI mana pun)
//   - id bertipe string (UUID dari DB), bukan number
//   - images = lifestyle dulu lalu texture (array asli statis selalu pola ini)
import type { Product, ProductCategory, ProductVariant } from '@/data/types';

interface DbImage { url: string; image_type: 'lifestyle' | 'texture'; order_index: number }
interface DbVariant { id: string; label: string; price: number; is_default: boolean | null }
interface DbReview {
  id: string;
  author: string;
  rating: number;
  comment: string;
  sleep_position: string | null;
  body_type: string | null;
}
export interface DbProduct {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  tags: string[] | null;
  price: number;
  sensory_descriptor: string;
  firmness_rating: number;
  fill_material: string;
  fill_weight_equivalent: string;
  delivery_estimate: string;
  return_policy_text: string;
  gift_safe: boolean | null;
  gift_safe_note: string | null;
  brand_story_line: string;
  description: string;
  product_images: DbImage[] | null;
  product_variants: DbVariant[] | null;
  product_reviews: DbReview[] | null;
}

export const PRODUCT_SELECT = `*,
  product_images ( url, image_type, order_index ),
  product_variants ( id, label, price, is_default ),
  product_reviews ( id, author, rating, comment, sleep_position, body_type )`;

export class DataFetchError extends Error {}

// Mapper DB → bentuk `Product` yang dipakai seluruh komponen.
export function toProduct(p: DbProduct): Product {
  const lifestyle = (p.product_images ?? [])
    .filter((i) => i.image_type === 'lifestyle')
    .sort((a, b) => a.order_index - b.order_index)
    .map((i) => i.url);
  const texture = (p.product_images ?? [])
    .filter((i) => i.image_type === 'texture')
    .sort((a, b) => a.order_index - b.order_index)
    .map((i) => i.url);

  const reviews = (p.product_reviews ?? []).map((r) => ({
    id: r.id,
    author: r.author,
    rating: r.rating,
    comment: r.comment,
    sleepPosition: (r.sleep_position ?? undefined) as Product['reviews'][number]['sleepPosition'],
    bodyType: (r.body_type ?? undefined) as Product['reviews'][number]['bodyType'],
  }));
  const reviewCount = reviews.length;
  const rating = reviewCount
    ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviewCount) * 10) / 10
    : 0;

  const variants: ProductVariant[] = (p.product_variants ?? []).map((v) => ({
    id: v.id,
    label: v.label,
    price: Number(v.price),
    isDefault: v.is_default ?? false,
  }));

  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category,
    tags: (p.tags ?? []) as Product['tags'],
    price: Number(p.price),
    // Derive (keputusan user Fase 9): kalimat pertama sensory_descriptor sebagai
    // pengganti shortDescription — diakhiri titik, di-cap 140 karakter.
    shortDescription: deriveShortDescription(p.sensory_descriptor),
    description: p.description,
    images: [...lifestyle, ...texture],
    rating,
    reviewCount,
    variants,
    sensoryDescriptor: p.sensory_descriptor,
    sensorySpec: {
      firmnessRating: p.firmness_rating,
      fillMaterial: p.fill_material,
      fillWeightEquivalent: p.fill_weight_equivalent,
    },
    deliveryEstimate: p.delivery_estimate,
    returnPolicyText: p.return_policy_text,
    giftSafe: p.gift_safe ? { isSafe: true, note: p.gift_safe_note ?? undefined } : { isSafe: false },
    brandStoryLine: p.brand_story_line,
    lifestyleImages: lifestyle,
    textureImages: texture,
    reviews,
  };
}

export function deriveShortDescription(sensoryDescriptor: string): string {
  const first = sensoryDescriptor.split(/(?<=[.!?])\s/)[0] ?? sensoryDescriptor;
  return first.length > 140 ? `${first.slice(0, 137).trimEnd()}…` : first;
}
