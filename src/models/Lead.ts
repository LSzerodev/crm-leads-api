import mongoose from 'mongoose';
import {
  leadIndications,
  leadStages,
  leadStageStatuses,
} from '../schema/lead.schema';

type StageType = (typeof leadStages)[number];
type IndicationType = (typeof leadIndications)[number];
type StageStatusType = (typeof leadStageStatuses)[number];

export interface ILeadCreate {
  userId: string;
  name: string;
  email?: string;
  indication: IndicationType;
  phone?: string;
  stage_actual: StageType;
  note?: string;
  stage_status: StageStatusType;
}

const leadSchema = new mongoose.Schema<ILeadCreate>({
  userId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: false,
  },

  indication: {
    type: String,
    enum: leadIndications,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },

  note: {
    type: String,
    required: false,
  },
  stage_actual: {
    type: String,
    enum: leadStages,
    required: true,
  },
  stage_status: {
    type: String,
    enum: leadStageStatuses,
    required: true,
  },
});

export const Lead = mongoose.model<ILeadCreate>('lead', leadSchema);
