import type{ Request, Response } from "express";
import {
  leadCreateBodySchema,
  leadUserParamsSchema,
} from "../../schema/lead.schema";
import { LeadCreateService } from "../../services/lead/create.service";

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

      res.status(200).json({
        mensagem: 'Lead created for sucess',
        lead,
      });

    } catch (error: any) {
      res.status(400).json({
        mensagem: 'erro at lead: ' + error.message,
      });
    }
  }
}
