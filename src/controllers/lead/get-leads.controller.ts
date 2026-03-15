import type { Request, Response } from 'express';
import { leadFiltersQuerySchema, leadUserParamsSchema } from '../../schema';
import { GetLeadsService } from '../../services/lead';
import { sendError, sendSuccess } from '../../utils';

export class GetLeadsController {
  async handle(req: Request, res: Response) {
    try {
      const { userId } = leadUserParamsSchema.parse(req.params);
      const filters = leadFiltersQuerySchema.parse(req.query);
      const getLeadService = new GetLeadsService();
      const leads = await getLeadService.exec(userId, filters);

      return sendSuccess(res, {
        message: 'Leads fetched successfully.',
        data: leads,
        meta: {
          total: leads.length,
          filters,
        },
      });
    } catch (error) {
      return sendError(res, error);
    }
  }
}
