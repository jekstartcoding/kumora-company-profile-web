export type {
  Product,
  ProductCategory,
  ProductReview,
  ProductSensorySpec,
  ProductSpecification,
  ProductVariant,
} from '../types';
import type { Product, ProductCategory } from '../types';

export { CATEGORY_LABELS } from '../types';

export const WHATSAPP_NUMBER = '6281234567890';

export const CATEGORIES: { name: ProductCategory; description: string; image: string }[] = [
  {
    name: 'pillows',
    description: 'Kenyamanan yang menopang untuk setiap gaya tidur.',
    image: 'https://images.pexels.com/photos/10061393/pexels-photo-10061393.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    name: 'bolsters',
    description: 'Dukungan seimbang untuk posisi tidur yang lebih lurus.',
    image: 'https://images.pexels.com/photos/28345543/pexels-photo-28345543.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    name: 'beds',
    description: 'Dukungan seimbang untuk malam yang lebih nyenyak.',
    image: 'https://images.pexels.com/photos/6207458/pexels-photo-6207458.jpeg?auto=compress&cs=tinysrgb&w=1200',
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
  // ===== PILLOWS (previously: Bantal) =====
  {
    id: 1,
    slug: 'kumora-cloud-pillow',
    name: 'Kumora Bantal Cloud',
    category: 'pillows',
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
    variants: [
      { id: '1', label: 'Firm — 60 × 40 × 12 cm', price: 249000, isDefault: true },
      { id: '1-comfort', label: 'Comfort — 60 × 40 × 12 cm', price: 269000 },
    ],
    sensoryDescriptor: 'Memory foam yang lembut dengan sirkulasi udara optimal untuk kenyamanan sepanjang malam tanpa panas berlebih.',
    sensorySpec: {
      firmnessRating: 3,
      fillMaterial: 'Memory Foam',
      fillWeightEquivalent: '1,2kg',
    },
    deliveryEstimate: '3-5 hari kerja (Jabodetabek)',
    returnPolicyText: 'Masa percobaan 7 hari, garansi 1 tahun terbatas untuk cacat fabrikasi.',
    giftSafe: {
      isSafe: true,
      note: 'Ukuran universal (60×40cm) cocok untuk hadiah',
    },
    brandStoryLine: 'Kenyamanan yang dimulai dari fondasi terbaik untuk setiap gaya tidur.',
    lifestyleImages: [pillowImg1, pillowImg2],
    textureImages: [pillowImg3, pillowImg4],
    reviews: [
      {
        id: 1,
        author: 'Andi Prasetyo',
        rating: 5,
        comment: 'Bantal ini sangat nyaman untuk tidur telentang. Tidak terlalu keras dan tidak terlalu lembut.',
        sleepPosition: 'Terlentang',
        bodyType: 'Ringan',
      },
      {
        id: 2,
        author: 'Siti Rahayu',
        rating: 4,
        comment: 'Terasa cukup nyaman, tapi butuh adaptasi beberapa hari pertama.',
        sleepPosition: 'Menyamping',
        bodyType: 'Sedang',
      },
    ],
  },
  {
    id: 2,
    slug: 'kumora-align-pillow',
    name: 'Kumora Bantal Align',
    category: 'pillows',
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
    variants: [
      { id: '2', label: 'Standard — 60 × 40 × 11 cm', price: 299000, isDefault: true },
      { id: '2-premium', label: 'Premium — 60 × 40 × 11 cm', price: 349000 },
    ],
    sensoryDescriptor: 'Busa berkepadatan tinggi dengan ventilasi optimal untuk dukungan leher ergonomis tanpa panas berlebih.',
    sensorySpec: {
      firmnessRating: 4,
      fillMaterial: 'Busa berkepadatan tinggi',
      fillWeightEquivalent: '1,3kg',
    },
    deliveryEstimate: '3-5 hari kerja (Jabodetabek)',
    returnPolicyText: 'Masa percobaan 7 hari, garansi 1 tahun terbatas untuk cacat fabrikasi.',
    giftSafe: {
      isSafe: true,
      note: 'Perbandingan dimensi universal (60×40cm)',
    },
    brandStoryLine: 'Dukungan ergonomis yang mengutamakan kesehatan tulang belakang.',
    lifestyleImages: [pillowImg1, pillowImg3],
    textureImages: [pillowImg2, pillowImg4],
    reviews: [
      {
        id: 3,
        author: 'Budi Santoso',
        rating: 4,
        comment: 'Cukup nyaman untuk tidur samping, tapi butuh sedikit adaptasi.',
        sleepPosition: 'Menyamping',
        bodyType: 'Sedang',
      },
    ],
  },
  {
    id: 3,
    slug: 'kumora-breeze-pillow',
    name: 'Kumora Bantal Breeze',
    category: 'pillows',
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
    variants: [
      { id: '3', label: 'Standard — 60 × 40 × 12 cm', price: 219000, isDefault: true },
      { id: '3-light', label: 'Light — 60 × 40 × 10 cm', price: 199000 },
    ],
    sensoryDescriptor: 'Serat premium dengan katun bernapas untuk sirkulasi udara maksimal dan kenyamanan dingin sepanjang malam.',
    sensorySpec: {
      firmnessRating: 2,
      fillMaterial: 'Serat premium',
      fillWeightEquivalent: '0,9kg',
    },
    deliveryEstimate: '3-5 hari kerja (Jabodetabek)',
    returnPolicyText: 'Masa percobaan 7 hari, garansi 6 bulan terbatas.',
    giftSafe: {
      isSafe: false,
      note: 'Ukuran tidak standard untuk hadiah',
    },
    brandStoryLine: 'Kenyamanan sederhana yang membuat Anda merasa sejuk.',
    lifestyleImages: [pillowImg2, pillowImg4],
    textureImages: [pillowImg1, pillowImg3],
    reviews: [
      {
        id: 4,
        author: 'Rina Wijaya',
        rating: 5,
        comment: 'Sangat cocok untuk yang tidak suka bantal terlalu keras. Terasa adem waktu tidur.',
        sleepPosition: 'Tengkurap',
        bodyType: 'Ringan',
      },
    ],
  },

  // ===== BOLSTERS (previously: Guling) =====
  {
    id: 11,
    slug: 'kumora-comfort-bolster',
    name: 'Kumora Guling Comfort',
    category: 'bolsters',
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
    variants: [
      { id: '11', label: 'Standard — 90 × 20 cm', price: 179000, isDefault: true },
      { id: '11-duo', label: 'Duo Set — 2 x 90 × 20 cm', price: 329000 },
    ],
    sensoryDescriptor: 'Serat hollow yang lembut dan ringan dengan sentuhan katun yang menghangatkan.',
    sensorySpec: {
      firmnessRating: 2,
      fillMaterial: 'Serat Hollow',
      fillWeightEquivalent: '0,9kg',
    },
    deliveryEstimate: '3-5 hari kerja (Jabodetabek)',
    returnPolicyText: 'Masa percobaan 7 hari, garansi 6 bulan terbatas.',
    giftSafe: {
      isSafe: true,
      note: 'Ukuran standard cocok untuk hadiah',
    },
    brandStoryLine: 'Kenyamanan tambahan yang melengkapi malam Anda.',
    lifestyleImages: [bolsterImg1, bolsterImg2],
    textureImages: [bolsterImg3],
    reviews: [
      {
        id: 5,
        author: 'Dewi Lestari',
        rating: 4,
        comment: 'Cukup nyaman untuk bacaan malam. Bentuknya bagus dan tidak terlalu besar.',
        sleepPosition: 'Menyamping',
        bodyType: 'Sedang',
      },
    ],
  },
  {
    id: 12,
    slug: 'kumora-duo-bolster-set',
    name: 'Kumora Set Guling Duo',
    category: 'bolsters',
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
    variants: [
      { id: '12', label: 'Duo Set — 2 x 90 × 20 cm', price: 299000, isDefault: true },
      { id: '12-single', label: 'Single Set — 1 x 90 × 20 cm', price: 179000 },
    ],
    sensoryDescriptor: 'Pasangan guling yang seimbang dengan isian serat premium dan sarung katun yang lembut.',
    sensorySpec: {
      firmnessRating: 2,
      fillMaterial: 'Serat Premium',
      fillWeightEquivalent: '1,8kg',
    },
    deliveryEstimate: '3-5 hari kerja (Jabodetabek)',
    returnPolicyText: 'Masa percobaan 7 hari, garansi 6 bulan terbatas.',
    giftSafe: {
      isSafe: true,
      note: 'Set pasangan cocok untuk pasangan atau twin bed',
    },
    brandStoryLine: 'Perlengkapan tidur lengkap dalam satu set harmonis.',
    lifestyleImages: [bolsterImg2, bolsterImg1],
    textureImages: [bolsterImg3],
    reviews: [
      {
        id: 6,
        author: 'Agus Priono',
        rating: 4,
        comment: 'Pas untuk kasur anak-anak di kamar anak. Nyaman dan tidak terlalu besar.',
        sleepPosition: 'Tengkurap',
        bodyType: 'Ringan',
      },
    ],
  },

  // ===== BEDS (previously: Kasur) =====
  {
    id: 4,
    slug: 'kumora-rest-mattress',
    name: 'Kumora Kasur Rest',
    category: 'beds',
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
    variants: [
      { id: '4', label: 'Standard — 160 × 200 × 20 cm', price: 2499000, isDefault: true },
      { id: '4-king', label: 'King — 180 × 200 × 20 cm', price: 3199000 },
    ],
    sensoryDescriptor: 'Busa berkepadatan tinggi dengan struktur berlapis untuk dukungan optimal sepanjang malam.',
    sensorySpec: {
      firmnessRating: 3,
      fillMaterial: 'Busa berkepadatan tinggi',
      fillWeightEquivalent: '25kg',
    },
    deliveryEstimate: '3-5 hari kerja (Jabodetabek)',
    returnPolicyText: 'Masa percobaan 14 hari, garansi 5 tahun terbatas untuk kasur.',
    giftSafe: {
      isSafe: true,
      note: 'Ukuran standard cocok untuk hadiah pernikahan',
    },
    brandStoryLine: 'Dukungan kokoh yang menjadi dasar istirahat Anda.',
    lifestyleImages: [mattressImg1, mattressImg2],
    textureImages: [mattressImg3, mattressImg4],
    reviews: [
      {
        id: 7,
        author: 'Siti Maryam',
        rating: 5,
        comment: 'Kasur ini sangat nyaman. Busa yang padat tapi tidak terlalu keras, cocok untuk semua posisi tidur.',
        sleepPosition: 'Menyamping',
        bodyType: 'Sedang',
      },
    ],
  },
  {
    id: 5,
    slug: 'kumora-cloud-mattress',
    name: 'Kumora Kasur Cloud',
    category: 'beds',
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
    variants: [
      { id: '5', label: 'Standard — 160 × 200 × 25 cm', price: 3499000, isDefault: true },
      { id: '5-luxury', label: 'Luxury — 180 × 200 × 25 cm', price: 4499000 },
    ],
    sensoryDescriptor: 'Busa berlapis premium untuk kenyamanan lembut dan mewah yang mengelilingi Anda setiap malam.',
    sensorySpec: {
      firmnessRating: 2,
      fillMaterial: 'Busa multi-lapis',
      fillWeightEquivalent: '30kg',
    },
    deliveryEstimate: '3-5 hari kerja (Jabodetabek)',
    returnPolicyText: 'Masa percobaan 14 hari, garansi 8 tahun terbatas untuk kasur mewah.',
    giftSafe: {
      isSafe: true,
      note: 'Kasur mewah untuk hadiah istimewa',
    },
    brandStoryLine: 'Kemewahan dalam tidur yang membungkus Anda dalam kenyamanan.',
    lifestyleImages: [mattressImg3, mattressImg1],
    textureImages: [mattressImg4, mattressImg2],
    reviews: [
      {
        id: 8,
        author: 'Budi dan Ani',
        rating: 5,
        comment: 'Kasur ini sangat nyaman, cocok untuk berdua. Kami sangat puas!',
        sleepPosition: 'Terlentang',
        bodyType: 'Sedang',
      },
    ],
  },
  {
    id: 6,
    slug: 'kumora-essential-mattress',
    name: 'Kumora Kasur Essential',
    category: 'beds',
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
    variants: [
      { id: '6', label: 'Standard — 120 × 200 × 18 cm', price: 1899000, isDefault: true },
      { id: '6-large', label: 'Large — 140 × 200 × 18 cm', price: 2299000 },
    ],
    sensoryDescriptor: 'Kenyamanan sehari-hari yang praktis dengan dukungan busa andal untuk tidur yang lebih baik setiap malam.',
    sensorySpec: {
      firmnessRating: 3,
      fillMaterial: 'Busa berkepadatan tinggi',
      fillWeightEquivalent: '15kg',
    },
    deliveryEstimate: '3-5 hari kerja (Jabodetabek)',
    returnPolicyText: 'Masa percobaan 7 hari, garansi 3 tahun terbatas.',
    giftSafe: {
      isSafe: true,
      note: 'Cocok untuk hadiah hemat',
    },
    brandStoryLine: 'Kenyamanan praktis yang dapat diandalkan setiap hari.',
    lifestyleImages: [mattressImg4, mattressImg1],
    textureImages: [mattressImg2, mattressImg3],
    reviews: [
      {
        id: 9,
        author: 'Triastuti',
        rating: 4,
        comment: 'Cukup nyaman, tidak terlalu mahal. Cocok untuk kos-kosan.',
        sleepPosition: 'Tengkurap',
        bodyType: 'Ringan',
      },
    ],
  },

  // ===== BEDS WITH TAGS (previously: Seprai Penutup, Seprai) =====
  {
    id: 7,
    slug: 'kumora-serenity-bed-cover',
    name: 'Kumora Seprai Penutup Serenity',
    category: 'beds',
    tags: ['cover'],
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
    variants: [
      { id: '7', label: 'Sage — 220 × 240 cm', price: 599000, isDefault: true },
    ],
    sensoryDescriptor: 'Seprai penutup katun premium dengan tekstur hangat yang sempurna untuk sentuhan akhir kamar.',
    sensorySpec: {
      firmnessRating: 1,
      fillMaterial: 'Campuran Katun',
      fillWeightEquivalent: '3kg',
    },
    deliveryEstimate: '3-5 hari kerja (Jabodetabek)',
    returnPolicyText: 'Masa percobaan 7 hari, garansi 6 bulan terbatas.',
    giftSafe: {
      isSafe: true,
      note: 'Hadiah sempurna untuk rumah baru',
    },
    brandStoryLine: 'Sentuhan akhir yang menghadirkan kehangatan pada kamar Anda.',
    lifestyleImages: [bedCoverImg1, bedCoverImg2],
    textureImages: [bedCoverImg3],
    reviews: [
      {
        id: 10,
        author: 'Linda Hartini',
        rating: 4,
        comment: 'Bahan terasa bagus, tidak terlalu tebal. Cocok untuk hiasan kamar.',
        sleepPosition: 'Tengkurap',
        bodyType: 'Sedang',
      },
    ],
  },
  {
    id: 8,
    slug: 'kumora-linen-bed-cover',
    name: 'Kumora Seprai Penutup Linen',
    category: 'beds',
    tags: ['cover'],
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
    variants: [
      { id: '8', label: 'Pasir — 220 × 240 cm', price: 749000, isDefault: true },
    ],
    sensoryDescriptor: 'Linen ringan dengan tekstur natural yang menciptakan suasana santai dan hangat di kamar.',
    sensorySpec: {
      firmnessRating: 1,
      fillMaterial: 'Campuran Linen',
      fillWeightEquivalent: '2.5kg',
    },
    deliveryEstimate: '3-5 hari kerja (Jabodetabek)',
    returnPolicyText: 'Masa percobaan 7 hari, garansi 6 bulan terbatas.',
    giftSafe: {
      isSafe: true,
      note: 'Cocok untuk hadiah estetika',
    },
    brandStoryLine: 'Linen santai yang membawa kehangatan alami ke kamar Anda.',
    lifestyleImages: [bedCoverImg2, bedCoverImg1],
    textureImages: [bedCoverImg3],
    reviews: [
      {
        id: 11,
        author: 'Rudi Hermawan',
        rating: 4,
        comment: 'Terasa premium untuk harga segini. Lembut dan tidak terlalu tebal.',
        sleepPosition: 'Tengkurap',
        bodyType: 'Sedang',
      },
    ],
  },
  {
    id: 9,
    slug: 'kumora-everyday-bedsheet',
    name: 'Kumora Seprai Everyday',
    category: 'beds',
    tags: ['sheet'],
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
    variants: [
      { id: '9', label: 'King — 180 × 200 cm', price: 329000, isDefault: true },
    ],
    sensoryDescriptor: 'Katun bernapas yang lembut untuk kenyamanan sehari-hari tanpa mengorbankan kualitas.',
    sensorySpec: {
      firmnessRating: 2,
      fillMaterial: 'Campuran Katun',
      fillWeightEquivalent: '2kg',
    },
    deliveryEstimate: '3-5 hari kerja (Jabodetabek)',
    returnPolicyText: 'Masa percobaan 7 hari, garansi 6 bulan terbatas.',
    giftSafe: {
      isSafe: true,
      note: 'Cocok untuk hadiah hemat',
    },
    brandStoryLine: 'Kenyamanan sederhana yang hadir setiap malam.',
    lifestyleImages: [bedsheetImg2, bedsheetImg4],
    textureImages: [bedsheetImg1, bedsheetImg3],
    reviews: [
      {
        id: 12,
        author: 'Dewi Kurnia',
        rating: 4,
        comment: 'Terasa lembut dan nyaman. Warna putih yang bersih, kainnya bagus.',
        sleepPosition: 'Menyamping',
        bodyType: 'Sedang',
      },
    ],
  },
  {
    id: 10,
    slug: 'kumora-signature-bedsheet',
    name: 'Kumora Seprai Signature',
    category: 'beds',
    tags: ['sheet'],
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
    variants: [
      { id: '10', label: 'Sage — 180 × 200 cm', price: 449000, isDefault: true },
    ],
    sensoryDescriptor: 'Katun premium dengan benang 400 untuk sentuhan mewah dan kenyamanan hotel yang halus.',
    sensorySpec: {
      firmnessRating: 2,
      fillMaterial: 'Katun Premium',
      fillWeightEquivalent: '2.5kg',
    },
    deliveryEstimate: '3-5 hari kerja (Jabodetabek)',
    returnPolicyText: 'Masa percobaan 7 hari, garansi 6 bulan terbatas.',
    giftSafe: {
      isSafe: true,
      note: 'Hadiah mewah yang mengesankan',
    },
    brandStoryLine: 'Kemewahan hotel dalam kenyamanan seprai Anda.',
    lifestyleImages: [bedsheetImg1, bedsheetImg4],
    textureImages: [bedsheetImg2, bedsheetImg3],
    reviews: [
      {
        id: 13,
        author: 'Anita dan Budi',
        rating: 5,
        comment: 'Terasa seperti di hotel bintang lima. Kualitasnya luar biasa!',
        sleepPosition: 'Terlentang',
        bodyType: 'Sedang',
      },
    ],
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

export type WhatsAppMessageType = 'standard' | 'gift' | 'quiz';

export interface WhatsAppMessageContext {
  type: WhatsAppMessageType;
  productName: string;
  variantLabel: string;
  quizResultLabel?: string;
}

export function generateWhatsAppMessage(context: WhatsAppMessageContext): string {
  switch (context.type) {
    case 'gift':
      return `Hi Kumora! I'd like to order the ${context.productName} – ${context.variantLabel} as a gift. Could you help me with delivery/presentation options?`;
    case 'quiz':
      return `Hi Kumora! I took the sleep quiz and got matched with ${context.quizResultLabel ?? context.productName}. I'd like to know more / order this.`;
    case 'standard':
    default:
      return `Hi Kumora! I'm interested in the ${context.productName} – ${context.variantLabel}. Could you help me with the order?`;
  }
}

export function generateWhatsAppURL(context: WhatsAppMessageContext): string {
  const message = generateWhatsAppMessage(context);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, count = 3): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, count);
}

export function getGiftSafeProducts(): Product[] {
  return products.filter((p) => p.giftSafe?.isSafe === true);
}

export function filterProducts(
  list: Product[],
  options: { category?: ProductCategory }
): Product[] {
  return list.filter((p) => {
    if (options.category && p.category !== options.category) {
      return false;
    }
    return true;
  });
}
