import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST as registerPOST } from '@/app/api/auth/register/route';
import { POST as loginPOST } from '@/app/api/auth/login/route';
import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';

const mockUser = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  password: 'hashed_password',
  createdAt: new Date(),
  updatedAt: new Date(),
};

vi.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}));

vi.mock('@/lib/email', () => ({
  sendWelcomeEmail: vi.fn().mockResolvedValue({ success: true }),
}));

vi.mock('@/lib/rate-limit', () => ({
  rateLimit: vi.fn().mockReturnValue({ success: true, remaining: 2 }),
}));

vi.mock('bcryptjs', () => ({
  default: {
    hash: vi.fn().mockResolvedValue('hashed_password'),
    compare: vi.fn(),
  },
}));

describe('/api/auth/register', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should register a new user with valid data', async () => {
    const { prisma } = await import('@/lib/prisma');
    
    vi.mocked(prisma.user.findUnique).mockResolvedValue(null);
    vi.mocked(prisma.user.create).mockResolvedValue(mockUser);

    const request = new NextRequest('http://localhost:3000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await registerPOST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.success).toBe(true);
    expect(data.user).toBeDefined();
    expect(data.user.email).toBe('test@example.com');
  });

  it('should reject registration with existing email', async () => {
    const { prisma } = await import('@/lib/prisma');
    
    vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser);

    const request = new NextRequest('http://localhost:3000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await registerPOST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Email already registered');
  });

  it('should reject registration with mismatched passwords', async () => {
    const request = new NextRequest('http://localhost:3000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'different',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await registerPOST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBeDefined();
  });
});

describe('/api/auth/login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should login with valid credentials', async () => {
    const { prisma } = await import('@/lib/prisma');
    
    vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser);
    vi.mocked(bcrypt.compare).mockResolvedValue(true as never);

    const request = new NextRequest('http://localhost:3000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await loginPOST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.user).toBeDefined();
  });

  it('should reject login with non-existent email', async () => {
    const { prisma } = await import('@/lib/prisma');
    
    vi.mocked(prisma.user.findUnique).mockResolvedValue(null);

    const request = new NextRequest('http://localhost:3000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'nonexistent@example.com',
        password: 'password123',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await loginPOST(request);
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe('Invalid email or password');
  });

  it('should reject login with invalid password', async () => {
    const { prisma } = await import('@/lib/prisma');
    
    vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser);
    vi.mocked(bcrypt.compare).mockResolvedValue(false as never);

    const request = new NextRequest('http://localhost:3000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'wrongpassword',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await loginPOST(request);
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe('Invalid email or password');
  });
});
