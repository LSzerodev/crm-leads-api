import mongoose from 'mongoose';
import { leadIndications, leadStages, leadStageStatuses } from '../schema';
import type { LeadDoc } from '../interfaces';

const leadSchema = new mongoose.Schema<LeadDoc>(
  {
    userId: {
      type: String,
      required: true,
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
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

export const Lead = mongoose.model<LeadDoc>('lead', leadSchema);
