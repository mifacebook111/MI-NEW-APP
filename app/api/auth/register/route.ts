import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { registerSchema } from '@/lib/validations';
import { rateLimit } from '@/lib/rate-limit';
import { sendWelcomeEmail } from '@/lib/email';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    
    const rateLimitResult = rateLimit(`register:${ip}`, 3, 3600000);
    if (!rateLimitResult.success) {
      logger.warn('Rate limit exceeded', { ip, endpoint: 'register' });
      return NextResponse.json(
        { error: 'Too many registration attempts. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validatedData = registerSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      logger.warn('Registration attempt with existing email', { email: validatedData.email });
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
      },
    });

    logger.info('User registered', { userId: user.id, email: user.email });

    await sendWelcomeEmail(user.email, user.name);

    return NextResponse.json(
      {
        success: true,
        message: 'Account created successfully!',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error && 'issues' in error) {
      logger.warn('Validation error', { error: error.message });
      return NextResponse.json(
        { error: 'Validation failed', details: error },
        { status: 400 }
      );
    }

    logger.error('Failed to register user', { error: String(error) });
    return NextResponse.json(
      { error: 'Failed to create account. Please try again.' },
      { status: 500 }
    );
  }
}
