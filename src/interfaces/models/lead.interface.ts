import {
  leadIndications,
  leadStages,
  leadStageStatuses,
} from '../../schema';

type StageType = (typeof leadStages)[number];
type IndicationType = (typeof leadIndications)[number];
type StageStatusType = (typeof leadStageStatuses)[number];

export interface LeadDoc {
  userId: string;
  name: string;
  email?: string;
  indication: IndicationType;
  phone?: string;
  stage_actual: StageType;
  note?: string;
  stage_status: StageStatusType;
  created_at: Date;
  updated_at: Date;
}
