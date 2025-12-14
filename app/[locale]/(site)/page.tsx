import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <section className="relative px-4 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="text-center space-y-6 lg:space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-[var(--token-text-primary)] tracking-tight">
              {t('hero.title')}
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-[var(--token-text-secondary)] max-w-3xl mx-auto leading-relaxed">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-[var(--token-primary)] hover:bg-[var(--token-primary-hover)] rounded-full transition-all shadow-lg hover:shadow-xl"
              >
                {t('hero.ctaPrimary')}
              </Link>
              <a
                href="#product"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-[var(--token-text-primary)] border-2 border-[var(--token-border)] hover:border-[var(--token-text-primary)] rounded-full transition-all"
              >
                {t('hero.ctaSecondary')}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="product" className="relative px-4 py-20 lg:py-32 scroll-mt-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--token-text-primary)]">
              {t('product.title')}
            </h2>
            <p className="text-lg text-[var(--token-text-secondary)] max-w-2xl mx-auto">
              {t('product.description')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="p-8 rounded-2xl bg-[var(--token-surface)] border border-[var(--token-border)] hover:border-[var(--token-primary)] transition-all shadow-[var(--token-shadow-md)] hover:shadow-[var(--token-shadow-lg)]"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--token-primary)]/10 flex items-center justify-center mb-4">
                  <div className="w-6 h-6 rounded-lg bg-[var(--token-primary)]" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--token-text-primary)] mb-2">
                  {t(`product.feature${item}Title`)}
                </h3>
                <p className="text-[var(--token-text-secondary)]">
                  {t(`product.feature${item}Description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="relative px-4 py-20 lg:py-32 scroll-mt-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--token-text-primary)]">
              {t('features.title')}
            </h2>
            <p className="text-lg text-[var(--token-text-secondary)] max-w-2xl mx-auto">
              {t('features.description')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="p-8 rounded-2xl bg-[var(--token-surface)] border border-[var(--token-border)] hover:border-[var(--token-primary)] transition-all"
              >
                <h3 className="text-xl font-semibold text-[var(--token-text-primary)] mb-2">
                  {t(`features.feature${item}Title`)}
                </h3>
                <p className="text-[var(--token-text-secondary)]">
                  {t(`features.feature${item}Description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="relative px-4 py-20 lg:py-32 scroll-mt-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--token-text-primary)]">
              {t('pricing.title')}
            </h2>
            <p className="text-lg text-[var(--token-text-secondary)] max-w-2xl mx-auto">
              {t('pricing.description')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {['starter', 'professional', 'enterprise'].map((plan) => (
              <div
                key={plan}
                className="p-8 rounded-2xl bg-[var(--token-surface)] border border-[var(--token-border)] hover:border-[var(--token-primary)] transition-all shadow-[var(--token-shadow-md)]"
              >
                <h3 className="text-2xl font-bold text-[var(--token-text-primary)] mb-4">
                  {t(`pricing.${plan}`)}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-[var(--token-text-primary)]">{t('pricing.price')}</span>
                  <span className="text-[var(--token-text-secondary)]">{t('pricing.period')}</span>
                </div>
                <button className="w-full px-6 py-3 text-sm font-medium text-white bg-[var(--token-primary)] hover:bg-[var(--token-primary-hover)] rounded-full transition-all">
                  {t('pricing.getStarted')}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="relative px-4 py-20 lg:py-32 scroll-mt-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--token-text-primary)]">
              {t('faq.title')}
            </h2>
            <p className="text-lg text-[var(--token-text-secondary)]">
              {t('faq.description')}
            </p>
          </div>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="p-6 rounded-xl bg-[var(--token-surface)] border border-[var(--token-border)]"
              >
                <h3 className="text-lg font-semibold text-[var(--token-text-primary)] mb-2">
                  {t(`faq.question${item}`)}
                </h3>
                <p className="text-[var(--token-text-secondary)]">
                  {t(`faq.answer${item}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
