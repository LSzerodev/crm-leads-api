import type { Request, Response } from 'express';
import {
  leadParamsSchema,
  leadStageBodySchema,
} from '../../schema/lead.schema';
import { StagePutService } from '../../services/lead/stage.service';

export class StagePutController {
  async handle(req: Request, res: Response) {
    try {
      const { leadId } = leadParamsSchema.parse(req.params);
      const { stage_actual, stage_status } = leadStageBodySchema.parse(req.body);

      const stageService = new StagePutService();
      const stage = await stageService.exec(leadId, stage_actual, stage_status);
      res.status(200).json({
        mensagem: 'Lead put for sucess',
        stage,
      });

    } catch (error: any) {

      res.status(400).json({
        mensagem: 'erro at put: ' + error.message,
      });
    }
  }
}
