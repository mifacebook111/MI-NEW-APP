import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '@/app/api/demo/route';
import { NextRequest } from 'next/server';

vi.mock('@/lib/prisma', () => ({
  prisma: {
    lead: {
      create: vi.fn().mockResolvedValue({
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        source: 'demo',
        metadata: JSON.stringify({ company: 'Test Corp', message: 'Hello' }),
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
  rateLimit: vi.fn().mockReturnValue({ success: true, remaining: 2 }),
}));

describe('/api/demo', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create a demo request with valid data', async () => {
    const request = new NextRequest('http://localhost:3000/api/demo', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Corp',
        message: 'I would like a demo',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.success).toBe(true);
    expect(data.message).toContain('demo');
  });

  it('should reject demo request with missing required fields', async () => {
    const request = new NextRequest('http://localhost:3000/api/demo', {
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

  it('should accept demo request without optional fields', async () => {
    const request = new NextRequest('http://localhost:3000/api/demo', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.success).toBe(true);
  });
});
