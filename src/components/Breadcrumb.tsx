import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cardVariants } from '@/lib/animations';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <motion.nav aria-label="Jejak navigasi" className="flex items-center gap-1.5 text-sm" variants={cardVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5">
            {item.to && !isLast ? (
              <Link
                to={item.to}
                className="text-charcoal-muted transition-colors hover:text-clay"
              >
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'font-medium text-clay' : 'text-charcoal-muted'}>
                {item.label}
              </span>
            )}
            {!isLast && <ChevronRight className="h-3.5 w-3.5 text-sand-dark" />}
          </span>
        );
      })}
    </motion.nav>
  );
}
