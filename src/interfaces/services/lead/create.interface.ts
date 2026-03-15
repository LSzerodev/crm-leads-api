import type { LeadCreateBody } from '../../../schema';

export interface LeadCreateData extends LeadCreateBody {
  userId: string;
}
