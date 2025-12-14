'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { MobileDrawer } from './MobileDrawer';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslations } from 'next-intl';

export function SiteHeader() {
  const t = useTranslations('nav');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          isScrolled
            ? 'bg-[var(--token-surface-elevated)]/80 backdrop-blur-xl shadow-[var(--token-shadow-md)] border-b border-[var(--token-border)]'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 lg:h-20 items-center justify-between">
            <div className="flex items-center gap-12">
              <Link
                href="/"
                className="text-xl lg:text-2xl font-bold text-[var(--token-text-primary)] hover:opacity-80 transition-opacity"
              >
                Dealism
              </Link>

              <nav className="hidden lg:flex items-center gap-8">
                <a
                  href="#product"
                  className="text-sm font-medium text-[var(--token-text-secondary)] hover:text-[var(--token-text-primary)] transition-colors"
                >
                  {t('product')}
                </a>
                <a
                  href="#features"
                  className="text-sm font-medium text-[var(--token-text-secondary)] hover:text-[var(--token-text-primary)] transition-colors"
                >
                  {t('features')}
                </a>
                <a
                  href="#pricing"
                  className="text-sm font-medium text-[var(--token-text-secondary)] hover:text-[var(--token-text-primary)] transition-colors"
                >
                  {t('pricing')}
                </a>
                <a
                  href="#faq"
                  className="text-sm font-medium text-[var(--token-text-secondary)] hover:text-[var(--token-text-primary)] transition-colors"
                >
                  {t('faq')}
                </a>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <LanguageSwitcher className="hidden lg:flex" />

              <Link
                href="/login"
                className="hidden lg:inline-flex px-4 py-2 text-sm font-medium text-[var(--token-text-primary)] hover:text-[var(--token-primary)] transition-colors"
              >
                {t('login')}
              </Link>

              <Link
                href="/register"
                className="hidden lg:inline-flex px-6 py-2.5 text-sm font-medium text-white bg-[var(--token-primary)] hover:bg-[var(--token-primary-hover)] rounded-full transition-all shadow-md hover:shadow-lg"
              >
                {t('register')}
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-[var(--token-bg-secondary)] transition-colors"
                aria-label={t('openMenu')}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
