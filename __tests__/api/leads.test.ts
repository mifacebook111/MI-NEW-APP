import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '@/app/api/leads/route';
import { NextRequest } from 'next/server';

vi.mock('@/lib/prisma', () => ({
  prisma: {
    lead: {
      create: vi.fn().mockResolvedValue({
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        industry: 'technology',
        volume: '0-100',
        source: 'waitlist',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    },
  },
}));

vi.mock('@/lib/email', () => ({
  sendLeadNotification: vi.fn().mockResolvedValue({ success: true }),
}));

vi.mock('@/lib/rate-limit', () => ({
  rateLimit: vi.fn().mockReturnValue({ success: true, remaining: 4 }),
}));

describe('/api/leads', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create a lead with valid data', async () => {
    const request = new NextRequest('http://localhost:3000/api/leads', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        industry: 'technology',
        volume: '0-100',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.success).toBe(true);
    expect(data.message).toContain('waitlist');
  });

  it('should reject lead with missing required fields', async () => {
    const request = new NextRequest('http://localhost:3000/api/leads', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBeDefined();
  });

  it('should reject lead with invalid email', async () => {
    const request = new NextRequest('http://localhost:3000/api/leads', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'invalid-email',
        industry: 'technology',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBeDefined();
  });

  it('should block honeypot spam', async () => {
    const request = new NextRequest('http://localhost:3000/api/leads', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        industry: 'technology',
        honeypot: 'bot-value',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid submission');
  });
});
