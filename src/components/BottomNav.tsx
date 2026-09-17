import { Home, Info, MessageCircle, ShoppingBag } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useMotionPreference';

const navItems = [
  { label: 'Home', to: '/', icon: Home, end: true },
  { label: 'Shop', to: '/shop/pillows', icon: ShoppingBag, end: false },
  { label: 'Quiz', to: '/quiz', icon: MessageCircle, end: false },
  { label: 'About', to: '/about', icon: Info, end: false },
];

export default function BottomNav() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.nav
      aria-label="Primary navigation"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-rose/40 bg-ivory/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(73,47,70,0.08)] backdrop-blur-md"
      initial={shouldReduceMotion ? undefined : { y: 80, opacity: 0 }}
      animate={shouldReduceMotion ? undefined : { y: 0, opacity: 1 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
    >
      <div className="mx-auto grid h-[72px] max-w-lg grid-cols-4 items-center px-3 sm:px-5">
        {navItems.map(({ label, to, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `relative flex h-full flex-col items-center justify-center gap-1 rounded-xl text-[11px] transition-colors duration-200 ${
                isActive
                  ? 'bg-plum/10 font-semibold text-plum'
                  : 'font-medium text-charcoal-muted hover:bg-plum/5 hover:text-plum'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <motion.div
                  animate={!shouldReduceMotion && isActive ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Icon className="h-5 w-5" strokeWidth={isActive ? 2 : 1.6} />
                </motion.div>
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </motion.nav>
  );
}
