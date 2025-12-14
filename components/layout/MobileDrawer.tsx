'use client';

import { useEffect, useRef } from 'react';
import { Link } from '@/i18n/routing';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslations } from 'next-intl';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const t = useTranslations('nav');
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';

      const firstFocusable = drawerRef.current?.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;
      firstFocusable?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
        aria-hidden="true"
      />
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-[var(--token-surface-elevated)] z-50 shadow-2xl transform transition-transform duration-300 ease-out lg:hidden"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-[var(--token-border)]">
            <span className="text-lg font-semibold text-[var(--token-text-primary)]">
              {t('menu')}
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-[var(--token-bg-secondary)] transition-colors"
              aria-label={t('closeMenu')}
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
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-6">
            <ul className="space-y-2">
              <li>
                <a
                  href="#product"
                  onClick={onClose}
                  className="block px-4 py-3 rounded-lg text-[var(--token-text-primary)] hover:bg-[var(--token-bg-secondary)] transition-colors font-medium"
                >
                  {t('product')}
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  onClick={onClose}
                  className="block px-4 py-3 rounded-lg text-[var(--token-text-primary)] hover:bg-[var(--token-bg-secondary)] transition-colors font-medium"
                >
                  {t('features')}
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  onClick={onClose}
                  className="block px-4 py-3 rounded-lg text-[var(--token-text-primary)] hover:bg-[var(--token-bg-secondary)] transition-colors font-medium"
                >
                  {t('pricing')}
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={onClose}
                  className="block px-4 py-3 rounded-lg text-[var(--token-text-primary)] hover:bg-[var(--token-bg-secondary)] transition-colors font-medium"
                >
                  {t('faq')}
                </a>
              </li>
            </ul>

            <div className="mt-8 space-y-3">
              <Link
                href="/login"
                onClick={onClose}
                className="block w-full px-6 py-3 text-center rounded-full border border-[var(--token-border)] text-[var(--token-text-primary)] hover:bg-[var(--token-bg-secondary)] transition-all font-medium"
              >
                {t('login')}
              </Link>
              <Link
                href="/register"
                onClick={onClose}
                className="block w-full px-6 py-3 text-center rounded-full bg-[var(--token-primary)] text-white hover:bg-[var(--token-primary-hover)] transition-all font-medium shadow-md"
              >
                {t('register')}
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-[var(--token-border)]">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
