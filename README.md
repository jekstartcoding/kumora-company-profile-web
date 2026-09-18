# Kumora — Frontend (Company Profile + Admin Panel)

Frontend Kumora: situs company profile / showcase produk (bantal, kasur, seprai,
guling) yang datanya **dinamis dari Supabase**, plus **admin panel ter-embed di
`/admin`** untuk mengelola katalog dan konten halaman.

> Repo ini (`kumora-company-profile-web`) berdiri sendiri. Backend REST API-nya
> ada di repo terpisah [`kumora-backend`](https://github.com/jekstartcoding/kumora-backend).
> Panduan pemakaian lengkap (untuk admin & pengunjung): lihat [`../USER_GUIDE.md`](../USER_GUIDE.md)
> dan ringkasan whole-project di [`../README.md`](../README.md).

## Arsitektur singkat

```
Pengunjung ──> Frontend (Vercel: kumora.id)
                 │  read publik (katalog, CMS) ──> Supabase (RLS: public read-only)
                 │  login admin ────────────────> Supabase Auth
                 └  /api/admin/* (JWT) ─────────> Backend REST (Render) ──> Supabase (Secret key)
```

- **Read publik** (produk, konten CMS) dilakukan frontend **langsung ke Supabase**
  memakai publishable/anon key — read-only dijamin RLS.
- **Tulis/edit** hanya lewat backend REST dengan JWT admin (middleware `requireAdmin`).
- Admin panel adalah bagian app ini (route `/admin/*`, di-guard sesi Supabase),
  bukan app terpisah — backend murni API-only.

## Tech stack

- React 18 + TypeScript + Vite
- Tailwind CSS (customer) + `admin.css` terpisah (admin, styling ala Filament)
- React Router v6, Framer Motion, Radix UI (accordion), lucide-react
- `@supabase/supabase-js` — **satu client** untuk customer read + admin auth
  (`src/lib/supabaseClient.ts`)
- `axios` — apiClient admin ke backend (base URL absolut, JWT auto-attach)

## Environment variables

Salin `.env.example` ke `.env`:

| Variable | Fungsi |
|---|---|
| `VITE_SUPABASE_URL` | URL project Supabase (wajib) |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Login admin panel (wajib untuk `/admin`) |
| `VITE_SUPABASE_ANON_KEY` | Fallback read customer kalau publishable key kosong |
| `VITE_ADMIN_API_URL` | Base URL backend, tanpa trailing slash (dev: `http://localhost:3000`, prod: URL Render) |

> Vite hanya membake env var berprefix `VITE_` saat build — ubah nilai di
> hosting (Vercel) lalu **redeploy** agar ter-bundle.

## Menjalankan

```bash
npm install
npm run dev        # dev server (default http://localhost:5173)
npm run build      # build produksi ke dist/
npm run preview    # preview hasil build
npm run lint       # ESLint (0 error sebagai gate)
npm run typecheck  # tsc --noEmit
```

Backend harus hidup untuk fitur admin (`/admin`): jalankan repo
`kumora-backend` (`npm run dev`, port 3000) dan isi `VITE_ADMIN_API_URL`.

## Struktur penting

```
src/
├── App.tsx                  # Routing: customer + <Route path="/admin/*">
├── lib/
│   ├── supabaseClient.ts    # SATU client Supabase (publishable, fallback anon)
│   ├── productApi.ts        # PRODUCT_SELECT + mapper DB → tipe Product
│   └── cms.ts               # Getter CMS (hero, showcase, trust, dsb) + useCmsData
├── data/
│   ├── products.ts          # Fetcher katalog async + useProducts (cache per sesi)
│   ├── content.ts           # WHATSAPP_NUMBER, FAQ, formatIDR, generateWhatsAppURL
│   └── archive/             # Data statis lama (snapshot historis, tidak dipakai runtime)
├── pages/                   # Home, About, Collection (/shop/:category), ProductDetail,
│                            # Quiz, FAQ, Contact
├── components/              # Navbar, Layout, Footer, section-section homepage
└── admin/                   # ADMIN PANEL (embedded)
    ├── AdminRoutes.tsx      # /admin/login publik; sisanya di-guard AuthGuard
    ├── layouts/AdminLayout  # Sidebar (Catalog + CMS Section, foldable, minimize)
    ├── lib/apiClient.ts     # axios → ${VITE_ADMIN_API_URL}/api/admin + JWT
    ├── components/          # ResourceTable, ResourceForm, SingletonResourceForm,
    │                        # ImageUploader (produk), CmsImageUploader (cms-images)
    └── resources/           # products, quizOptions, quizMappings, cms (config 14
                             # singleton + 6 list + category-content)
```

## Halaman customer

| Route | Halaman | Sumber data |
|---|---|---|
| `/` | Homepage (8 section) | CMS Supabase (`home_*`) |
| `/about` | About (6 section) | CMS Supabase (`about_*`) |
| `/shop/:category` | Katalog per kategori (pillows/bolsters/beds) | `products` (RLS read) |
| `/product/:slug` | Detail produk + galeri + terkait | `products` + `product_images` + `product_reviews` |
| `/quiz` | Rekomendasi produk 3 langkah | `quiz_options` + `quiz_mappings` (fallback rule) |
| `/faq`, `/contact` | Statis (konten di `src/data/content.ts`) | — |
| `/admin/*` | Admin panel (guard sesi) | Backend API + Supabase Auth |

CTA WhatsApp memakai `WHATSAPP_NUMBER` dari `src/data/content.ts` (satu sumber
kebenaran; seed CMS juga mengekstrak nilai ini).

## Deploy

- **Vercel** (produksi: `https://www.kumora.id`). SPA rewrite untuk deep route
  sudah ada di `vercel.json` (`/(.*) → /index.html`); tanpa itu `/admin`,
  `/shop/*`, dst. akan 404.
- Set semua `VITE_*` di Vercel (Environment Variables) sebelum build.
- Backend-nya di-deploy terpisah ke Render — lihat
  [`backend/docs/DEPLOYMENT.md`](../backend/docs/DEPLOYMENT.md).
- Setelah domain frontend final, tambahkan origin-nya ke `CORS_ORIGINS` di
  backend Render (contoh: `https://www.kumora.id,https://kumora.id`).

## Catatan teknis

- Alias `@` → `./src`.
- Folder `src/data/archive` di-exclude dari typecheck (snapshot bersejarah,
  tipe lama sengaja dipertahankan).
- Warning console `Permissions-Policy` & `[Intervention] Images loaded lazily`
  berasal dari hosting/browser, bukan kode aplikasi.
- RLS: semua policy read `using (true)` tanpa `TO anon`, sehingga read tetap
  bekerja walau browser membawa sesi admin (satu client Supabase).
