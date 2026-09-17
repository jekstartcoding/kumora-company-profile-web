import { Link } from 'react-router-dom';

interface BrandMarkProps {
  className?: string;
}

/**
 * Full logo (icon + wordmark) inside an ivory pill so the plum artwork
 * keeps its contrast on dark photographic backgrounds — same treatment
 * as the footer logo. Links back to the home page.
 */
export default function BrandMark({ className = '' }: BrandMarkProps) {
  return (
    <Link
      to="/"
      aria-label="Kumora — kembali ke beranda"
      className={`inline-flex items-center rounded-full bg-ivory px-4 py-2 shadow-sm ${className}`}
    >
      <img
        src="/kumora-logo-with-text.png"
        alt="Kumora"
        width={116}
        height={22}
        className="h-6 w-auto object-contain"
      />
    </Link>
  );
}
