import Link from 'next/link';
import Image from 'next/image';

export function SiteFooter() {
  const socialLinks = [
    { name: 'LinkedIn', icon: '/dealism/social/linkedin.svg', href: 'https://linkedin.com' },
    { name: 'Facebook', icon: '/dealism/social/facebook.svg', href: 'https://facebook.com' },
    { name: 'X', icon: '/dealism/social/x.svg', href: 'https://x.com' },
    { name: 'Instagram', icon: '/dealism/social/instagram.svg', href: 'https://instagram.com' },
    { name: 'YouTube', icon: '/dealism/social/youtube.svg', href: 'https://youtube.com' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-[var(--token-border)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-6">
            <Link
              href="/"
              className="inline-block text-2xl font-bold text-[var(--token-text-primary)] hover:opacity-80 transition-opacity"
            >
              Dealism
            </Link>
            <p className="text-base lg:text-lg text-[var(--token-text-secondary)] max-w-md leading-relaxed">
              Transforming the way teams collaborate and achieve their goals. 
              Building the future of work, one feature at a time.
            </p>
            <div className="flex items-center gap-4 pt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--token-bg-secondary)] hover:bg-[var(--token-bg-tertiary)] text-[var(--token-text-secondary)] hover:text-[var(--token-text-primary)] transition-all hover:scale-110"
                  aria-label={`Visit our ${social.name}`}
                >
                  <Image
                    src={social.icon}
                    alt=""
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-12">
            <div>
              <h3 className="text-sm font-semibold text-[var(--token-text-primary)] mb-4 uppercase tracking-wide">
                Product
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#features"
                    className="text-sm text-[var(--token-text-secondary)] hover:text-[var(--token-text-primary)] transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="text-sm text-[var(--token-text-secondary)] hover:text-[var(--token-text-primary)] transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#faq"
                    className="text-sm text-[var(--token-text-secondary)] hover:text-[var(--token-text-primary)] transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[var(--token-text-primary)] mb-4 uppercase tracking-wide">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-[var(--token-text-secondary)] hover:text-[var(--token-text-primary)] transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-sm text-[var(--token-text-secondary)] hover:text-[var(--token-text-primary)] transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-sm text-[var(--token-text-secondary)] hover:text-[var(--token-text-primary)] transition-colors"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[var(--token-text-primary)] mb-4 uppercase tracking-wide">
                Legal
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/policy"
                    className="text-sm text-[var(--token-text-secondary)] hover:text-[var(--token-text-primary)] transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-[var(--token-text-secondary)] hover:text-[var(--token-text-primary)] transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--token-border)]">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[var(--token-text-tertiary)]">
              © {currentYear} Dealism. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/policy"
                className="text-sm text-[var(--token-text-tertiary)] hover:text-[var(--token-text-primary)] transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-[var(--token-text-tertiary)] hover:text-[var(--token-text-primary)] transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
