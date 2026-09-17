// ===== TIPE KATEGORI PRODUK BARU (3 kategori) =====

export type ProductCategory = "pillows" | "bolsters" | "beds";

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  pillows: "Pillows",
  bolsters: "Bolsters",
  beds: "Beds",
};

// ===== VARIAN PRODUK =====

export interface ProductVariant {
  id: string;
  label: string;        // contoh: "Firm — 60x40cm"
  price: number;
  isDefault?: boolean;
}

// ===== REVIEW PRODUK (diperluas) =====

export interface ProductReview {
  id: number;
  author: string;
  rating: number;
  comment: string;
  sleepPosition?: "Terlentang" | "Menyamping" | "Tengkurap"; // BARU — context tag
  bodyType?: "Ringan" | "Sedang" | "Berat";                  // BARU — context tag
}

// ===== SPESIFIKASI SENSORIK =====

export interface ProductSensorySpec {
  firmnessRating: number;             // skala 1-5, untuk visual firmness scale di PDP
  fillMaterial: string;
  fillWeightEquivalent: string;       // contoh: "setara 2kg kapas premium"
}

export interface ProductSpecification {
  label: string;
  value: string;
}

// ===== INTERFACE PRODUK FINAL =====

export interface Product {
  // Field yang dipertahankan
  id: number;
  slug: string;
  name: string;
  category: ProductCategory;
  tags?: ("cover" | "sheet")[];
  price: number;
  shortDescription: string;
  description: string;
  images: string[];
  rating: number;
  reviewCount: number;

  // Field yang dihapus dari tampilan (boleh tetap ada untuk keperluan internal)
  // featured: boolean; (dihapus per spec)
  // new: boolean; (dihapus per spec)

  // Field baru yang wajib (data yang perlu diisi di Fase 1)
  variants: ProductVariant[];           // BARU — wajib, setiap produk minimal 1 variant
  sensoryDescriptor: string;            // BARU — satu baris deskriptor sensorik untuk Collection page
  sensorySpec: ProductSensorySpec;      // BARU — firmness, fillMaterial, fillWeightEquivalent
  deliveryEstimate: string;             // BARU — contoh: "3-5 hari kerja (Jabodetabek)"
  returnPolicyText: string;             // BARU — teks kebijakan return/trial, tampil langsung di PDP
  giftSafe?: {
    isSafe: boolean;
    note?: string;                      // contoh: "Pilihan aman untuk hadiah — ukuran universal"
  };
  brandStoryLine: string;               // BARU — satu baris brand story, konsisten di semua PDP
  lifestyleImages: string[];            // BARU — dipisah dari texture
  textureImages: string[];              // BARU — wajib minimal 1, "menggantikan sentuhan"

  // Spesifikasi teknis yang dipertahankan
  specifications: ProductSpecification[];

  // Review yang diperluas
  reviews: ProductReview[];
}

// ===== KONSTANTA =====

