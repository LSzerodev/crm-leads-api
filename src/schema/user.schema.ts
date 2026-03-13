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
  .min(8, 'A senha deve ter pelo menos 8 caracteres')
  .max(64, 'A senha deve ter no máximo 64 caracteres')
  .regex(/[A-Z]/, 'Deve ter pelo menos uma letra maiúscula')
  .regex(/[a-z]/, 'Deve ter pelo menos uma letra minúscula')
  .regex(/[0-9]/, 'Deve ter pelo menos um número')
  .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Deve ter pelo menos um símbolo');

export const userSchemaValidation = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
}).strict();
