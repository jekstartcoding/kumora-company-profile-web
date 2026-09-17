# README - Data Migration Fase 0/1

## Ringkasan Migrasi Data

### Perubahan Utama
- **ProductCategory**: Dari 6 kategori lama (`Bantal`, `Kasur`, `Seprai Penutup`, `Seprai`, `Guling`, `Aksesori`) → 3 kategori baru (`pillows`, `bolsters`, `beds`)
- **Product Interface**: Diperluas dengan 10 field baru, dihapus 2 field (`featured`, `new`) 
- **Semua produk**: Di-migrate ke struktur data baru dengan field wajib terisi

### File yang Diperbarui

#### `src/data/types.ts`
- Tipe baru `ProductCategory` (3 kategori)
- Interface `Product` lengkap dengan semua field baru
- Tipe pembantu: `ProductVariant`, `ProductReview`, `ProductSensorySpec`, `ProductSpecification`
- Konstanta: `CATEGORY_LABELS`

#### `src/data/products.ts`
- Semua produk (12 total) di-migrate dengan struktur baru
- Field baru terisi untuk SEMUA produk
- Kategori dipetakan sesuai keputusan bisnis:
  - `Bantal` → `pillows` (3 produk)
  - `Guling` → `bolsters` (2 produk)
  - `Kasur` → `beds` (3 produk)
  - `Seprai Penutup` & `Seprai` → `beds` (dengan tags "cover" & "sheet") (4 produk)
  - `Aksesori` → tidak ada produk existing yang perlu dipetakan

### Field yang Dihapus (Non-Features)
- `featured: boolean` → dihapus total
- `new: boolean` → dihapus total

### Field yang Ditambahkan (Wajib di Fase 1)
- `variants: ProductVariant[]` (minimal 1 per produk)
- `sensoryDescriptor: string` (deskripsi sensorik untuk Collection)
- `sensorySpec: { firmnessRating: number; fillMaterial: string; fillWeightEquivalent: string }`
- `deliveryEstimate: string` (contoh: "3-5 hari kerja (Jabodetabek)")
- `returnPolicyText: string` (teks kebijakan return/trial)
- `giftSafe: { isSafe: boolean; note?: string }`
- `brandStoryLine: string` (story konsisten di semua PDP)
- `lifestyleImages: string[]` (dipisah dari texture)
- `textureImages: string[]` (wajib minimal 1)
- `reviews: ProductReview[]` (diperluas dengan sleepPosition & bodyType)

### Utilitas yang Diperbarui

#### Ditambahkan:
- `getGiftSafeProducts(): Product[]` → helper untuk produk yang aman dijadikan hadiah
- `src/data/quiz.ts` → definisi langkah quiz, `QuizAnswer`, dan rule-based `matchQuizToProduct()` dengan fallback deterministik

#### Diperbarui:
- `getProductBySlug()` → mengembalikan tipe Product baru
- `getRelatedProducts()` → filter by kategori baru
- `filterProducts()` → disederhanakan (hanya filter by category, tidak ada search)

#### Dihapus:
- `getFeaturedProducts()` → dihapus (konsep "featured" dihilangkan)
- `sortProducts()` → dihapus (Collection baru tidak ada sorting)

### Ringkasan Data Per Kategori

| Kategori Baru | Jumlah Produk | Tags yang Mungkin |
|---------------|---------------|------------------|
| `pillows`      | 3             | (tiada tags) |
| `bolsters`    | 2             | (tiada tags) |
| `beds`         | 7             | `cover` (2 produk), `sheet` (2 produk) |

### Persiapan untuk Fase Berikutnya

#### Fase 2 (Navigasi):
- Bottom nav dengan 4 item: Home / Shop / Quiz / About
- FAQ & Contact dipindahkan ke footer (tetap sebagai route terpisah)

#### Fase 3 (Collection Page):
- `/shop/pillows`, `/shop/bolsters`, `/shop/beds` (3 route)
- 2-4 produk per kategori
- Tidak ada filter/sort/harga/rating di UI

#### Fase 4 (Product Detail Page):
- 7 content blocks wajib:
  1. Product Gallery
  2. Product Texture Gallery
  3. SensorySpecBlock
  4. DeliveryEstimateBadge
  5. ReturnPolicyBlock
  6. GiftToggle
  7. BrandStoryLine
- Sticky WhatsAppCTA (menggantikan cart & "Beli Sekarang")

#### Fase 5 (WhatsApp Generator):
- 3 template: "standard", "gift", "quiz"
- Satu fungsi generator terpusat

#### Fase 6 (Quiz):
- 2-3 steps quiz (tap-only, tanpa email)
- Skip functionality (kembali ke Shop)
- Result → one product recommendation + GiftToggle + WhatsApp CTA

### Hasil Validation

#### TypeScript
```bash
npm run typecheck
# ✅ Sukses - tidak ada error terkait Product/ProductCategory
```

#### Validasi Fase 1
- [x] Tidak ada cart/checkout state pada data model
- [x] Utilitas data `filterProducts` hanya menerima kategori
- [x] Pemanggil lama diperbarui agar kompatibel dengan kategori baru
- [x] 6 kategori lama → 3 kategori baru
- [x] Field wajib terisi untuk SEMUA produk
- [x] Utils diperbarui (getFeaturedProducts/sortProducts dihapus)

### Checklist Persiapan

#### Data Team:
- [x] Semua field baru diisi untuk 12 produk
- [x] Varians dibuat dari spesifikasi lama
- [x] Reviews diperluas dengan context tags
- [x] Kategori Aksesori diaudit; tidak ada produk existing dalam kategori tersebut

#### Development Team:
- [x] Interface baru dikonfirmasi sebelum Fase 1
- [x] Utils yang dihapus diverifikasi tidak dipakai di codebase
- [x] Category mapping diaudit (tidak ada produk tersisa di "Aksesori")

### Status: ✅ PHASE 1 DATA MIGRATION COMPLETE

Semua 12 produk dimigrasikan, field wajib terisi, utilitas data diperbarui, dan typecheck/lint berhasil. Perubahan UI Collection dan navigasi tetap menjadi pekerjaan fase berikutnya.