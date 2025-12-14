import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LanguageSwitcher } from '../layout/LanguageSwitcher';
import { NextIntlClientProvider } from 'next-intl';

jest.mock('next/navigation', () => ({
  useParams: () => ({ locale: 'en' }),
  usePathname: () => '/',
}));

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
  it('renders the language switcher button', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <LanguageSwitcher />
      </NextIntlClientProvider>
    );

    const button = screen.getByRole('button', { name: /change language/i });
    expect(button).toBeInTheDocument();
  });

  it('displays the current locale', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <LanguageSwitcher />
      </NextIntlClientProvider>
    );

    expect(screen.getByText('EN')).toBeInTheDocument();
  });
});
