# src/data — sumber data

- `types.ts` — tipe `Product` dan tipe terkait. Bentuk tidak berubah sejak Fase 9
  (plan backend 9.2), kecuali: `id` → string UUID (dari database) dan interface
  `ProductSpecification` dihapus (lihat catatan di file).
- `quiz.ts` — **arsip seed quiz lama** (statis). Quiz runtime kini dari Supabase
  (`src/lib/quizApi.ts`); file ini tidak dipakai runtime lagi.
- `archive/products.ts` — **arsip seed data produk lama** (statis, 12 produk asli).
  Data ini sudah di-seed ke Supabase lewat `backend/scripts/seed-products.ts`
  (repo kumora-backend) dan TIDAK dipakai runtime lagi (deliverable 9.4).
  Runtime memfetch dari Supabase via `src/lib/productApi.ts`.

Riwayat migrasi data Fase 0/1 (kategori 6 → 3, field wajib, dsb) ada di git history
untuk file ini.
