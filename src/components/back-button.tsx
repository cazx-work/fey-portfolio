'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { InlineIcon } from '@/components/inline-icon';

type BackButtonProps = {
  href: string;
  label: string;
};

export function BackButton({ href, label }: BackButtonProps) {
  const router = useRouter();

  return (
    <Link
      href={href}
      className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--muted)] transition-colors hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
      onClick={(event) => {
        if (window.history.length > 1) {
          event.preventDefault();
          router.back();
        }
      }}
      aria-label={label}
    >
      <InlineIcon name="arrow-left" />
      {label}
    </Link>
  );
}
