import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  light?: boolean;
  children?: ReactNode;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  light = false,
  children,
}: SectionHeadingProps) {
  const isCenter = align === 'center';
  return (
    <div className={isCenter ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && (
        <p className={`eyebrow ${light ? 'text-ivory/60' : ''}`}>{eyebrow}</p>
      )}
      <h2
        className={`mt-3 font-serif text-section ${
          light ? 'text-ivory' : 'text-forest'
        } text-balance`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed ${
            light ? 'text-ivory/70' : 'text-charcoal-muted'
          } ${isCenter ? 'mx-auto' : ''}`}
        >
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
