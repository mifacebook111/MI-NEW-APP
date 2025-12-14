# Dealism.ai Clone Architecture Plan

## 1. Project Overview
This project aims to clone the [dealism.ai](https://dealism.ai/) website using **Next.js 16**, **Tailwind CSS v4**, and **Framer Motion**. The clone will replicate the design, structure, and interactions of the original site, including internationalization (i18n) and lead capture functionality.

## 2. Site Map & Hierarchy

### Pages
- `/` (Home - Landing Page)
- `/price` (Pricing Page)
- `/login` (Login Page - External/Placeholder)
- `/register` (Register Page - External/Placeholder)
- `/policy` (Privacy Policy)
- `/terms` (Terms of Service)
- `/404` (Custom 404 Page)

### Landing Page Sections
1.  **Header/Navigation**: Sticky, responsive, language picker.
2.  **Hero Section**: Title, Subtitle, CTA, Social Proof, Video Embed.
3.  **Feature Section**: "How Dealism Works?" - List of features with side-by-side visuals.
4.  **Insights Section**: "More than a chatbot!" - Cards with Before/After comparisons.
5.  **Review Section**: "What Our Client Said About Us" - Testimonial carousel/grid.
6.  **Pricing Teaser**: "Enterprise-Grade Security" - Security icons/logos.
7.  **FAQ Section**: Accordion list of questions.
8.  **CTA Section**: Final "Turn Conversations Into Revenue" call to action.
9.  **Footer**: Links, Legal, Socials, Copyright.

## 3. Component Architecture

### Directory Structure
```
/
├── app/
│   ├── [locale]/           # Internationalized routes
│   │   ├── layout.tsx      # Root layout (Fonts, Providers, Header, Footer)
│   │   ├── page.tsx        # Landing page composition
│   │   ├── price/          # Pricing page
│   │   └── ...
│   ├── api/                # API Routes
│   │   ├── leads/          # Lead capture endpoint
│   │   └── analytics/      # Custom analytics endpoint
│   └── globals.css         # Tailwind directives & global styles
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # Navigation & Language Switcher
│   │   ├── Footer.tsx      # Site Footer
│   │   └── MobileMenu.tsx  # Responsive Menu
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Insights.tsx
│   │   ├── Reviews.tsx
│   │   ├── PricingTeaser.tsx
│   │   ├── FAQ.tsx
│   │   └── CTA.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Accordion.tsx
│   │   ├── Card.tsx
│   │   ├── Container.tsx   # Max-width wrapper
│   │   └── Section.tsx     # Section wrapper with padding
│   └── icons/              # Custom SVG icons
├── lib/
│   ├── content/            # JSON content for sections (support i18n)
│   ├── utils.ts            # cn() helper
│   └── i18n.ts             # next-intl configuration
├── public/
│   ├── assets/
│   │   ├── images/         # Local images
│   │   ├── fonts/          # Local fonts (if not using Google Fonts)
│   │   └── videos/         # Local videos
└── ...
```

## 4. Tech Stack & Dependencies

-   **Framework**: `next` (v16, App Router)
-   **Styling**: `tailwindcss` (v4), `clsx`, `tailwind-merge`
-   **Animations**: `framer-motion` (for scroll animations, accordions, mobile menu)
-   **Internationalization**: `next-intl` (for en, es, pt support)
-   **Icons**: `lucide-react` (generic icons) + Custom SVGs
-   **Validation**: `zod` (for lead capture forms)
-   **Forms**: `react-hook-form`
-   **Email/Leads**: `resend` (transactional emails) or direct DB insert.
-   **Fonts**: `next/font` (Inter, local fonts for custom typefaces like Hedvig Letters Serif if needed).

## 5. Content Strategy

### Assets
-   **Images**: Downloaded from `framerusercontent.com` and optimized in `public/dealism/images`.
-   **Fonts**:
    -   `Inter`: Use `next/font/google`.
    -   `Hedvig Letters Serif`: Use `next/font/google` (if available) or local file.
    -   `Fragment Mono`: Use `next/font/google`.
    -   `Inter Display`: Custom font file (downloaded to `public/dealism/fonts`).

### Hosting
-   Assets served statically from `public/dealism`.
-   Content text abstracted into `messages/en.json`, `messages/es.json`, etc., for `next-intl`.

## 6. Backend Strategy

### Endpoints
1.  **Lead Capture**: `POST /api/leads`
    -   **Purpose**: Capture emails from "Get beta access" or "Start Free Trial".
    -   **Payload**: `{ email: string, source: string, locale: string }`
    -   **Action**: Validate with Zod, save to database (e.g., Supabase, Vercel Postgres) or send via Resend.

2.  **Analytics**: `POST /api/analytics/event`
    -   **Purpose**: Server-side event tracking (mimic GA/TikTok).
    -   **Payload**: `{ event: string, properties: object }`
    -   **Action**: Log to internal monitoring or forward to analytics provider.

### Secondary Pages
-   `/login` & `/register`: These are currently external links or placeholders. For the clone, we will create simple UI shells that match the branding, with functional forms submitting to the `/api/auth/*` (mock) or redirecting to the actual app subdomain if intended.
-   `/policy` & `/terms`: Static pages with markdown content.

## 7. Implementation Roadmap

1.  **Setup**: Initialize Next.js 16, Tailwind v4, linting.
2.  **Assets**: Download all images and fonts listed in `content-inventory.json`.
3.  **Layout**: Implement `Header` (with sticky behavior and mobile menu) and `Footer`.
4.  **I18n**: Configure `next-intl` and set up locale routing.
5.  **Components**: Build base UI components (`Button`, `Container`).
6.  **Sections**: Implement each landing page section one by one, adding `framer-motion` for reveal effects.
7.  **Interactions**: Wire up the Language Picker and FAQ Accordion.
8.  **Backend**: Create API routes for simple form handling.
9.  **Review**: Verify responsiveness and pixel-perfect design against the original.
