import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { joinWaitlistSchema } from '@/lib/validations';
import { rateLimit } from '@/lib/rate-limit';
import { sendLeadNotification } from '@/lib/email';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    
    const rateLimitResult = rateLimit(`leads:${ip}`, 5, 60000);
    if (!rateLimitResult.success) {
      logger.warn('Rate limit exceeded', { ip, endpoint: 'leads' });
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    
    if (body.honeypot && body.honeypot.length > 0) {
      logger.warn('Honeypot triggered', { ip });
      return NextResponse.json(
        { error: 'Invalid submission' },
        { status: 400 }
      );
    }

    const validatedData = joinWaitlistSchema.parse(body);

    const lead = await prisma.lead.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        industry: validatedData.industry,
        volume: validatedData.volume,
        source: 'waitlist',
      },
    });

    logger.info('Lead created', { leadId: lead.id, email: lead.email });

    await sendLeadNotification({
      name: lead.name,
      email: lead.email,
      industry: lead.industry || undefined,
      volume: lead.volume || undefined,
      source: 'waitlist',
    });

    return NextResponse.json(
      { success: true, message: 'Thank you for joining our waitlist!' },
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

    logger.error('Failed to create lead', { error: String(error) });
    return NextResponse.json(
      { error: 'Failed to process your request. Please try again.' },
      { status: 500 }
    );
  }
}
