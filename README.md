# Dealism - Modern SaaS Landing Page

A modern, fully internationalized SaaS landing page built with Next.js 16, Tailwind CSS v4, and comprehensive testing.

## Features

- ✨ **Modern Design**: Built with Tailwind CSS v4 and Framer-inspired design tokens
- 🌍 **Full i18n Support**: English and Spanish locales with next-intl
- 📱 **Responsive**: Mobile-first design with accessible navigation
- ♿ **Accessible**: WCAG 2.1 AA compliant with axe-core testing
- 🧪 **Fully Tested**: Unit tests with Jest and E2E tests with Playwright
- 🚀 **Performance**: Optimized for Lighthouse scores >90

## Tech Stack

- **Framework**: Next.js 16.0.7 (App Router)
- **UI**: React 19.2.1
- **Styling**: Tailwind CSS v4
- **i18n**: next-intl
- **Testing**: Jest, React Testing Library, Playwright, axe-core
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers (for E2E tests)
npm run playwright:install
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000 (English)
# Open http://localhost:3000/es (Spanish)
```

### Build

```bash
# Create production build
npm run build

# Start production server
npm run start
```

## Internationalization (i18n)

The project supports English (default) and Spanish locales using next-intl.

### Available Routes

- `/` or `/en` - English homepage
- `/es` - Spanish homepage
- All routes support both locales: `/login`, `/es/login`, etc.

### Language Switching

The language switcher in the header and mobile menu preserves:
- Current route path
- Anchor fragments (#pricing, #features, etc.)
- Scroll position

### Adding Translations

1. Edit translation files:
   - `messages/en.json` - English translations
   - `messages/es.json` - Spanish translations

2. Use translations in components:
   ```tsx
   // Client components
   import { useTranslations } from 'next-intl';
   const t = useTranslations('namespace');
   
   // Server components
   import { getTranslations } from 'next-intl/server';
   const t = await getTranslations('namespace');
   ```

3. Add new locales:
   - Create `messages/{locale}.json`
   - Update `i18n/routing.ts` with new locale
   - Update middleware matcher if needed

## Testing

### Unit Tests

```bash
# Run unit tests in watch mode
npm test

# Run tests once (CI)
npm run test:ci
```

Tests are located in `__tests__` directories alongside components.

### E2E Tests

```bash
# Run E2E tests headless
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Debug E2E tests
npm run test:e2e:debug
```

E2E test suites:
- **Navigation**: Page navigation and routing
- **i18n**: Language switching and content verification
- **Accessibility**: WCAG compliance with axe-core
- **Mobile**: Mobile menu and responsive behavior

### Type Checking

```bash
# Run TypeScript type check
npm run type-check
```

### Linting

```bash
# Run ESLint
npm run lint
```

## Project Structure

```
├── app/
│   ├── [locale]/          # Locale-specific routes
│   │   └── (site)/        # Main site group
│   │       ├── layout.tsx # Site layout with metadata
│   │       ├── page.tsx   # Homepage
│   │       ├── login/
│   │       ├── register/
│   │       └── ...
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles with design tokens
├── components/
│   ├── layout/            # Layout components
│   │   ├── SiteHeader.tsx
│   │   ├── SiteFooter.tsx
│   │   ├── MobileDrawer.tsx
│   │   └── LanguageSwitcher.tsx
│   └── __tests__/         # Component unit tests
├── e2e/                   # E2E test suites
├── i18n/                  # i18n configuration
│   ├── routing.ts
│   └── request.ts
├── messages/              # Translation files
│   ├── en.json
│   └── es.json
├── middleware.ts          # next-intl middleware
└── public/
    └── dealism/social/    # Social media icons
```

## Design System

### Design Tokens

Custom properties defined in `app/globals.css`:

- **Colors**: `--token-primary`, `--token-text-*`, `--token-bg-*`
- **Spacing**: `--token-space-*` (xs to 4xl)
- **Radius**: `--token-radius-*` (sm to full)
- **Shadows**: `--token-shadow-*` (sm to xl)

### Fonts

- **Inter**: Primary sans-serif font
- **Hedvig Letters Serif**: Accent serif font

### Responsive Breakpoints

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

1. Build the project: `npm run build`
2. Deploy the `.next` directory
3. Set environment variables if needed
4. Ensure Node.js 18+ runtime

### Environment Variables

No environment variables required for basic deployment. For custom configuration:

- `NEXT_PUBLIC_SITE_URL` - Your production URL
- Add to `.env.local` for local development
- Add to hosting platform for production

## Performance

The site is optimized for:

- **Lighthouse Score**: >90 across all metrics
- **Static Generation**: All routes pre-rendered at build time
- **Image Optimization**: Automatic with Next.js Image
- **Font Loading**: Optimized with next/font
- **Code Splitting**: Automatic route-based splitting

## Accessibility

- ✅ WCAG 2.1 AA compliant
- ✅ Semantic HTML
- ✅ Keyboard navigation
- ✅ Screen reader friendly
- ✅ Focus management in mobile drawer
- ✅ ARIA labels and roles

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Contributing

1. Create a feature branch
2. Make changes with tests
3. Run `npm run type-check` and `npm run lint`
4. Run `npm run test:ci` and `npm run test:e2e`
5. Submit pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Create an issue on GitHub
- Contact: support@dealism.com

---

Built with ❤️ using Next.js and Tailwind CSS
