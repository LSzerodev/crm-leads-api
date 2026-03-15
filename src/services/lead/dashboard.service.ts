import type { DashAgg } from '../../interfaces';
import { Lead } from '../../models';
import {
  leadIndications,
  leadStageStatuses,
  leadStages,
  type LeadDashboardQuery,
} from '../../schema';
import { buildDashPipe, emptySum, fillTotals } from './dashboard';
import { buildLeadFilter } from './lead-query-builder';

export class LeadDashboardService {
  async exec(userId: string, filters: LeadDashboardQuery) {
    const match = buildLeadFilter(userId, filters);
    const [dash] = await Lead.aggregate<DashAgg>(buildDashPipe(match));
    const summary = dash?.summary[0] ?? emptySum;

    return {
      summary,
      distributions: {
        by_stage: fillTotals(leadStages, dash?.by_stage ?? []),
        by_status: fillTotals(leadStageStatuses, dash?.by_status ?? []),
        by_indication: fillTotals(leadIndications, dash?.by_indication ?? []),
      },
      applied_filters: filters,
    };
  }
}
