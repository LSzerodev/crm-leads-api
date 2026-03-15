import type { Request, Response } from 'express';
import { leadEditBodySchema, leadParamsSchema } from '../../schema';
import { EditInfoService } from '../../services/lead';
import { sendError, sendSuccess } from '../../utils';

export class EditInfoController {
  async handle(req: Request, res: Response) {
    try {
      const { userId, leadId } = leadParamsSchema.parse(req.params);
      const validatedBody = leadEditBodySchema.parse(req.body);
      const editInfoService = new EditInfoService();
      const updatedLead = await editInfoService.exec(
        userId,
        leadId,
        validatedBody,
      );

      return sendSuccess(res, {
        message: 'Lead info updated successfully.',
        data: updatedLead,
      });
    } catch (error) {
      return sendError(res, error);
    }
  }
}
