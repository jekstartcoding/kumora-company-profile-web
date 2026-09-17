import type { Product } from '@/data/types';

export type PurchaseContext = 'self' | 'gift';

interface GiftToggleProps {
  value: PurchaseContext;
  onChange: (value: PurchaseContext) => void;
  giftSafe?: Product['giftSafe'];
}

export default function GiftToggle({ value, onChange, giftSafe }: GiftToggleProps) {
  return (
    <fieldset className="rounded-2xl border border-rose/40 bg-ivory p-5">
      <legend className="px-1 font-serif text-lg text-charcoal">For you or as a gift?</legend>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {([
          ['self', 'For me'],
          ['gift', 'As a gift'],
        ] as const).map(([option, label]) => (
          <label
            key={option}
            className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors ${
              value === option
                ? 'border-plum bg-plum/5 text-plum'
                : 'border-rose/40 text-charcoal-muted hover:border-plum/50'
            }`}
          >
            <input
              type="radio"
              name="purchase-context"
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              className="h-4 w-4 accent-plum"
            />
            {label}
          </label>
        ))}
      </div>
      {value === 'gift' && (
        <p className="mt-4 rounded-xl bg-blush/40 px-4 py-3 text-sm leading-relaxed text-charcoal-muted">
          {giftSafe?.note ?? 'Tim Kumora dapat membantu menyiapkan pilihan presentasi hadiah.'}
        </p>
      )}
    </fieldset>
  );
}
