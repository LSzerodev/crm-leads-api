import type { DashSummary } from '../../../interfaces';

export const emptySum: DashSummary = {
  total: 0,
  in_progress: 0,
  closed: 0,
  refused: 0,
  with_email: 0,
  without_email: 0,
  with_phone: 0,
  without_phone: 0,
  latest_created_at: null,
  latest_updated_at: null,
};
