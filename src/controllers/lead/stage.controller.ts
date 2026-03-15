import type { Request, Response } from 'express';
import { leadParamsSchema, leadStageBodySchema } from '../../schema';
import { StagePutService } from '../../services/lead';
import { sendError, sendSuccess } from '../../utils';

export class StagePutController {
  async handle(req: Request, res: Response) {
    try {
      const { userId, leadId } = leadParamsSchema.parse(req.params);
      const { stage_actual, stage_status } = leadStageBodySchema.parse(req.body);
      const stageService = new StagePutService();
      const stage = await stageService.exec(
        userId,
        leadId,
        stage_actual,
        stage_status,
      );

      return sendSuccess(res, {
        message: 'Lead stage updated successfully.',
        data: stage,
      });
    } catch (error) {
      return sendError(res, error);
    }
  }
}
