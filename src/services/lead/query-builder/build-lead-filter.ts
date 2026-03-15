import type { LeadFiltersQuery } from '../../../schema';
import {
  buildCreatedAtRange,
  buildPresenceCondition,
  escapeRegExp,
} from './query-builder.helpers';
import type { LeadQ } from './query-builder.types';

export function buildLeadFilter(
  userId: string,
  filters: LeadFiltersQuery,
): LeadQ {
  const query: LeadQ = { userId };
  const andConditions: LeadQ[] = [];

  if (filters.stage_actual) {
    query.stage_actual = filters.stage_actual;
  }

  if (filters.stage_status) {
    query.stage_status = filters.stage_status;
  }

  if (filters.indication) {
    query.indication = filters.indication;
  }

  if (filters.name) {
    query.name = {
      $regex: escapeRegExp(filters.name),
      $options: 'i',
    };
  }

  const createdAtRange = buildCreatedAtRange(filters);

  if (createdAtRange) {
    query.created_at = createdAtRange;
  }

  if (filters.has_email !== undefined) {
    andConditions.push(buildPresenceCondition('email', filters.has_email));
  }

  if (filters.has_phone !== undefined) {
    andConditions.push(buildPresenceCondition('phone', filters.has_phone));
  }

  if (andConditions.length > 0) {
    query.$and = andConditions;
  }

  return query;
}
