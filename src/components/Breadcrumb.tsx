import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { revealVariants } from '@/lib/animations';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <motion.nav
      aria-label="Jejak navigasi"
      className="flex flex-wrap items-center gap-1.5 text-sm"
      variants={revealVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5">
            {item.to && !isLast ? (
              <Link
                to={item.to}
                className="text-charcoal-muted transition-colors hover:text-plum"
              >
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'max-w-[180px] truncate font-medium text-plum sm:max-w-none' : 'text-charcoal-muted'}>
                {item.label}
              </span>
            )}
            {!isLast && <ChevronRight className="h-3.5 w-3.5 shrink-0 text-rose" />}
          </span>
        );
      })}
    </motion.nav>
  );
}
