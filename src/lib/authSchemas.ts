import { z } from 'zod';

export const emailSchema = z
  .string()
  .trim()
  .email({ message: 'Enter a valid email address' })
  .max(255);

export const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters' })
  .max(72, { message: 'Password is too long' });

export const signUpSchema = z.object({
  fullName: z.string().trim().min(1, { message: 'Full name is required' }).max(120),
  email: emailSchema,
  password: passwordSchema,
});

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, { message: 'Password is required' }).max(72),
});

export const forgotSchema = z.object({ email: emailSchema });

export const resetSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const profileUpdateSchema = z.object({
  full_name: z.string().trim().max(120).nullable().optional(),
  username: z
    .string()
    .trim()
    .min(3, { message: 'Username must be at least 3 characters' })
    .max(40)
    .regex(/^[a-zA-Z0-9_.-]+$/, { message: 'Only letters, numbers, . _ -' })
    .nullable()
    .optional()
    .or(z.literal('')),
  bio: z.string().trim().max(500).nullable().optional(),
  avatar_url: z.string().trim().url({ message: 'Enter a valid URL' }).max(500).nullable().optional().or(z.literal('')),
});
