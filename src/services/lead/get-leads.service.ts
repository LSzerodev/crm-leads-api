import { Lead } from "../../models/Lead";

export class GetLeadsService {
  async exec(userId: string) {
    const LeadsFromById = await Lead.find({ userId: userId });
    return LeadsFromById;
  }
}
