// Fase 9 — Konstanta & utilitas NON-produk yang tetap statis (bukan bagian dari
// katalog Supabase): WhatsApp, testimoni, FAQ, timeline, core values, kategori meta.
// Diekstrak dari products.ts statis lama (kini diarsipkan di archive/products.ts).
import type { ProductCategory } from './types';

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
      'Ya. Showroom kami buka Senin hingga Sabtu, pukul 09.00–18.00 WIB.',
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
