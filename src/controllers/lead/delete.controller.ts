import type { Request, Response } from 'express';
import { leadParamsSchema } from '../../schema/lead.schema';
import { DeleteLeadService } from '../../services/lead/delete.service';

export class DeleteLeadController {
  async handle(req: Request, res: Response) {
    try {
      const { leadId } = leadParamsSchema.parse(req.params);
      const deleteService = new DeleteLeadService();
      const deleteLead = await deleteService.exec(leadId);

      res.status(204).send(deleteLead)

    } catch (error: any) {
      res.status(400).json({
        error: 'erro at getLeads: ' + error.message,
      });
    }
  }
}
