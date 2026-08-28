# Kumora — Frontend Showcase

> A small e-commerce frontend demo for a sleep & bedding brand (Kumora).

## Ringkasan

Proyek ini adalah aplikasi frontend berbasis React + TypeScript yang menyajikan katalog produk (bantal, kasur, seprai, guling, dsb.) lengkap dengan halaman produk, halaman daftar, FAQ, dan kontak (WhatsApp). Data produk disimpan secara lokal di dalam proyek sehingga cocok sebagai prototype atau starter storefront.

## Fitur utama

- Tampilan homepage dengan produk unggulan dan testimoni
- Halaman daftar produk dengan filter dan sorting
- Halaman detail produk dengan spesifikasi dan produk terkait
- Halaman statis: About, FAQ, Contact
- Integrasi cepat untuk tombol WhatsApp (prebuilt message)

## Tech stack

- React 18
- TypeScript
- Vite (dev server & build)
- Tailwind CSS (utility-first styling)
- React Router (routing) — `react-router-dom`
- Supabase client hadir sebagai dependency (`@supabase/supabase-js`) untuk integrasi backend bila diperlukan
- Ikon: `lucide-react`

Konfigurasi dan build tools:

- `vite` (bundler/dev server)
- `eslint` + related plugins

## Quick start

1. Pasang dependensi:

```bash
npm install
```

2. Menjalankan mode development:

```bash
npm run dev
```

3. Membuat build produksi:

```bash
npm run build
```

4. Menjalankan preview hasil build:

```bash
npm run preview
```

Tambahan:

- `npm run lint` — jalankan ESLint
- `npm run typecheck` — jalankan TypeScript type check

## Struktur proyek (ringkasan)

- [src](src)
  - [main.tsx](src/main.tsx) — entry point
  - [App.tsx](src/App.tsx) — routing aplikasi
  - [data/products.ts](src/data/products.ts) — sumber data produk, utilitas format, dan helper WhatsApp
  - [components](src/components) — komponen UI (Navbar, Layout, ProductCard, dll.)
  - [pages](src/pages) — halaman aplikasi (Home, Products, ProductDetail, About, FAQ, Contact)
- [vite.config.ts](vite.config.ts) — konfigurasi Vite
- [tailwind.config.js](tailwind.config.js) — konfigurasi Tailwind
- [package.json](package.json) — script & dependensi

Lihat file-file kunci: [src/data/products.ts](src/data/products.ts), [src/App.tsx](src/App.tsx), dan [src/components/Layout.tsx](src/components/Layout.tsx).

## Data & Penyesuaian

- Data produk terletak di [src/data/products.ts](src/data/products.ts). Anda dapat menambah, mengedit, atau mengganti sumber data dengan API nyata.
- Nomor WhatsApp default ditetapkan di konstanta `WHATSAPP_NUMBER` dalam file data, gunakan fungsi `generateWhatsAppMessage` / `generateWhatsAppURL` untuk menyesuaikan pesan atau format.

## Rekomendasi deploy

- Aplikasi ini cocok dideploy ke layanan static hosting seperti Vercel, Netlify, atau GitHub Pages (build statis dari `npm run build`). Jika membutuhkan backend (checkout, penyimpanan produk dinamis), pertimbangkan Supabase atau API server terpisah.

## Catatan pengembang

- Proyek memakai alias `@` yang dikonfigurasikan di `vite.config.ts` (mengarah ke `./src`).
- `lucide-react` dikecualikan dari `optimizeDeps` di Vite config — bila ada masalah bundle, periksa opsi ini.

## Kontribusi

Silakan buka issue atau kirim pull request. Jika menambah fitur baru, sertakan langkah menjalankan dan (jika ada) tes yang relevan.

## Lisensi

Tidak ada lisensi yang ditentukan di repo. Tambahkan file `LICENSE` jika ingin menyatakan lisensi eksplisit.

---

Jika Anda mau, saya bisa:
- Menambahkan contoh environment file untuk integrasi Supabase
- Mengubah data statis menjadi panggilan API mock
- Menyusun checklist deploy (Vercel/Netlify)