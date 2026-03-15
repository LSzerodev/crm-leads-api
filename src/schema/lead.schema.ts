import { z } from 'zod';

export const leadIndications = [
  'Instagram',
  'LinkedIn',
  'WhatsApp',
  'Site',
  'Indica\u00e7\u00e3o',
  'Facebook',
  'Outro',
] as const;

export const leadStages = ['Novo', 'Proposta enviada', 'Negocia\u00e7\u00e3o'] as const;

export const leadStageStatuses = [
  'Finalizado',
  'Recusado',
  'em andamento',
] as const;

export const leadInitialStage = 'Novo' as const;
export const leadInitialStatus = 'em andamento' as const;
export const leadSortFields = [
  'created_at',
  'updated_at',
  'name',
  'indication',
  'stage_actual',
  'stage_status',
] as const;
export const leadSortOrders = ['asc', 'desc'] as const;

const mongoIdRegex = /^[a-f\d]{24}$/i;

const getSingleQueryValue = (value: unknown) =>
  Array.isArray(value) ? value[0] : value;

const optionalQueryString = z.preprocess((value) => {
  const normalizedValue = getSingleQueryValue(value);

  if (typeof normalizedValue !== 'string') {
    return normalizedValue;
  }

  const trimmed = normalizedValue.trim();
  return trimmed === '' ? undefined : trimmed;
}, z.string().optional());

const optionalBooleanQuery = z.preprocess((value) => {
  const normalizedValue = getSingleQueryValue(value);

  if (normalizedValue === undefined) {
    return undefined;
  }

  if (normalizedValue === 'true') {
    return true;
  }

  if (normalizedValue === 'false') {
    return false;
  }

  return normalizedValue;
}, z.boolean().optional());

const optionalDateQuery = optionalQueryString.refine(
  (value) => value === undefined || !Number.isNaN(Date.parse(value)),
  'Date filters must be valid ISO strings or YYYY-MM-DD.',
);

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

export const leadFiltersQuerySchema = z
  .object({
    stage_actual: z.preprocess(
      (value) => {
        const normalizedValue = getSingleQueryValue(value);
        return normalizedValue === '' ? undefined : normalizedValue;
      },
      z.enum(leadStages).optional(),
    ),
    stage_status: z.preprocess(
      (value) => {
        const normalizedValue = getSingleQueryValue(value);
        return normalizedValue === '' ? undefined : normalizedValue;
      },
      z.enum(leadStageStatuses).optional(),
    ),
    indication: z.preprocess(
      (value) => {
        const normalizedValue = getSingleQueryValue(value);
        return normalizedValue === '' ? undefined : normalizedValue;
      },
      z.enum(leadIndications).optional(),
    ),
    name: optionalQueryString,
    has_email: optionalBooleanQuery,
    has_phone: optionalBooleanQuery,
    created_from: optionalDateQuery,
    created_to: optionalDateQuery,
    sort_by: z.preprocess(
      (value) => {
        const normalizedValue = getSingleQueryValue(value);
        return normalizedValue === '' || normalizedValue === undefined
          ? undefined
          : normalizedValue;
      },
      z.enum(leadSortFields).default('created_at'),
    ),
    sort_order: z.preprocess(
      (value) => {
        const normalizedValue = getSingleQueryValue(value);
        return normalizedValue === '' || normalizedValue === undefined
          ? undefined
          : normalizedValue;
      },
      z.enum(leadSortOrders).default('desc'),
    ),
  })
  .strict()
  .refine(
    (data) => {
      if (!data.created_from || !data.created_to) {
        return true;
      }

      return new Date(data.created_from).getTime() <= new Date(data.created_to).getTime();
    },
    {
      message: 'created_from must be before or equal to created_to.',
      path: ['created_to'],
    },
  );

export const leadDashboardQuerySchema = leadFiltersQuerySchema;

export type LeadCreateBody = z.infer<typeof leadCreateBodySchema>;
export type LeadEditBody = z.infer<typeof leadEditBodySchema>;
export type LeadStageBody = z.infer<typeof leadStageBodySchema>;
export type LeadFiltersQuery = z.infer<typeof leadFiltersQuerySchema>;
export type LeadDashboardQuery = z.infer<typeof leadDashboardQuerySchema>;
