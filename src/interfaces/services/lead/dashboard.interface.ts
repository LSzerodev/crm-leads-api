export interface DashBucket {
  _id: string;
  total: number;
}

export interface DashSummary {
  total: number;
  in_progress: number;
  closed: number;
  refused: number;
  with_email: number;
  without_email: number;
  with_phone: number;
  without_phone: number;
  latest_created_at: Date | null;
  latest_updated_at: Date | null;
}

export interface DashAgg {
  summary: DashSummary[];
  by_stage: DashBucket[];
  by_status: DashBucket[];
  by_indication: DashBucket[];
}
