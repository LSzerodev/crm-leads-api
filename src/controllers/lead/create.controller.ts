import type { Request, Response } from 'express';
import { leadCreateBodySchema, leadUserParamsSchema } from '../../schema';
import { LeadCreateService } from '../../services/lead';
import { sendError, sendSuccess } from '../../utils';

export class LeadCreateController {
  async handle(req: Request, res: Response) {
    try {
      const { userId } = leadUserParamsSchema.parse(req.params);
      const validatedBody = leadCreateBodySchema.parse(req.body);
      const leadService = new LeadCreateService();
      const lead = await leadService.exec({
        userId,
        ...validatedBody,
      });

      return sendSuccess(res, {
        status: 201,
        message: 'Lead created successfully.',
        data: lead,
      });
    } catch (error) {
      return sendError(res, error);
    }
  }
}
