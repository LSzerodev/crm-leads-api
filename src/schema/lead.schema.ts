import { z } from 'zod';

export const leadIndications = [
  'Instagram',
  'LinkedIn',
  'WhatsApp',
  'Site',
  'Indicação',
  'Facebook',
  'Outro',
] as const;

export const leadStages = ['Novo', 'Proposta enviada', 'Negociação'] as const;

export const leadStageStatuses = [
  'Finalizado',
  'Recusado',
  'em andamento',
] as const;

export const leadInitialStage = 'Novo' as const;
export const leadInitialStatus = 'em andamento' as const;

const mongoIdRegex = /^[a-f\d]{24}$/i;

const optionalString = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((value) => {
    if (typeof value !== 'string') {
      return value;
    }

    const trimmed = value.trim();
    return trimmed === '' ? undefined : trimmed;
  }, schema.optional());

const requiredLeadNameSchema = z
  .string()
  .trim()
  .min(2, 'Lead name must have at least 2 characters.')
  .max(120, 'Lead name must have at most 120 characters.');

const optionalLeadEmailSchema = optionalString(
  z
    .string()
    .email('Lead email must be a valid email address.')
    .max(255, 'Lead email must have at most 255 characters.')
    .transform((value) => value.toLowerCase()),
);

const optionalLeadPhoneSchema = optionalString(
  z
    .string()
    .regex(
      /^[0-9()+\-\s]{8,20}$/,
      'Lead phone must contain 8 to 20 valid characters.',
    ),
);

const optionalLeadNoteSchema = optionalString(
  z
    .string()
    .max(500, 'Lead note must have at most 500 characters.'),
);

export const leadUserParamsSchema = z.object({
  userId: z
    .string()
    .trim()
    .regex(mongoIdRegex, 'userId must be a valid MongoDB id.'),
});

export const leadParamsSchema = z.object({
  userId: z
    .string()
    .trim()
    .regex(mongoIdRegex, 'userId must be a valid MongoDB id.'),
  leadId: z
    .string()
    .trim()
    .regex(mongoIdRegex, 'leadId must be a valid MongoDB id.'),
});

export const leadCreateBodySchema = z
  .object({
    name: requiredLeadNameSchema,
    email: optionalLeadEmailSchema,
    indication: z.enum(leadIndications),
    phone: optionalLeadPhoneSchema,
    note: optionalLeadNoteSchema,
  })
  .strict();

export const leadEditBodySchema = z
  .object({
    name: optionalString(requiredLeadNameSchema),
    email: optionalLeadEmailSchema,
    indication: z.enum(leadIndications).optional(),
    phone: optionalLeadPhoneSchema,
    note: optionalLeadNoteSchema,
  })
  .strict()
  .refine(
    (data) => Object.values(data).some((value) => value !== undefined),
    'Send at least one field to update.',
  );

export const leadStageBodySchema = z
  .object({
    stage_actual: z.enum(leadStages),
    stage_status: z.enum(leadStageStatuses),
  })
  .strict();

export type LeadCreateBody = z.infer<typeof leadCreateBodySchema>;
export type LeadEditBody = z.infer<typeof leadEditBodySchema>;
export type LeadStageBody = z.infer<typeof leadStageBodySchema>;
