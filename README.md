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

## Halaman Aplikasi

### Homepage (Halaman Utama)

Halaman utama menampilkan kisah merek Kumora dan menampilkan produk-produk unggulan terbaru. Dengan visual yang menarik dan foto produk berkualitas tinggi, halaman ini memberikan kesan pertama yang kuat kepada pengunjung.

**Komponen Utama:**
- `HeroSection` — bagian tampilan atas dengan judul dan subjudul yang menarik perhatian
- `FeaturedSection` — menampilkan produk-produk unggulan terbaru (diambil dari data melalui `getFeaturedProducts()`)
- `AboutSection` — memperkenalkan merek dengan ringkasan singkat dan CTA ke halaman About
- `WhySection` — menampilkan prinsip utama yang menjadi landasan kualitas Kumora (Bahan Terpilih, Kenyamanan Sehari-hari, Kualitas yang Terasa, Layanan Personal)
- `CategorySection` — menampilkan kategori-kategori produk (Bantal, Kasur, Seprai Penutup, Seprai, Guling, Aksesori) yang masing-masing menampilkan ikon dan deskripsi
- `StatementSection` — bagian pernyataan visi dan misi yang menggarisbawahi komitmen Kumora
- `TestimonialSection` — menampilkan ulasan pelanggan untuk membangun kepercayaan
- `FinalCTA` — bagian ajakan bertindak terakhir yang mengarahkan pengunjung untuk menjelajahi semua produk

**Teknologi yang Digunakan:**
- Menggunakan Framer Motion untuk animasi yang halus dan interaktif
- Menggunakan Radix UI untuk komponen Accordion (di halaman FAQ)
- Mengatur tampilan dengan Tailwind CSS untuk tata letak responsif dan gaya yang konsisten
- Menggunakan React Router untuk navigasi antar halaman
- Menggunakan TypeScript untuk tipe keamanan yang ketat

**Responsivitas:**
- Tampilan homepage dioptimalkan untuk desktop, tablet, dan perangkat seluler
- Menggulir halaman yang lancar dengan bagian yang terisolasi
- Elemen dapat diakses oleh semua pengguna

### Halaman Produk

Halaman produk menampilkan katalog lengkap produk-produk Kumora dengan sistem filter dan sorting yang canggih, memungkinkan pengunjung menjelajahi dan menemukan produk yang mereka cari dengan mudah.

**Fitur Utama:**
- **Sistem Filter:** Filter berdasarkan kategori produk (Bantal, Kasur, Seprai Penutup, Seprai, Guling, Aksesori) dan pencarian teks yang dapat mencari berdasarkan nama produk, kategori, dan deskripsi.
- **Sorting:** Dukungan untuk sorting berdasarkan produk unggulan, produk terbaru, harga terendah, dan harga tertinggi.
- **Tampilan Grid:** Tampilan kartu produk responsif yang menampilkan gambar, nama, harga, rating, dan indikator produk baru/unggulan.
- **Paginasi:** Navigasi halaman yang efisien untuk pengalaman menjelajah yang lebih baik (jika produk bertambah banyak).
- **URL Ramah:** Mencerminkan status filter dalam URL (misalnya `?category=Bantal`) untuk SEO dan pengalaman berbagi yang lebih baik.

**Dukungan Pengalaman Pengguna:**
- Tampilan daftar produk yang terorganisir dan mudah dipahami
- Komponen Rating untuk menampilkan kualitas produk secara visual
- Ikon pencarian dan filter yang jelas dan mudah digunakan
- Efek hover dan animasi halus untuk interaksi yang lebih baik
- Pesan yang jelas ketika tidak ada produk yang cocok ditemukan

**Aksesibilitas:**
- Antarmuka yang ramah keyboard untuk navigasi
- Label ARIA yang tepat untuk status filter dan hasil
- Kontras warna yang sesuai dengan norma WCAG untuk keterbacaan

### Halaman Detail Produk

Halaman detail produk menampilkan katalog lengkap produk-produk Kumora dengan sistem filter dan sorting yang canggih, memungkinkan pengunjung menjelajahi dan menemukan produk yang mereka cari dengan mudah.

**Fitur Utama:**
- **Galeri Gambar:** Gallery gambar tampilan utama yang dapat diklik dengan galeri thumbnail di bawahnya, memungkinkan pengunjung melihat produk dari berbagai sudut.
- **Spesifikasi Produk:** Daftar lengkap spesifikasi produk (bahan, ukuran, berat, warna, garansi) untuk informasi yang detail dan transparan.
- **Peringkat & Ulasan:** Komponen Rating yang menampilkan penilaian bintang dan jumlah ulasan untuk menunjukkan kualitas produk.
- **Produk Terkait:** Rekomendasi produk terkait yang memungkinkan pengunjung menjelajahi opsi lain yang mungkin menarik bagi mereka.
- **Integrasi WhatsApp:** Tombol WhatsApp yang dapat langsung terhubung ke layanan pelanggan untuk pertanyaan atau pemesanan.
- **Tombol Aksi:** Tombol "Tambah ke Keranjang" dan "Beli Sekarang" yang memungkinkan pengunjung melakukan pembelian langsung.
- **Breadcrumb:** Navigasi yang membantu pengunjung melacak lokasi mereka dalam struktur situs.

**Pengalaman Pengguna yang Mulus:**
- Transisi animasi halus ketika berpindah antara halaman detail produk
- Tampilan harga yang jelas dan terformat dalam mata uang Indonesia (IDR)
- Efek hover dan interaksi mikro untuk meningkatkan pengalaman pengguna
- Kontrol navigasi yang intuitif (kembali, tautan produk terkait)
- Struktur yang jelas dan hierarkis untuk kemudahan membaca

**Optimisasi SEO:**
- Tag meta title dan description yang dioptimalkan untuk setiap produk
- URL ramah pencarian berdasarkan slug produk
- Data terstruktur JSON-LD (jika ditambahkan) untuk meningkatkan visibilitas pencarian

### Halaman About

Halaman About menceritakan kisah Kumora, menampilkan visi, misi, nilai-nilai inti, dan pencapaian yang telah diraih sepanjang perjalanan.

**Bagian yang Ada:**
- **Bagian Hero:** Latar belakang yang menarik dengan gambar interior kamar tidur elegan, menampilkan judul "Kumora: Dirancang untuk Istirahat yang Lebih Baik"
- **Cerita Kami:** Cerita asal-usul Kumora, perjalanan dari koleksi bantal kecil hingga merek perlengkapan kamar tidur lengkap, sambil mempertahankan prinsip awal: menjadikan istirahat sehari-hari lebih baik.
- **Timeline:** Chronologi pencapaian perusahaan yang menampilkan momen-momen penting dalam perjalanan Kumora.
- **Visi & Misi:** Visi yang jelas (menjadi nama terpercaya dalam kenyamanan tidur dan kamar sehari-hari) dan empat misi yang menjadi panduan operasional (menciptakan produk tidur yang nyaman dan dapat diandalkan, terus meningkatkan bahan dan desain produk, memberikan pengalaman pelanggan yang mudah dan personal, membangun hubungan jangka panjang dengan pelanggan).
- **Nilai-Nilai Inti:** Enam nilai utama (Kenyamanan Sehari-hari, Desain yang Berfokus, Bahan Terpilih, Kualitas yang Terasa, Layanan Personal, Komunitas & Pendukung) yang mencerminkan filosofi operasional Kumora.
- **CTA Merek:** Bagian ajakan bertindak terakhir yang mengarahkan pengunjung ke halaman produk untuk menjelajahi koleksi.

**Estetika Visual:**
- Tata letak yang bersih dan modern dengan penekanan pada gambar berkualitas tinggi
- Animasi yang halus dan transisi halaman yang lancar dengan Framer Motion
- Skema warna yang hangat dan mengundang (plum, ivory, mist) yang mencerminkan kenyamanan kamar tidur
- Tipografi yang elegan dan mudah dibaca yang memperkuat citra premium merek

### Halaman FAQ

Halaman FAQ menampilkan daftar pertanyaan yang sering diajukan tentang produk Kumora dan layanan kami, disertai dengan panduan yang mudah dipahami untuk membantu pengunjung menemukan jawaban atas pertanyaan mereka dengan cepat.

**Fitur Utama:**
- **Accordion Questions:** Daftar pertanyaan yang dapat diperluas dan dicabut yang menampilkan pertanyaan dan jawaban yang umum dicari pengguna.
- **Tombol WhatsApp:** CTA yang jelas dan menonjol untuk menghubungi tim dukungan kami langsung melalui WhatsApp untuk pertanyaan yang tidak terjawab di bagian FAQ.
- **Kategori:** Pengelompokan pertanyaan berdasarkan topik (produk, pemesanan, pengiriman, pengembalian, dll.) untuk meningkatkan kemampuan menemukan jawaban.
- **Pencarian:** Kemampuan untuk mencari pertanyaan tertentu dengan cepat (jika diimplementasikan).
- **Konten yang Ramah:** Jawaban yang ditulis dalam bahasa yang mudah dipahami dan praktis, menunjukkan empati dan pemahaman yang baik terhadap kebutuhan pelanggan.
- **Optimisasi SEO:** Meta deskripsi dan tag judul yang dioptimalkan untuk meningkatkan visibilitas pencarian.

**Dukungan Pelanggan:**
- Informasi kontak yang jelas dan dapat diakses
- Tombol WhatsApp yang memungkinkan pelanggan menghubungi tim dukungan dengan mudah
- Peta situs yang jelas dan navigasi yang intuitif untuk memudahkan akses ke informasi yang diperlukan.

### Halaman Contact

Halaman Contact menyediakan semua informasi kontak Kumora, memungkinkan pengunjung untuk menghubungi tim kami dengan mudah melalui berbagai saluran, serta menampilkan lokasi showroom dan jam operasional kami.

**Fitur Utama:**
- **Info Kontak:** Berbagai saluran kontak termasuk WhatsApp, Email, dan Alamat Showroom dengan ikon yang jelas dan menarik perhatian.
- **Map Placeholder:** Tampilan peta lokasi showroom yang dapat dengan mudah diganti dengan peta interaktif (Google Maps, etc.)
- **Jam Operasional:** Informasi jam operasional yang mudah dibaca dan dipahami.
- **Integrasi WhatsApp:** Tombol WhatsApp yang memungkinkan pengunjung menghubungi kami langsung dengan pesan yang sudah disiapkan sebelumnya.
- **Detail Kontak:** Informasi lengkap seperti nomor WhatsApp, alamat email, dan alamat fisik showroom.
- **CTA Brand:** Bagian ajakan bertindak yang mengingatkan pengunjung tentang koleksi produk kami sambil memberikan opsi untuk menghubungi kami.

**Pengalaman Pengguna:**
- Tata letak yang bersih dan terorganisir yang memudahkan pengunjung menemukan informasi yang mereka butuhkan
- Desain yang responsif dan dioptimalkan untuk semua perangkat seluler
- Ikon yang jelas dan label yang deskriptif untuk semua metode kontak
- Efek hover dan transisi yang halus untuk interaksi yang lebih baik
- Informasi kontak yang mudah diakses dari footer halaman (melalui komponen Layout)

**Optimisasi Konversi:**
- Tombol WhatsApp yang menonjol dan mudah diklik
- Formulir kontak yang sederhana dan mudah diisi
- CTA ganda (telusuri produk dan hubungi kami) untuk meningkatkan konversi
- Kehadiran yang konsisten dari komponen WhatsAppButton di semua halaman

## Ringkasan Komponen

### Layout.tsx (Layout Utama)
Komponen Layout adalah wrapper halaman utama yang menyediakan:
- Navbar yang konsisten di semua halaman
- Animasi halaman yang halus dengan Framer Motion
- Tombol WhatsApp yang selalu terlihat
- Footer dengan informasi kontak dan tautan navigasi
- Efek scroll-to-top yang halus

### Layout Animation
- Menggunakan Framer Motion untuk transisi halaman yang halus
- Mengatur animasi `pageVariants` untuk animasi masuk/keluar halaman
- Menyediakan `staggerContainer` untuk animasi urutan anak yang dapat dikontrol
- Menyediakan `revealVariants` untuk pengamatan elemen yang dapat disesuaikan

### Animasi yang Tersedia
- `pageVariants` — Animasi untuk transisi halaman
- `staggerContainer` — Kontainer animasi untuk urutan anak yang dapat dikontrol
- `revealVariants` — Variasi animasi untuk pengamatan elemen

### Hook yang Tersedia
- `useScrollToTop` — Hook yang memindahkan tampilan ke atas ketika navigasi halaman
- `useReducedMotion` — Mendeteksi preferensi pengurangan gerakan pengguna

## Struktur Data Produk

### Tipe Produk
Struktur data produk diatur dengan tipe TypeScript yang mencakup semua informasi yang diperlukan untuk menampilkan produk:

```typescript
export interface Product {
  id: number;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  shortDescription: string;
  description: string;
  images: string[];
  specifications: ProductSpecification[];
  rating: number;
  reviewCount: number;
  featured: boolean;
  new: boolean;
}
```

### Spesifikasi Produk
Setiap produk menyertakan daftar spesifikasi (bahan, ukuran, berat, warna, garansi) dalam bentuk pasangan label-nilai untuk tampilan yang terstruktur.

### Kategori Produk
Tujuh kategori produk yang didukung:
- Bantal
- Kasur
- Seprai Penutup
- Seprai
- Guling
- Aksesori

### Utilitas Data
- `formatIDR` — Membantu memformat harga dalam mata uang Indonesia
- `generateWhatsAppMessage` — Menghasilkan pesan WhatsApp yang dapat disesuaikan untuk setiap produk
- `generateWhatsAppURL` — Menghasilkan URL WhatsApp untuk kontak langsung
- `filterProducts` — Menyaring produk berdasarkan kategori dan pencarian teks
- `sortProducts` — Mengurutkan produk berdasarkan berbagai kriteria
- `getFeaturedProducts` — Mengambil produk-produk unggulan
- `getProductBySlug` — Mencari produk berdasarkan slug unik-nya
- `getRelatedProducts` — Merekomendasikan produk-produk yang terkait secara dinamis
- `CATEGORIES` — Daftar kategori dengan deskripsi dan gambar
- `WHATSAPP_NUMBER` — Nomor WhatsApp default untuk integrasi layanan pelanggan

## Penanganan Error & UX

### Penanganan Error Halaman Detail Produk
- Ketika produk tidak ditemukan (`getProductBySlug` mengembalikan `undefined`), halaman menampilkan:
  - Pesan kesalahan yang jelas dan ramah: "Produk tidak ditemukan"
  - Deskripsi yang singkat: "Produk yang Anda cari tidak tersedia"
  - Tombol CTA: "Kembali ke Produk" yang mengarahkan kembali ke halaman katalog

### Penanganan Error Umum
- Menampilkan status loading dengan teks yang jelas ketika data sedang diambil
- Menampilkan pesan kesalahan yang ramah pengguna untuk kesalahan jaringan atau server
- Memberikan fallback UI untuk gambar yang gagal dimuat
- Menyediakan tampilan yang jelas untuk kategori yang tidak valid atau parameter yang tidak valid

### Peningkatan UX
- Efek hover yang halus dan animasi mikro untuk semua interaksi
- Tampilan skeleton loading untuk kinerja yang lebih baik (jika diimplementasikan)
- Mode hemat data yang dapat diaktifkan untuk pengguna dengan koneksi lambat
- Tooltip dan petunjuk konteks untuk meningkatkan kegunaan

## Optimalisasi Kinerja

### Bundling & Pengiriman Kode
- Menggunakan Vite dengan React Fast Refresh untuk pengalaman pengembangan yang cepat
- Menyediakan `eslint.config.js` untuk validasi kode dan praktik terbaik
- Menyediakan `tsconfig.app.json` dan `tsconfig.node.json` untuk pengaturan TypeScript yang terpisah
- Mengoptimalkan gambar dengan WebP dan format yang di-cache
- Memanfaatkan `optimizeDeps` Vite untuk dependensi pihak ketiga yang umum

### Render Server Side (jika diperlukan)
- Potensi untuk implementasi render server side di masa depan
- Menyediakan pola yang bersih untuk integrasi backend
- Mengatur struktur untuk kompatibilitas React Server Components di masa depan

### Pengoptimalan Mobile
- Media queries yang responsif yang menargetkan breakpoint umum perangkat seluler dan tablet
- Skala tipografi yang disesuaikan dengan ukuran tampilan
- Ikon dan komponen yang dioptimalkan untuk perangkat seluler
- Tata letak yang dioptimalkan untuk navigasi satu tangan

## Integrasi Backend & Migrasi

### Potensi Integrasi Supabase
Proyek ini sudah menyertakan `@supabase/supabase-js` sebagai dependency. Di masa depan, integrasi ini dapat digunakan untuk:
- Mengambil data produk dari database
- Menyimpan data pelanggan dan riwayat pesanan
- Menyediakan layanan backend untuk checkout dan manajemen inventaris
- Implementasi autentikasi pengguna dan panel admin

### Migrasi Data Statis ke Live API
- Struktur data yang terstruktur dan tipe TypeScript yang memudahkan migrasi data statis ke API langsung
- Tempat yang jelas untuk mengimplementasikan service layer untuk integrasi API
- Potensi untuk mengimplementasikan caching (Redis, etc.) di masa depan
- Arsitektur yang bersih untuk skalabilitas di masa depan

## Checklist Persiapan Deploy

### Persiapan Vercel/Netlify
- [ ] Pastikan `outputDirectory` diatur dengan benar (biasanya `dist`)
- [ ] Konfigurasi `headers` untuk caching (misalnya, `Cache-Control: public, max-age=31536000`)
- [ ] Menyediakan `vercel.json` atau `netlify.toml` untuk konfigurasi build khusus
- [ ] Mengecek untuk optimizeDependencies di Vite config
- [ ] Memastikan `headers` keamanan dan CORS yang benar untuk backend API (jika diperlukan)
- [ ] Menambahkan file `.env.example` untuk variabel lingkungan (misalnya, `VITE_API_URL`)
- [ ] Menyediakan checklist keamanan (pemalsuan XSS, CSRF, dll.)

### Checklist Produksi
- [ ] Mengatur variabel lingkungan (misalnya, `VITE_WHATSAPP_NUMBER`, `VITE_API_URL`)
- [ ] Memvalidasi CORS dan kebijakan keamanan sumber (jika diperlukan backend)
- [ ] Menguji ekspor aplikasi statis dengan benar
- [ ] Verifikasi integrasi analytics (Google Analytics, dll.)
- [ ] Memastikan performa loading halaman pertama yang optimal
- [ ] Memverifikasi ekspor sitemap.xml dan robots.txt yang benar
- [ ] Menguji semua jalur navigasi dan fungsionalitas filter produk
- [ ] Memvalidasi aksesibilitas dengan perangkat bantu (misalnya, VoiceOver, Screen Reader)
- [ ] Menguji semua komponen UI di berbagai ukuran layar


## Referensi

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [Vite Documentation](https://vitejs.dev/guide/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Router Documentation](https://reactrouter.com/en/main)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Lucide React](https://lucide-react.com/)

## Catatan Penulis

Proyek Kumora menampilkan aplikasi e-commerce modern dan ramah pengembang yang menggabungkan teknologi frontend terkini dengan UI/UX yang indah. Dengan arsitektur modular yang bersih, proyek ini dirancang untuk skalabilitas dan pemeliharaan di masa depan. Data produk mock memberikan pengalaman pengembangan yang cepat dan dapat diukur, memungkinkan iterasi cepat dan pengujian yang efektif sebelum integrasi backend penuh.

Jika Anda tertarik untuk berkontribusi, silakan:
- Membuka issue untuk mendiskusikan ide dan permintaan fitur
- Mengirim pull request dengan kode yang bersih dan didokumentasikan dengan baik
- Menjalankan `npm run lint` dan `npm run typecheck` sebelum membuat commit
- Mengikuti commit convention: `type(scope): description` (misalnya, `feat(components): add Rating component`)

Menambahkan masalah keamanan (CVE) adalah prioritas utama. Semua kontribusi harus lulus review keamanan dan linters.

Terima kasih telah menjelajahi Kumora! Ini adalah suatu permulaan—mari kita buat bersama.