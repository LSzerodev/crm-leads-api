
import { Lead } from "../../models/Lead";
import type { LeadStageBody } from "../../schema/lead.schema";

export class StagePutService {
  async exec(
    id: string,
    stage_actual: LeadStageBody['stage_actual'],
    stage_status: LeadStageBody['stage_status'],
  ) {
    const lead = await Lead.findByIdAndUpdate(id, { stage_actual, stage_status }, { new: true, runValidators: true });
    return lead;
  }
}
