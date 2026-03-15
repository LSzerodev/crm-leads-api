import type { Request, Response } from 'express';
import { leadParamsSchema } from '../../schema';
import { DeleteLeadService } from '../../services/lead';
import { sendError, sendNoContent } from '../../utils';

export class DeleteLeadController {
  async handle(req: Request, res: Response) {
    try {
      const { userId, leadId } = leadParamsSchema.parse(req.params);
      const deleteService = new DeleteLeadService();

      await deleteService.exec(userId, leadId);

      return sendNoContent(res);
    } catch (error) {
      return sendError(res, error);
    }
  }
}
