// Visual diskon ala e-commerce: badge persen + harga asli dicoret + harga akhir.
// Kontrak client: percentage badge dihitung otomatis (dibulatkan); jenis diskon
// (persen/nominal) tidak relevan di tampilan — yang tampil hasilnya.
import { formatIDR } from '@/data/content';
import type { DiscountInfo } from '@/lib/productApi';

interface DiscountPriceProps {
  discount: DiscountInfo;
  size?: 'sm' | 'md' | 'lg'; // sm: card, md/lg: detail page
  showPercentBadge?: boolean;
}

// Dipakai di ProductCard (sm) dan ProductDetailPage (lg). Bila diskon tidak
// aktif, komponen ini tidak dirender — pemanggil menampilkan harga biasa.
export default function DiscountPrice({
  discount,
  size = 'sm',
  showPercentBadge = true,
}: DiscountPriceProps) {
  if (!discount.active) return null;

  const priceClass =
    size === 'lg'
      ? 'text-2xl font-medium text-plum md:text-3xl'
      : 'text-base font-medium text-plum';
  const originalClass =
    size === 'lg'
      ? 'text-base text-charcoal-muted line-through md:text-lg'
      : 'text-xs text-charcoal-muted line-through';
  const badgeClass =
    size === 'lg'
      ? 'rounded-full bg-plum px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ivory'
      : 'rounded-full bg-plum px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ivory';

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {showPercentBadge && discount.percent > 0 && (
        <span className={badgeClass}>-{discount.percent}%</span>
      )}
      <span className={priceClass}>{formatIDR(discount.finalPrice)}</span>
      <span className={originalClass}>{formatIDR(discount.originalPrice)}</span>
    </div>
  );
}
