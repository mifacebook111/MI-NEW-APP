# Setup Guide

## Environment Variables

Copy `.env.example` to `.env` and configure the following variables:

### Required Variables

```bash
# Database
DATABASE_URL="file:./dev.db"
```

### Optional Variables (for production features)

```bash
# Email Notifications (Resend)
RESEND_API_KEY="your_resend_api_key_here"
FROM_EMAIL="onboarding@yourdomain.com"
NOTIFICATION_EMAIL="team@yourdomain.com"

# Analytics
NEXT_PUBLIC_GA_ID="your_ga_id_here"
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up the database:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Running Tests

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui
```

## Database Management

### Create a new migration
```bash
npx prisma migrate dev --name migration_name
```

### Reset database
```bash
npx prisma migrate reset
```

### View database in Prisma Studio
```bash
npx prisma studio
```

## API Routes

### Lead Routes
- `POST /api/leads` - Submit waitlist form
- `POST /api/demo` - Submit demo request

### Auth Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

## Features

- ✅ Real forms for waitlist and demo requests
- ✅ User authentication (login/register)
- ✅ Zod validation on all endpoints
- ✅ Anti-spam protection (honeypot + rate limiting)
- ✅ Email notifications with Resend
- ✅ Structured logging
- ✅ SQLite database with Prisma ORM
- ✅ Vercel Analytics integration
- ✅ Integration tests with Vitest

## Production Deployment

1. Set up a production database (PostgreSQL recommended)
2. Update `DATABASE_URL` in your environment variables
3. Configure Resend API key for email notifications
4. Deploy to Vercel or your preferred hosting platform

## Email Configuration

Without email configuration, the application will:
- Log email events to console
- Still save leads/users to the database
- Continue to function normally

To enable email notifications:
1. Sign up at [Resend](https://resend.com)
2. Add your API key to `.env`
3. Configure `FROM_EMAIL` and `NOTIFICATION_EMAIL`
