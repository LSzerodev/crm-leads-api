import { Lead } from '../../models';
import type { LeadFiltersQuery } from '../../schema';
import { buildLeadFilter, buildLeadSort } from './lead-query-builder';

export class GetLeadsService {
  async exec(userId: string, filters: LeadFiltersQuery) {
    const query = buildLeadFilter(userId, filters);
    const sort = buildLeadSort(filters);

    return Lead.find(query).sort(sort);
  }
}
