'use client';

import { useParams, usePathname } from 'next/navigation';
import { useTransition } from 'react';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const t = useTranslations('nav');
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const params = useParams();
  const pathname = usePathname();
  const currentLocale = params.locale as string;

  const handleLocaleChange = () => {
    const nextLocale = currentLocale === 'en' ? 'es' : 'en';
    
    startTransition(() => {
      const hash = window.location.hash;
      router.replace(pathname + hash, { locale: nextLocale });
    });
  };

  return (
    <button
      onClick={handleLocaleChange}
      disabled={isPending}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-[var(--token-bg-secondary)] transition-colors ${
        isPending ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
      aria-label={t('changeLanguage')}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[var(--token-text-secondary)]"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
      <span className="text-sm font-medium text-[var(--token-text-secondary)]">
        {currentLocale.toUpperCase()}
      </span>
    </button>
  );
}
