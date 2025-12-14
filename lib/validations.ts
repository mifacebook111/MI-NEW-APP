import { z } from 'zod';

export const joinWaitlistSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  industry: z.string().optional(),
  volume: z.string().optional(),
  honeypot: z.string().max(0, 'Invalid submission').optional(),
});

export const bookDemoSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  company: z.string().min(2, 'Company must be at least 2 characters').max(100).optional(),
  message: z.string().max(500, 'Message too long').optional(),
  honeypot: z.string().max(0, 'Invalid submission').optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters').max(100),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export type JoinWaitlistInput = z.infer<typeof joinWaitlistSchema>;
export type BookDemoInput = z.infer<typeof bookDemoSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
