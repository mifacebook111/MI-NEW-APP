# Internationalization (i18n) Setup Guide

This document explains the i18n implementation in the Dealism project using next-intl.

## Overview

The project supports multiple languages with full routing, content translation, and SEO optimization:

- **Default Language**: English (`en`)
- **Available Languages**: English (`en`), Spanish (`es`)
- **Library**: next-intl v4+
- **Routing Strategy**: Locale prefix as needed (English at `/`, Spanish at `/es`)

## Architecture

### File Structure

```
├── app/
│   ├── [locale]/               # Locale-based routes
│   │   ├── layout.tsx          # Locale layout (IntlProvider wrapper)
│   │   └── (site)/             # Site group
│   │       ├── layout.tsx      # Site layout with metadata
│   │       ├── page.tsx        # Home page
│   │       └── ...             # Other pages
│   └── layout.tsx              # Root layout
├── components/
│   └── layout/
│       └── LanguageSwitcher.tsx # Language switcher component
├── i18n/
│   ├── routing.ts              # Routing configuration
│   └── request.ts              # Request configuration
├── messages/
│   ├── en.json                 # English translations
│   └── es.json                 # Spanish translations
└── middleware.ts               # next-intl middleware
```

### Configuration Files

#### `i18n/routing.ts`

Defines available locales and routing strategy:

```typescript
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});
```

**Options**:
- `locales`: Array of supported locale codes
- `defaultLocale`: Default locale (no prefix in URL)
- `localePrefix`: When to show locale in URL (`as-needed` = only non-default)

#### `i18n/request.ts`

Configures message loading:

```typescript
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
```

#### `middleware.ts`

Handles locale detection and routing:

```typescript
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(es|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
};
```

#### `next.config.ts`

Integrates next-intl plugin:

```typescript
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  // config
};

export default withNextIntl(nextConfig);
```

## Translation Files

### Structure

Translation files use nested JSON structure with namespaces:

```json
{
  "namespace": {
    "key": "value",
    "nested": {
      "key": "value"
    }
  }
}
```

### Example: `messages/en.json`

```json
{
  "nav": {
    "product": "Product",
    "features": "Features",
    "login": "Login"
  },
  "hero": {
    "title": "Transform Your Workflow",
    "description": "Dealism helps teams collaborate..."
  },
  "metadata": {
    "title": "Dealism - Transform Your Workflow",
    "description": "Transforming the way teams..."
  }
}
```

### Example: `messages/es.json`

```json
{
  "nav": {
    "product": "Producto",
    "features": "Características",
    "login": "Iniciar Sesión"
  },
  "hero": {
    "title": "Transforma tu Flujo de Trabajo",
    "description": "Dealism ayuda a los equipos..."
  },
  "metadata": {
    "title": "Dealism - Transforma tu Flujo de Trabajo",
    "description": "Transformando la forma..."
  }
}
```

## Using Translations

### In Client Components

```tsx
'use client';

import { useTranslations } from 'next-intl';

export function MyComponent() {
  const t = useTranslations('namespace');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

### In Server Components

```tsx
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations('namespace');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

### With Parameters

```tsx
// Translation file
{
  "welcome": "Welcome, {name}!"
}

// Component
const name = "John";
<p>{t('welcome', { name })}</p>
// Output: "Welcome, John!"
```

### Pluralization

```tsx
// Translation file
{
  "items": "{count, plural, =0 {no items} =1 {one item} other {# items}}"
}

// Component
<p>{t('items', { count: 5 })}</p>
// Output: "5 items"
```

## Localized Routing

### Navigation

Use the custom Link and router from `i18n/routing`:

```tsx
import { Link, useRouter } from '@/i18n/routing';

// Link component (automatically adds locale)
<Link href="/about">About</Link>

// Programmatic navigation
const router = useRouter();
router.push('/about');
```

### Route Parameters

Pages automatically receive locale parameter:

```tsx
// app/[locale]/(site)/page.tsx
export default async function Page({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  // Use locale
}
```

## Metadata Localization

### Per-Page Metadata

```tsx
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      locale: locale === 'es' ? 'es_ES' : 'en_US',
    },
  };
}
```

### Dynamic Parameters

```tsx
export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
```

## Language Switcher Component

### Implementation

```tsx
'use client';

import { useParams, usePathname } from 'next/navigation';
import { useRouter } from '@/i18n/routing';
import { useTransitions } from 'react';

export function LanguageSwitcher() {
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
    <button onClick={handleLocaleChange} disabled={isPending}>
      {currentLocale.toUpperCase()}
    </button>
  );
}
```

### Features

- ✅ Preserves current route path
- ✅ Preserves anchor fragments (#section)
- ✅ Shows loading state during transition
- ✅ Works on desktop and mobile

## SEO Considerations

### Hreflang Tags

Add alternate language links:

```tsx
// app/[locale]/layout.tsx
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  
  return {
    alternates: {
      canonical: `https://example.com${locale === 'en' ? '' : `/${locale}`}`,
      languages: {
        'en': 'https://example.com',
        'es': 'https://example.com/es',
      },
    },
  };
}
```

### Sitemap

Generate localized sitemap:

```typescript
// app/sitemap.ts
import { routing } from '@/i18n/routing';

export default function sitemap() {
  const routes = ['/', '/about', '/blog'];
  
  return routes.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: `https://example.com${locale === 'en' ? '' : `/${locale}`}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: route === '/' ? 1.0 : 0.8,
    }))
  );
}
```

## Adding a New Language

### 1. Create Translation File

```bash
cp messages/en.json messages/fr.json
# Edit messages/fr.json with French translations
```

### 2. Update Routing Configuration

```typescript
// i18n/routing.ts
export const routing = defineRouting({
  locales: ['en', 'es', 'fr'], // Add 'fr'
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});
```

### 3. Update Middleware Matcher

```typescript
// middleware.ts
export const config = {
  matcher: ['/', '/(es|en|fr)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
};
```

### 4. Update Language Switcher (Optional)

If showing all languages:

```tsx
const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
];
```

### 5. Test

```bash
# Visit the new language URL
http://localhost:3000/fr

# Run E2E tests
npm run test:e2e
```

## Best Practices

### Translation Keys

✅ **Do**:
- Use descriptive namespaces: `hero.title`, `nav.login`
- Keep keys consistent across languages
- Use dot notation for nesting

❌ **Don't**:
- Use generic keys: `text1`, `label2`
- Mix conventions: `heroTitle` vs `hero.title`
- Hardcode strings in components

### Content Parity

- Ensure all languages have complete translations
- Keep text length similar across languages
- Test layout with longer text (e.g., German)
- Provide fallbacks for missing translations

### Performance

- Use static generation for all locale routes
- Keep translation files reasonable size
- Split large translation files if needed
- Load only required translations

### Testing

Always test:
- All locales render correctly
- Language switcher works
- Metadata is localized
- SEO tags are correct
- Links work in all locales

## Troubleshooting

### Issue: "Cannot find module messages/en.json"

**Solution**: Ensure translation files exist in correct location:
```bash
ls messages/en.json messages/es.json
```

### Issue: Translation not showing

**Solution**: Check:
1. Translation key exists in JSON file
2. Namespace is correct
3. Component wrapped in IntlProvider (client components)
4. `setRequestLocale` called (server components)

### Issue: Language switcher doesn't work

**Solution**: Verify:
1. Using `Link` and `useRouter` from `@/i18n/routing`
2. Middleware is configured correctly
3. Locale parameter is in URL structure

### Issue: Metadata not localized

**Solution**: Use `getTranslations` in `generateMetadata`:
```tsx
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return { title: t('title') };
}
```

## Resources

- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Next.js i18n Routing](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [ICU Message Format](https://unicode-org.github.io/icu/userguide/format_parse/messages/)
- [Locale Codes (ISO 639-1)](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)

## Support

For i18n questions:
- Check this documentation
- Review existing translations
- See component examples
- Open an issue for help
