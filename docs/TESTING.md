# Testing Documentation

This document provides detailed information about the testing setup and best practices for the Dealism project.

## Table of Contents

- [Testing Strategy](#testing-strategy)
- [Unit Tests](#unit-tests)
- [E2E Tests](#e2e-tests)
- [Accessibility Tests](#accessibility-tests)
- [Performance Tests](#performance-tests)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
- [CI/CD Integration](#cicd-integration)

## Testing Strategy

The project uses a comprehensive testing approach:

1. **Unit Tests**: Component-level testing with Jest and React Testing Library
2. **E2E Tests**: End-to-end testing with Playwright
3. **Accessibility Tests**: WCAG compliance with axe-core
4. **Performance Tests**: Load time and responsiveness checks
5. **Type Checking**: TypeScript compiler for type safety

### Coverage Goals

- **Unit Tests**: >80% coverage for components and utilities
- **E2E Tests**: Critical user flows and all major features
- **Accessibility**: WCAG 2.1 AA compliance on all pages

## Unit Tests

### Technology Stack

- **Jest**: Test runner and assertion library
- **React Testing Library**: Component testing utilities
- **@testing-library/jest-dom**: Custom matchers

### Running Unit Tests

```bash
# Watch mode (development)
npm test

# Single run (CI)
npm run test:ci

# With coverage
npm run test:ci -- --coverage
```

### Test File Structure

```
components/
├── layout/
│   ├── SiteHeader.tsx
│   ├── SiteFooter.tsx
│   └── __tests__/
│       ├── SiteHeader.test.tsx
│       └── SiteFooter.test.tsx
```

### Example Unit Test

```tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NextIntlClientProvider } from 'next-intl';
import { LanguageSwitcher } from '../LanguageSwitcher';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useParams: () => ({ locale: 'en' }),
  usePathname: () => '/',
}));

// Mock i18n routing
jest.mock('@/i18n/routing', () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
}));

const messages = {
  nav: {
    changeLanguage: 'Change language',
  },
};

describe('LanguageSwitcher', () => {
  it('renders correctly', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <LanguageSwitcher />
      </NextIntlClientProvider>
    );

    expect(screen.getByText('EN')).toBeInTheDocument();
  });
});
```

### Best Practices

- Test user behavior, not implementation details
- Use semantic queries (getByRole, getByLabelText)
- Mock external dependencies
- Keep tests focused and isolated
- Test in both English and Spanish when relevant

## E2E Tests

### Technology Stack

- **Playwright**: Browser automation and testing
- **@axe-core/playwright**: Accessibility testing integration

### Running E2E Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run with UI mode (interactive)
npm run test:e2e:ui

# Run in debug mode
npm run test:e2e:debug

# Run specific test file
npx playwright test e2e/navigation.spec.ts
```

### Test Suites

1. **navigation.spec.ts**: Page navigation and routing
2. **i18n.spec.ts**: Language switching and translation
3. **accessibility.spec.ts**: WCAG compliance
4. **mobile.spec.ts**: Mobile-specific interactions
5. **performance.spec.ts**: Load time and responsiveness

### Example E2E Test

```typescript
import { test, expect } from '@playwright/test';

test.describe('Language Switching', () => {
  test('should switch from English to Spanish', async ({ page }) => {
    await page.goto('/');
    
    // Verify English content
    await expect(page.getByRole('heading', { 
      name: /transform your workflow/i 
    })).toBeVisible();
    
    // Click language switcher
    await page.getByLabel(/change language/i).first().click();
    
    // Wait for Spanish route
    await page.waitForURL(/\/es/);
    
    // Verify Spanish content
    await expect(page.getByRole('heading', { 
      name: /transforma tu flujo de trabajo/i 
    })).toBeVisible();
  });
});
```

### Test Configuration

Playwright configuration in `playwright.config.ts`:

- **Base URL**: http://localhost:3000
- **Browser**: Chromium (default)
- **Retries**: 2 (CI), 0 (local)
- **Reporter**: HTML report

## Accessibility Tests

### Running Accessibility Tests

```bash
# Run accessibility test suite
npx playwright test e2e/accessibility.spec.ts
```

### Example Accessibility Test

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('should not have accessibility violations', async ({ page }) => {
  await page.goto('/');

  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
```

### WCAG Compliance

The project targets WCAG 2.1 AA compliance:

- ✅ Semantic HTML structure
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Color contrast ratios
- ✅ Focus indicators
- ✅ ARIA labels and roles
- ✅ Alt text for images

### Manual Testing

While automated tests cover most cases, also test:

- Screen reader usage (NVDA, JAWS, VoiceOver)
- Keyboard-only navigation
- High contrast mode
- Zoom levels (up to 200%)

## Performance Tests

### Running Performance Tests

```bash
npx playwright test e2e/performance.spec.ts
```

### Performance Metrics

Tests verify:

- **Page Load Time**: < 5 seconds
- **Time to Interactive**: Measured via Playwright
- **Layout Shifts**: Minimal CLS
- **Font Loading**: Optimized with next/font
- **Responsive Behavior**: All viewport sizes

### Example Performance Test

```typescript
test('should load page quickly', async ({ page }) => {
  const startTime = Date.now();
  
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  
  const loadTime = Date.now() - startTime;
  expect(loadTime).toBeLessThan(5000);
});
```

### Lighthouse Testing

For Lighthouse scores, use:

```bash
# Install Lighthouse
npm install -g lighthouse

# Run Lighthouse
lighthouse http://localhost:3000 --view
```

Target scores:
- Performance: >90
- Accessibility: 100
- Best Practices: >90
- SEO: 100

## Running Tests

### Local Development

```bash
# Install dependencies
npm install
npm run playwright:install

# Run unit tests
npm test

# Run E2E tests
npm run test:e2e
```

### Before Committing

```bash
# Full test suite
npm run type-check
npm run lint
npm run test:ci
npm run test:e2e
```

### Continuous Integration

See `.github/workflows/ci.yml.example` for CI configuration.

## Writing Tests

### When to Write Tests

- **Always**: New features and components
- **Always**: Bug fixes
- **Recommended**: Refactoring critical paths
- **Consider**: Documentation updates

### Test Naming

```typescript
// Good
test('should display error message when form is invalid', ...)
test('should navigate to login page when clicking login link', ...)

// Avoid
test('test1', ...)
test('works', ...)
```

### Test Organization

```typescript
describe('ComponentName', () => {
  describe('when prop X is true', () => {
    it('should render Y', () => {
      // Test
    });
  });

  describe('when user clicks button', () => {
    it('should call onClick handler', () => {
      // Test
    });
  });
});
```

### Testing i18n

Always test in both languages:

```typescript
test.describe('Hero Section', () => {
  test('should display English content', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText(/transform your workflow/i)).toBeVisible();
  });

  test('should display Spanish content', async ({ page }) => {
    await page.goto('/es');
    await expect(page.getByText(/transforma tu flujo de trabajo/i)).toBeVisible();
  });
});
```

## CI/CD Integration

### GitHub Actions

Example workflow in `.github/workflows/ci.yml.example`:

```yaml
name: CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run test:ci
      - run: npm run test:e2e
```

### Test Artifacts

- Unit test coverage reports
- Playwright HTML reports
- Screenshots and videos (on failure)

### Required Checks

All PRs must pass:
- ✅ Type checking
- ✅ Linting
- ✅ Unit tests
- ✅ E2E tests
- ✅ Build succeeds

## Troubleshooting

### Common Issues

**Issue**: Tests fail with "toBeInTheDocument is not a function"
```typescript
// Solution: Import jest-dom
import '@testing-library/jest-dom';
```

**Issue**: Playwright can't find page elements
```typescript
// Solution: Wait for element
await page.waitForSelector('selector');
// Or use assertions with timeout
await expect(page.getByText('text')).toBeVisible({ timeout: 5000 });
```

**Issue**: i18n tests fail
```typescript
// Solution: Wrap with NextIntlClientProvider
render(
  <NextIntlClientProvider locale="en" messages={messages}>
    <Component />
  </NextIntlClientProvider>
);
```

### Debug Mode

```bash
# Jest debug mode
node --inspect-brk node_modules/.bin/jest --runInBand

# Playwright debug mode
npm run test:e2e:debug
```

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev)
- [axe-core Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## Questions?

If you have questions about testing:
1. Check this documentation
2. Look at existing test examples
3. Open an issue for clarification
4. Ask in discussions

Happy testing! 🧪
