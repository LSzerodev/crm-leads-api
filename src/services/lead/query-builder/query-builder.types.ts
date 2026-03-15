import mongoose from 'mongoose';
import type { LeadDoc } from '../../../interfaces';

export type LeadQ = mongoose.QueryFilter<LeadDoc>;
