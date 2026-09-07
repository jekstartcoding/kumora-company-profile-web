import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { revealVariants } from '@/lib/animations';

interface RatingProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md';
}

export default function Rating({ rating, reviewCount, size = 'sm' }: RatingProps) {
  const starSize = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4';
  return (
    <motion.div className="flex items-center gap-2" variants={revealVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= Math.round(rating) ? 'fill-mauve text-mauve' : 'fill-rose text-rose'
            }`}
          />
        ))}
      </div>
      <span className="text-sm text-charcoal-muted">
        {rating.toFixed(1)}
        {reviewCount !== undefined && ` (${reviewCount} ulasan)`}
      </span>
    </motion.div>
  );
}
