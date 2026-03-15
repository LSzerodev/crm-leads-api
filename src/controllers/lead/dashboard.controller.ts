import type { Request, Response } from 'express';
import { leadDashboardQuerySchema, leadUserParamsSchema } from '../../schema';
import { LeadDashboardService } from '../../services/lead';
import { sendError, sendSuccess } from '../../utils';

export class LeadDashboardController {
  async handle(req: Request, res: Response) {
    try {
      const { userId } = leadUserParamsSchema.parse(req.params);
      const filters = leadDashboardQuerySchema.parse(req.query);
      const dashboardService = new LeadDashboardService();
      const dashboard = await dashboardService.exec(userId, filters);

      return sendSuccess(res, {
        message: 'Lead dashboard fetched successfully.',
        data: dashboard,
      });
    } catch (error) {
      return sendError(res, error);
    }
  }
}
