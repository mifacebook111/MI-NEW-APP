import type { Metadata } from 'next';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';

export const metadata: Metadata = {
  title: {
    default: 'Dealism - Transform Your Workflow',
    template: '%s | Dealism',
  },
  description: 'Transforming the way teams collaborate and achieve their goals. Building the future of work, one feature at a time.',
  keywords: ['workflow', 'collaboration', 'productivity', 'team management'],
  authors: [{ name: 'Dealism' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dealism.com',
    siteName: 'Dealism',
    title: 'Dealism - Transform Your Workflow',
    description: 'Transforming the way teams collaborate and achieve their goals.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dealism',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dealism - Transform Your Workflow',
    description: 'Transforming the way teams collaborate and achieve their goals.',
    images: ['/og-image.jpg'],
  },
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'var(--token-grid-pattern)',
          opacity: 0.4,
        }}
        aria-hidden="true"
      />

      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'var(--token-gradient-mesh)',
          opacity: 0.15,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-1 pt-16 lg:pt-20">{children}</main>
        <SiteFooter />
      </div>
    </div>
  );
}
