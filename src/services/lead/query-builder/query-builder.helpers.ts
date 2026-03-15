import type { LeadFiltersQuery } from '../../../schema';
import type { LeadQ } from './query-builder.types';

export function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function parseDateBoundary(value: string, boundary: 'start' | 'end') {
  if (!value.includes('T')) {
    return boundary === 'start'
      ? new Date(`${value}T00:00:00.000Z`)
      : new Date(`${value}T23:59:59.999Z`);
  }

  return new Date(value);
}

export function buildCreatedAtRange(filters: LeadFiltersQuery) {
  const createdAtRange: {
    $gte?: Date;
    $lte?: Date;
  } = {};

  if (filters.created_from) {
    createdAtRange.$gte = parseDateBoundary(filters.created_from, 'start');
  }

  if (filters.created_to) {
    createdAtRange.$lte = parseDateBoundary(filters.created_to, 'end');
  }

  return Object.keys(createdAtRange).length > 0 ? createdAtRange : undefined;
}

export function buildPresenceCondition(
  field: 'email' | 'phone',
  hasValue: boolean,
): LeadQ {
  if (hasValue) {
    return {
      [field]: {
        $exists: true,
        $ne: '',
      },
    } as LeadQ;
  }

  return {
    $or: [
      {
        [field]: {
          $exists: false,
        },
      },
      {
        [field]: '',
      },
      {
        [field]: null,
      },
    ],
  } as LeadQ;
}
