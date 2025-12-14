'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MobileDrawer } from './MobileDrawer';

export function SiteHeader() {
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
                <Link
                  href="#product"
                  className="text-sm font-medium text-[var(--token-text-secondary)] hover:text-[var(--token-text-primary)] transition-colors"
                >
                  Product
                </Link>
                <Link
                  href="#features"
                  className="text-sm font-medium text-[var(--token-text-secondary)] hover:text-[var(--token-text-primary)] transition-colors"
                >
                  Features
                </Link>
                <Link
                  href="#pricing"
                  className="text-sm font-medium text-[var(--token-text-secondary)] hover:text-[var(--token-text-primary)] transition-colors"
                >
                  Pricing
                </Link>
                <Link
                  href="#faq"
                  className="text-sm font-medium text-[var(--token-text-secondary)] hover:text-[var(--token-text-primary)] transition-colors"
                >
                  FAQ
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <button
                className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-[var(--token-bg-secondary)] transition-colors"
                aria-label="Change language"
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
                  EN
                </span>
              </button>

              <Link
                href="/login"
                className="hidden lg:inline-flex px-4 py-2 text-sm font-medium text-[var(--token-text-primary)] hover:text-[var(--token-primary)] transition-colors"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="hidden lg:inline-flex px-6 py-2.5 text-sm font-medium text-white bg-[var(--token-primary)] hover:bg-[var(--token-primary-hover)] rounded-full transition-all shadow-md hover:shadow-lg"
              >
                Get beta access
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-[var(--token-bg-secondary)] transition-colors"
                aria-label="Open menu"
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
