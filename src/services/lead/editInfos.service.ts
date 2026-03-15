import { Lead } from '../../models';
import type { LeadEditBody } from '../../schema';
import { AppError } from '../../utils';

export class EditInfoService {
  async exec(userId: string, leadId: string, data: LeadEditBody) {
    const lead = await Lead.findOneAndUpdate(
      { _id: leadId, userId },
      { ...data },
      { new: true, runValidators: true },
    );

    if (!lead) {
      throw new AppError('Lead not found for this user.', 404);
    }

    return lead;
  }
}
