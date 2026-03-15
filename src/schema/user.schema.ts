import * as z from 'zod';

const emailAccept = [
  'gmail.com',
  'outlook.com',
  'hotmail.com',
  'yahoo.com',
  'icloud.com',
  'proton.me',
  'protonmail.com',
];

const mongoIdRegex = /^[a-f\d]{24}$/i;

const nameSchema = z
  .string()
  .trim()
  .min(3, 'Name must have at least 3 characters')
  .max(80, 'Name must have at most 80 characters');

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, 'Email is required')
  .email('Email must be valid')
  .refine((email) => {
    const domain = email.split('@')[1] ?? '';
    return emailAccept.includes(domain);
  }, 'Use a supported email provider');

const passwordSchema = z
  .string()
  .min(8, 'Password must have at least 8 characters')
  .max(64, 'Password must have at most 64 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one symbol');

const loginPasswordSchema = z
  .string()
  .min(1, 'Password is required');

export const userCreateBodySchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
  })
  .strict();

export const userLoginBodySchema = z
  .object({
    email: emailSchema,
    password: loginPasswordSchema,
  })
  .strict();

export const userDeleteParamsSchema = z.object({
  id: z
    .string()
    .trim()
    .regex(mongoIdRegex, 'id must be a valid MongoDB id.'),
});

export const userSchemaValidation = userCreateBodySchema;

export type UserCreateBody = z.infer<typeof userCreateBodySchema>;
export type UserLoginBody = z.infer<typeof userLoginBodySchema>;
