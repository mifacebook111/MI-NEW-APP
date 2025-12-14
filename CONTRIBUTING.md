# Contributing to Dealism

Thank you for your interest in contributing to Dealism! This document provides guidelines and instructions for contributing.

## Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/dealism.git
   cd dealism
   ```
3. **Install dependencies**
   ```bash
   npm install
   npm run playwright:install
   ```
4. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Running the Development Server

```bash
npm run dev
```

Visit:
- http://localhost:3000 (English)
- http://localhost:3000/es (Spanish)

### Making Changes

1. **Code Style**
   - Follow existing code patterns
   - Use TypeScript for type safety
   - Use CSS custom properties (design tokens)
   - Keep components small and focused

2. **Adding Translations**
   - Update both `messages/en.json` and `messages/es.json`
   - Maintain translation parity between languages
   - Use descriptive keys

3. **Creating Components**
   - Use functional components
   - Add proper TypeScript types
   - Include JSDoc comments for complex logic
   - Make components responsive

### Testing Your Changes

Before submitting a PR, ensure all tests pass:

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Unit tests
npm run test:ci

# E2E tests
npm run test:e2e
```

### Writing Tests

#### Unit Tests

Create test files alongside components:

```tsx
// components/__tests__/MyComponent.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NextIntlClientProvider } from 'next-intl';
import { MyComponent } from '../MyComponent';

const messages = {
  // Add required translations
};

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <MyComponent />
      </NextIntlClientProvider>
    );
    
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

#### E2E Tests

Create test files in the `e2e/` directory:

```typescript
// e2e/my-feature.spec.ts
import { test, expect } from '@playwright/test';

test.describe('My Feature', () => {
  test('should work correctly', async ({ page }) => {
    await page.goto('/');
    // Add test steps
  });
});
```

## Commit Guidelines

### Commit Message Format

```
type(scope): subject

body (optional)

footer (optional)
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes
- `i18n`: Translation updates

### Examples

```bash
feat(i18n): add French locale support
fix(header): resolve mobile menu scroll issue
docs(readme): update installation instructions
test(e2e): add accessibility tests for forms
```

## Pull Request Process

1. **Update your branch**
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Run all checks**
   ```bash
   npm run type-check
   npm run lint
   npm run test:ci
   npm run test:e2e
   ```

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat(scope): description"
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**
   - Provide a clear title and description
   - Reference any related issues
   - Add screenshots for UI changes
   - Ensure CI passes

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] Translations added/updated for both languages
- [ ] Tests added/updated
- [ ] All tests pass
- [ ] No TypeScript errors
- [ ] No linting errors
- [ ] Build succeeds

## Code Review Process

1. At least one maintainer review required
2. All CI checks must pass
3. Changes must be approved before merging
4. Squash and merge preferred for cleaner history

## Accessibility Guidelines

All contributions must maintain WCAG 2.1 AA compliance:

- Use semantic HTML elements
- Include proper ARIA labels
- Ensure keyboard navigation works
- Test with screen readers when possible
- Maintain sufficient color contrast
- Test with axe-core (included in E2E tests)

## Internationalization Guidelines

- All user-facing text must be translatable
- Never hardcode strings in components
- Use translation keys descriptively
- Maintain parity between all locales
- Test in all supported languages

## Performance Guidelines

- Keep bundle size minimal
- Use dynamic imports for large components
- Optimize images
- Avoid unnecessary re-renders
- Test with Lighthouse

## Questions?

- Open an issue for bug reports or feature requests
- Start a discussion for questions or ideas
- Contact maintainers for urgent matters

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing to Dealism! 🎉
