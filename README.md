# Dealism - Next.js Landing Page with Backend

A modern landing page built with Next.js 16, featuring real forms, authentication, and a complete backend infrastructure.

## ✨ Features

- 🎨 Modern UI with Tailwind CSS v4 and design tokens
- 📝 Real forms for waitlist and demo requests
- 🔐 User authentication (login/register)
- 🛡️ Anti-spam protection (honeypot + rate limiting)
- ✅ Zod validation on all endpoints
- 📧 Email notifications with Resend
- 🗄️ SQLite database with Prisma ORM (easily switchable to PostgreSQL)
- 📊 Vercel Analytics integration
- 🧪 Comprehensive integration tests with Vitest
- 📝 Structured logging

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Copy the environment variables file:

```bash
cp .env.example .env
```

3. Set up the database:

```bash
npx prisma generate
npx prisma migrate dev
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Documentation

See [docs/SETUP.md](./docs/SETUP.md) for detailed setup instructions and environment variable configuration.

## 🧪 Testing

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui
```

## 📁 Project Structure

```
├── app/
│   ├── (site)/          # Main site pages
│   │   ├── page.tsx     # Home page with forms
│   │   ├── login/       # Login page
│   │   ├── register/    # Register page
│   │   └── ...
│   ├── api/             # API routes
│   │   ├── auth/        # Authentication endpoints
│   │   ├── leads/       # Waitlist endpoint
│   │   └── demo/        # Demo request endpoint
│   └── layout.tsx       # Root layout with analytics
├── components/
│   ├── forms/           # Form components
│   │   ├── JoinWaitlistForm.tsx
│   │   └── BookDemoForm.tsx
│   └── layout/          # Layout components
├── lib/
│   ├── prisma.ts        # Prisma client
│   ├── validations.ts   # Zod schemas
│   ├── rate-limit.ts    # Rate limiting
│   ├── email.ts         # Email service
│   └── logger.ts        # Structured logging
├── prisma/
│   └── schema.prisma    # Database schema
└── __tests__/           # Integration tests
```

## 🔧 API Routes

### Lead Routes
- `POST /api/leads` - Submit waitlist form
- `POST /api/demo` - Submit demo request

### Auth Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

## 🌍 Environment Variables

Required:
- `DATABASE_URL` - Database connection string

Optional (for production features):
- `RESEND_API_KEY` - Resend API key for emails
- `FROM_EMAIL` - Email sender address
- `NOTIFICATION_EMAIL` - Team notification email
- `NEXT_PUBLIC_GA_ID` - Google Analytics ID

## 🛠️ Tech Stack

- **Framework:** Next.js 16.0.7 with App Router
- **UI:** React 19, Tailwind CSS v4
- **Database:** Prisma with SQLite (dev) / PostgreSQL (prod)
- **Validation:** Zod
- **Email:** Resend
- **Analytics:** Vercel Analytics
- **Testing:** Vitest
- **Language:** TypeScript

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

1. Build the project:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## 📝 Development Notes

### Database Management

```bash
# Create a new migration
npx prisma migrate dev --name migration_name

# Reset database
npx prisma migrate reset

# View database
npx prisma studio
```

### Switching to PostgreSQL for Production

1. Update `DATABASE_URL` in `.env` to your PostgreSQL connection string
2. Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
3. Run migrations:
```bash
npx prisma migrate dev
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## ✅ Acceptance Criteria Checklist

- ✅ Forms correctly send data to database
- ✅ Emails/notifications are triggered (when configured)
- ✅ Login/register pages work end-to-end
- ✅ API routes have passing tests in CI
- ✅ Anti-spam protection (honeypot + rate limiting)
- ✅ Zod validation on all endpoints
- ✅ Structured logging
- ✅ Environment variables documented in `.env.example`
- ✅ Analytics integration
