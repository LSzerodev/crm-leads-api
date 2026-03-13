import { Lead } from "../../models/Lead";

export class DeleteLeadService {
  async exec(leadId: string) {
    const lead = await Lead.findByIdAndDelete(leadId);
    return lead
}
}
