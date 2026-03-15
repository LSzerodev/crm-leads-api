import type { LeadCreateData } from '../../interfaces';
import { Lead } from '../../models';
import { leadInitialStage, leadInitialStatus } from '../../schema';

export class LeadCreateService {
  async exec(data: LeadCreateData) {
    return Lead.create({
      userId: data.userId,
      name: data.name,
      indication: data.indication,
      ...(data.email ? { email: data.email } : {}),
      ...(data.phone ? { phone: data.phone } : {}),
      ...(data.note ? { note: data.note } : {}),
      stage_actual: leadInitialStage,
      stage_status: leadInitialStatus,
    });
  }
}
