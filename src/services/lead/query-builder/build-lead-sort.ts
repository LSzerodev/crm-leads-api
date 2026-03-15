import { type SortOrder } from 'mongoose';
import type { LeadFiltersQuery } from '../../../schema';

export function buildLeadSort(filters: LeadFiltersQuery) {
  return {
    [filters.sort_by]: filters.sort_order === 'asc' ? 1 : -1,
  } as Record<string, SortOrder>;
}
