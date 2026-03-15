import { Lead } from '../../models';
import type { LeadStageBody } from '../../schema';
import { AppError } from '../../utils';

export class StagePutService {
  async exec(
    userId: string,
    leadId: string,
    stage_actual: LeadStageBody['stage_actual'],
    stage_status: LeadStageBody['stage_status'],
  ) {
    const lead = await Lead.findOneAndUpdate(
      { _id: leadId, userId },
      { stage_actual, stage_status },
      { new: true, runValidators: true },
    );

    if (!lead) {
      throw new AppError('Lead not found for this user.', 404);
    }

    return lead;
  }
}
