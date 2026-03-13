import { Lead } from '../../models/Lead';
import type { LeadEditBody } from '../../schema/lead.schema';

export class EditInfoService {
  async exec(leadId: string, data: LeadEditBody) {
    const lead = await Lead.findByIdAndUpdate( leadId, {...data},
      { runValidators: true, returnDocument: 'after' }
    );
    return lead;
  }
}
