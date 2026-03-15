import { Lead } from '../../models';
import { AppError } from '../../utils';

export class DeleteLeadService {
  async exec(userId: string, leadId: string) {
    const deletedLead = await Lead.findOneAndDelete({
      _id: leadId,
      userId,
    });

    if (!deletedLead) {
      throw new AppError('Lead not found for this user.', 404);
    }
  }
}
