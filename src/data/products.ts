export type ProductCategory =
  | 'Bantal'
  | 'Kasur'
  | 'Seprai Penutup'
  | 'Seprai'
  | 'Guling'
  | 'Aksesori';

export interface ProductSpecification {
  label: string;
  value: string;
}

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

export const WHATSAPP_NUMBER = '6281234567890';

export const CATEGORIES: { name: ProductCategory; description: string; image: string }[] = [
  {
    name: 'Bantal',
    description: 'Kenyamanan yang menopang untuk setiap gaya tidur.',
    image: 'https://images.pexels.com/photos/10061393/pexels-photo-10061393.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    name: 'Kasur',
    description: 'Dukungan seimbang untuk malam yang lebih nyenyak.',
    image: 'https://images.pexels.com/photos/6207458/pexels-photo-6207458.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    name: 'Seprai Penutup',
    description: 'Lapisan lembut untuk kamar yang lebih hangat.',
    image: 'https://images.pexels.com/photos/30618181/pexels-photo-30618181.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    name: 'Seprai',
    description: 'Perlengkapan sehari-hari dengan sentuhan premium.',
    image: 'https://images.pexels.com/photos/27671434/pexels-photo-27671434.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    name: 'Guling',
    description: 'Kenyamanan sederhana untuk istirahat sehari-hari.',
    image: 'https://images.pexels.com/photos/28345543/pexels-photo-28345543.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    name: 'Aksesori',
    description: 'Detail kecil yang melengkapi kamar Anda.',
    image: 'https://images.pexels.com/photos/7691101/pexels-photo-7691101.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
];

const pillowImg1 = 'https://images.pexels.com/photos/10061393/pexels-photo-10061393.jpeg?auto=compress&cs=tinysrgb&w=1200';
const pillowImg2 = 'https://images.pexels.com/photos/4153160/pexels-photo-4153160.jpeg?auto=compress&cs=tinysrgb&w=1200';
const pillowImg3 = 'https://images.pexels.com/photos/12200060/pexels-photo-12200060.jpeg?auto=compress&cs=tinysrgb&w=1200';
const pillowImg4 = 'https://images.pexels.com/photos/15410912/pexels-photo-15410912.jpeg?auto=compress&cs=tinysrgb&w=1200';

const mattressImg1 = 'https://images.pexels.com/photos/6207458/pexels-photo-6207458.jpeg?auto=compress&cs=tinysrgb&w=1200';
const mattressImg2 = 'https://images.pexels.com/photos/10600090/pexels-photo-10600090.jpeg?auto=compress&cs=tinysrgb&w=1200';
const mattressImg3 = 'https://images.pexels.com/photos/24904026/pexels-photo-24904026.jpeg?auto=compress&cs=tinysrgb&w=1200';
const mattressImg4 = 'https://images.pexels.com/photos/3847591/pexels-photo-3847591.jpeg?auto=compress&cs=tinysrgb&w=1200';

const bedCoverImg1 = 'https://images.pexels.com/photos/30618181/pexels-photo-30618181.jpeg?auto=compress&cs=tinysrgb&w=1200';
const bedCoverImg2 = 'https://images.pexels.com/photos/6123227/pexels-photo-6123227.jpeg?auto=compress&cs=tinysrgb&w=1200';
const bedCoverImg3 = 'https://images.pexels.com/photos/16648303/pexels-photo-16648303.jpeg?auto=compress&cs=tinysrgb&w=1200';

const bedsheetImg1 = 'https://images.pexels.com/photos/27671434/pexels-photo-27671434.jpeg?auto=compress&cs=tinysrgb&w=1200';
const bedsheetImg2 = 'https://images.pexels.com/photos/28513848/pexels-photo-28513848.jpeg?auto=compress&cs=tinysrgb&w=1200';
const bedsheetImg3 = 'https://images.pexels.com/photos/12553184/pexels-photo-12553184.jpeg?auto=compress&cs=tinysrgb&w=1200';
const bedsheetImg4 = 'https://images.pexels.com/photos/22711513/pexels-photo-22711513.jpeg?auto=compress&cs=tinysrgb&w=1200';

const bolsterImg1 = 'https://images.pexels.com/photos/28345543/pexels-photo-28345543.jpeg?auto=compress&cs=tinysrgb&w=1200';
const bolsterImg2 = 'https://images.pexels.com/photos/18084887/pexels-photo-18084887.jpeg?auto=compress&cs=tinysrgb&w=1200';
const bolsterImg3 = 'https://images.pexels.com/photos/5825584/pexels-photo-5825584.jpeg?auto=compress&cs=tinysrgb&w=1200';

export const products: Product[] = [
  {
    id: 1,
    slug: 'kumora-cloud-pillow',
    name: 'Kumora Bantal Cloud',
    category: 'Bantal',
    price: 249000,
    shortDescription: 'Kenyamanan lembut dan responsif untuk tidur sehari-hari.',
    description:
      'Bantal Kumora Cloud menggabungkan memory foam responsif dengan sarung luar yang bernapas, memberikan pengalaman tidur yang lembut namun tetap menopang. Dirancang untuk kenyamanan sehari-hari tanpa terasa terlalu keras.',
    images: [pillowImg1, pillowImg2, pillowImg3, pillowImg4],
    specifications: [
      { label: 'Bahan', value: 'Memory Foam' },
      { label: 'Sarung', value: 'Polyester Bernapas' },
      { label: 'Ukuran', value: '60 × 40 × 12 cm' },
      { label: 'Berat', value: '1,2 kg' },
      { label: 'Warna', value: 'Ivory' },
      { label: 'Garansi', value: '1 Tahun' },
    ],
    rating: 4.8,
    reviewCount: 124,
    featured: true,
    new: false,
  },
  {
    id: 2,
    slug: 'kumora-align-pillow',
    name: 'Kumora Bantal Align',
    category: 'Bantal',
    price: 299000,
    shortDescription: 'Dukungan leher seimbang untuk posisi tidur yang lebih lurus.',
    description:
      'Bantal Kumora Align memberikan dukungan leher yang seimbang untuk posisi tidur yang lebih lurus. Dibuat dengan busa berkepadatan tinggi dan sarung campuran bambu yang nyaman dan bernapas.',
    images: [pillowImg3, pillowImg2, pillowImg1, pillowImg4],
    specifications: [
      { label: 'Bahan', value: 'Busa berkepadatan tinggi' },
      { label: 'Sarung', value: 'Kain campuran bambu' },
      { label: 'Ukuran', value: '60 × 40 × 11 cm' },
      { label: 'Berat', value: '1,3 kg' },
      { label: 'Warna', value: 'Natural' },
      { label: 'Garansi', value: '1 Tahun' },
    ],
    rating: 4.7,
    reviewCount: 89,
    featured: false,
    new: true,
  },
  {
    id: 3,
    slug: 'kumora-breeze-pillow',
    name: 'Kumora Bantal Breeze',
    category: 'Bantal',
    price: 219000,
    shortDescription: 'Bantal sehari-hari yang bernapas untuk tidur yang lebih sejuk.',
    description:
      'Bantal Kumora Breeze adalah bantal sehari-hari yang bernapas, dirancang untuk tidur yang lebih sejuk. Dibuat dengan serat premium dan katun bernapas untuk kenyamanan yang lembut dan udara yang mengalir.',
    images: [pillowImg2, pillowImg1, pillowImg4, pillowImg3],
    specifications: [
      { label: 'Bahan', value: 'Serat premium' },
      { label: 'Sarung', value: 'Katun bernapas' },
      { label: 'Ukuran', value: '60 × 40 × 12 cm' },
      { label: 'Berat', value: '0,9 kg' },
      { label: 'Warna', value: 'Putih' },
      { label: 'Garansi', value: '6 Bulan' },
    ],
    rating: 4.6,
    reviewCount: 76,
    featured: false,
    new: false,
  },
  {
    id: 4,
    slug: 'kumora-rest-mattress',
    name: 'Kumora Kasur Rest',
    category: 'Kasur',
    price: 2499000,
    shortDescription: 'Kenyamanan sedang-keras untuk dukungan seimbang dan malam yang nyenyak.',
    description:
      'Kasur Kumora Rest menawarkan kenyamanan sedang-keras untuk dukungan seimbang dan malam yang nyenyak. Dibangun dengan busa berkepadatan tinggi dan sarung kain rajut untuk kenyamanan sehari-hari yang tahan lama.',
    images: [mattressImg1, mattressImg2, mattressImg3, mattressImg4],
    specifications: [
      { label: 'Bahan', value: 'Busa berkepadatan tinggi' },
      { label: 'Ukuran', value: '160 × 200 × 20 cm' },
      { label: 'Kekerasan', value: 'Sedang Keras' },
      { label: 'Sarung', value: 'Kain rajut' },
      { label: 'Warna', value: 'Ivory' },
      { label: 'Garansi', value: '5 Tahun' },
    ],
    rating: 4.9,
    reviewCount: 213,
    featured: true,
    new: false,
  },
  {
    id: 5,
    slug: 'kumora-cloud-mattress',
    name: 'Kumora Kasur Cloud',
    category: 'Kasur',
    price: 3499000,
    shortDescription: 'Kenyamanan busa berlapis untuk tidur yang lebih lembut dan santai.',
    description:
      'Kasur Kumora Cloud menghadirkan kenyamanan busa berlapis untuk tidur yang lebih lembut dan santai. Konstruksi multi-lapis dengan sarung rajut premium untuk sentuhan mewah.',
    images: [mattressImg3, mattressImg1, mattressImg4, mattressImg2],
    specifications: [
      { label: 'Bahan', value: 'Busa multi-lapis' },
      { label: 'Ukuran', value: '160 × 200 × 25 cm' },
      { label: 'Kekerasan', value: 'Sedang Lembut' },
      { label: 'Sarung', value: 'Kain rajut premium' },
      { label: 'Warna', value: 'Ivory' },
      { label: 'Garansi', value: '8 Tahun' },
    ],
    rating: 4.9,
    reviewCount: 187,
    featured: false,
    new: true,
  },
  {
    id: 6,
    slug: 'kumora-essential-mattress',
    name: 'Kumora Kasur Essential',
    category: 'Kasur',
    price: 1899000,
    shortDescription: 'Kenyamanan sehari-hari yang praktis untuk tidur yang lebih baik.',
    description:
      'Kasur Kumora Essential memberikan kenyamanan sehari-hari yang praktis untuk tidur yang lebih baik. Kasur busa berkepadatan tinggi yang andal dengan sarung polyester untuk dukungan yang dapat diandalkan.',
    images: [mattressImg4, mattressImg1, mattressImg2, mattressImg3],
    specifications: [
      { label: 'Bahan', value: 'Busa berkepadatan tinggi' },
      { label: 'Ukuran', value: '120 × 200 × 18 cm' },
      { label: 'Kekerasan', value: 'Sedang' },
      { label: 'Sarung', value: 'Polyester' },
      { label: 'Warna', value: 'Putih' },
      { label: 'Garansi', value: '3 Tahun' },
    ],
    rating: 4.5,
    reviewCount: 64,
    featured: false,
    new: false,
  },
  {
    id: 7,
    slug: 'kumora-serenity-bed-cover',
    name: 'Kumora Seprai Penutup Serenity',
    category: 'Seprai Penutup',
    price: 599000,
    shortDescription: 'Seprai penutup katun lembut dengan tekstur halus.',
    description:
      'Seprai Penutup Kumora Serenity adalah seprai penutup katun lembut dengan tekstur halus. Lapisan yang santai dan hangat, menghadirkan kehangatan dan kedalaman pada kamar Anda.',
    images: [bedCoverImg1, bedCoverImg2, bedCoverImg3],
    specifications: [
      { label: 'Bahan', value: 'Campuran Katun' },
      { label: 'Ukuran', value: '220 × 240 cm' },
      { label: 'Warna', value: 'Sage' },
      { label: 'Pola', value: 'Tekstur' },
      { label: 'Perawatan', value: 'Bisa Dicuci Mesin' },
    ],
    rating: 4.8,
    reviewCount: 91,
    featured: true,
    new: false,
  },
  {
    id: 8,
    slug: 'kumora-linen-bed-cover',
    name: 'Kumora Seprai Penutup Linen',
    category: 'Seprai Penutup',
    price: 749000,
    shortDescription: 'Lapisan ringan bernuansa linen dengan estetika santai yang alami.',
    description:
      'Seprai Penutup Kumora Linen adalah lapisan ringan bernuansa linen dengan estetika santai yang alami. Lembut, bernapas, dan elegan untuk pemakaian sehari-hari.',
    images: [bedCoverImg2, bedCoverImg1, bedCoverImg3],
    specifications: [
      { label: 'Bahan', value: 'Campuran Linen' },
      { label: 'Ukuran', value: '220 × 240 cm' },
      { label: 'Warna', value: 'Pasir' },
      { label: 'Pola', value: 'Polos' },
      { label: 'Perawatan', value: 'Bisa Dicuci Mesin' },
    ],
    rating: 4.7,
    reviewCount: 72,
    featured: false,
    new: true,
  },
  {
    id: 9,
    slug: 'kumora-everyday-bedsheet',
    name: 'Kumora Seprai Everyday',
    category: 'Seprai',
    price: 329000,
    shortDescription: 'Seprai lembut dan bernapas untuk pemakaian sehari-hari.',
    description:
      'Seprai Kumora Everyday adalah seprai lembut dan bernapas untuk pemakaian sehari-hari. Kain campuran katun dengan sentuhan nyaman dan warna putih hangat yang bersih.',
    images: [bedsheetImg2, bedsheetImg1, bedsheetImg3, bedsheetImg4],
    specifications: [
      { label: 'Bahan', value: 'Campuran Katun' },
      { label: 'Ukuran', value: 'King' },
      { label: 'Warna', value: 'Putih Hangat' },
      { label: 'Jumlah Benang', value: '300' },
      { label: 'Perawatan', value: 'Bisa Dicuci Mesin' },
    ],
    rating: 4.6,
    reviewCount: 105,
    featured: false,
    new: false,
  },
  {
    id: 10,
    slug: 'kumora-signature-bedsheet',
    name: 'Kumora Seprai Signature',
    category: 'Seprai',
    price: 449000,
    shortDescription: 'Seprai halus dan premium terinspirasi dari kenyamanan hotel.',
    description:
      'Seprai Kumora Signature adalah seprai halus dan premium terinspirasi dari kenyamanan hotel. Dibuat dengan katun premium dan jumlah benang 400 untuk sentuhan mewah yang halus.',
    images: [bedsheetImg1, bedsheetImg3, bedsheetImg2, bedsheetImg4],
    specifications: [
      { label: 'Bahan', value: 'Katun Premium' },
      { label: 'Ukuran', value: 'King' },
      { label: 'Warna', value: 'Sage' },
      { label: 'Jumlah Benang', value: '400' },
      { label: 'Perawatan', value: 'Bisa Dicuci Mesin' },
    ],
    rating: 4.9,
    reviewCount: 142,
    featured: true,
    new: false,
  },
  {
    id: 11,
    slug: 'kumora-comfort-bolster',
    name: 'Kumora Guling Comfort',
    category: 'Guling',
    price: 179000,
    shortDescription: 'Guling lembut sehari-hari untuk kenyamanan tidur tambahan.',
    description:
      'Guling Kumora Comfort adalah guling lembut sehari-hari untuk kenyamanan tidur tambahan. Diisi dengan serat hollow dan dibalut sarung campuran katun untuk sentuhan lembut yang menopang.',
    images: [bolsterImg1, bolsterImg2, bolsterImg3],
    specifications: [
      { label: 'Bahan', value: 'Serat Hollow' },
      { label: 'Ukuran', value: '90 × 20 cm' },
      { label: 'Sarung', value: 'Campuran Katun' },
      { label: 'Warna', value: 'Ivory' },
      { label: 'Garansi', value: '6 Bulan' },
    ],
    rating: 4.7,
    reviewCount: 83,
    featured: false,
    new: false,
  },
  {
    id: 12,
    slug: 'kumora-duo-bolster-set',
    name: 'Kumora Set Guling Duo',
    category: 'Guling',
    price: 299000,
    shortDescription: 'Sepasang guling nyaman untuk perlengkapan tidur yang lebih lengkap.',
    description:
      'Set Guling Duo Kumora adalah sepasang guling nyaman untuk perlengkapan tidur yang lebih lengkap. Isian serat premium dengan sarung campuran katun, dijual dalam satu set berisi dua buah.',
    images: [bolsterImg2, bolsterImg1, bolsterImg3],
    specifications: [
      { label: 'Bahan', value: 'Serat Premium' },
      { label: 'Ukuran', value: '90 × 20 cm masing-masing' },
      { label: 'Sarung', value: 'Campuran Katun' },
      { label: 'Warna', value: 'Natural' },
      { label: 'Jumlah', value: '2 Buah' },
      { label: 'Garansi', value: '6 Bulan' },
    ],
    rating: 4.8,
    reviewCount: 58,
    featured: false,
    new: true,
  },
];

export const TESTIMONIALS = [
  {
    quote:
      'Bantal Cloud terasa lembut tanpa kehilangan dukungan yang saya butuhkan. Saya tidur jauh lebih nyaman sekarang.',
    author: 'Andi Pratama',
    location: 'Bandung',
  },
  {
    quote:
      'Saya suka betapa sederhana tampilan Seprai Signature. Bahannya juga terasa jauh lebih premium dari yang saya kira.',
    author: 'Nadia Putri',
    location: 'Jakarta',
  },
  {
    quote:
      'Tim Kumora membantu saya memilih kasur berdasarkan gaya tidur saya, bukan sekadar merekomendasikan yang paling mahal.',
    author: 'Rizky Mahendra',
    location: 'Bekasi',
  },
];

export const FAQS = [
  {
    question: 'Di mana saya bisa membeli produk Kumora?',
    answer:
      'Produk Kumora dapat dipesan langsung dengan menghubungi tim kami melalui WhatsApp.',
  },
  {
    question: 'Apakah saya bisa mengunjungi showroom Kumora?',
    answer:
      'Ya. Showroom kami buka Senin hingga Sabtu, pukul 09.00\u201318.00 WIB.',
  },
  {
    question: 'Apakah saya bisa meminta rekomendasi produk?',
    answer:
      'Tentu. Hubungi tim kami melalui WhatsApp dan ceritakan preferensi tidur, kondisi kamar, atau kebutuhan produk Anda.',
  },
  {
    question: 'Apakah produk Kumora memiliki garansi?',
    answer:
      'Produk tertentu dilengkapi garansi. Durasi garansi bergantung pada jenis produk.',
  },
  {
    question: 'Apakah Anda mengirim ke luar Bandung?',
    answer:
      'Ya. Ketersediaan pengiriman dapat dikonfirmasi langsung dengan tim kami melalui WhatsApp.',
  },
  {
    question: 'Bagaimana saya tahu kasur mana yang cocok untuk saya?',
    answer:
      'Tim kami dapat membantu merekomendasikan kasur berdasarkan tingkat kekerasan, posisi tidur, dan preferensi kenyamanan Anda.',
  },
];

export const TIMELINE = [
  {
    year: '2015',
    title: 'Kumora Didirikan',
    description: 'Kumora memulai perjalanan dengan koleksi perlengkapan tidur sehari-hari pertamanya.',
  },
  {
    year: '2018',
    title: 'Koleksi Bantal Pertama',
    description: 'Merek memperluas lini bantal dengan beberapa profil kenyamanan.',
  },
  {
    year: '2021',
    title: 'Memasuki Kamar Tidur',
    description: 'Kumora meluncurkan produk kasur dan perlengkapan tidur.',
  },
  {
    year: '2024',
    title: 'Koleksi Kamar Lengkap',
    description: 'Portofolio produk berkembang menjadi koleksi perlengkapan kamar yang lengkap.',
  },
  {
    year: '2026',
    title: 'Tumbuh Bersama Anda',
    description: 'Kumora mulai memperluas kehadiran digital dan pengalaman pelanggan.',
  },
];

export const CORE_VALUES = [
  {
    title: 'KENYAMANAN',
    description: 'Kenyamanan adalah fondasi dari semua yang kami ciptakan.',
  },
  {
    title: 'KUALITAS',
    description: 'Kami memperhatikan bahan, konstruksi, dan detail di balik setiap produk.',
  },
  {
    title: 'KEPEDULIAN',
    description: 'Kami mendengarkan pelanggan dan merancang berdasarkan kebutuhan sehari-hari yang nyata.',
  },
  {
    title: 'PERTUMBUHAN',
    description: 'Kami terus berkembang seiring perubahan gaya hidup, ekspektasi, dan teknologi.',
  },
];

export function formatIDR(price: number): string {
  return 'Rp' + price.toLocaleString('id-ID');
}

export function formatIDRShort(price: number): string {
  return 'Rp' + price.toLocaleString('id-ID');
}

export function generateWhatsAppMessage(product?: { name: string; price: number }): string {
  if (product) {
    return `Halo Kumora, saya tertarik dengan ${product.name} (${formatIDR(product.price)}). Saya ingin mengetahui lebih lanjut mengenai produk ini.`;
  }
  return 'Halo Kumora, saya ingin mengetahui lebih lanjut mengenai produk-produk Kumora.';
}

export function generateWhatsAppURL(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getRelatedProducts(product: Product, count = 3): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, count);
}

export type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc';

export function sortProducts(list: Product[], sort: SortOption): Product[] {
  const sorted = [...list];
  switch (sort) {
    case 'featured':
      return sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
    case 'newest':
      return sorted.sort((a, b) => Number(b.new) - Number(a.new) || b.id - a.id);
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    default:
      return sorted;
  }
}

export function filterProducts(
  list: Product[],
  options: { search?: string; category?: ProductCategory | 'Semua' }
): Product[] {
  return list.filter((p) => {
    if (options.category && options.category !== 'Semua' && p.category !== options.category) {
      return false;
    }
    if (options.search) {
      const q = options.search.toLowerCase();
      const haystack = `${p.name} ${p.category} ${p.shortDescription} ${p.description}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}
