import { Lead } from "../../models/Lead";
import {
  leadInitialStage,
  leadInitialStatus,
  type LeadCreateBody,
} from "../../schema/lead.schema";

interface LeadCreatePayload extends LeadCreateBody {
  userId: string;
}

export class LeadCreateService {
  async exec(data: LeadCreatePayload) {
    const lead = await Lead.create({
      userId: data.userId,
      name: data.name,
      indication: data.indication,
      ...(data.email ? { email: data.email } : {}),
      ...(data.phone ? { phone: data.phone } : {}),
      ...(data.note ? { note: data.note } : {}),
      stage_actual: leadInitialStage,
      stage_status: leadInitialStatus,
    });

    return lead
  }
}
