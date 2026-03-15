import type { Request, Response } from 'express';
import { userDeleteParamsSchema } from '../../schema';
import { DeleteUserService } from '../../services/user';
import { sendError, sendNoContent } from '../../utils';

export class DeleteUserController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = userDeleteParamsSchema.parse(req.params);
      const deleteUserService = new DeleteUserService();

      await deleteUserService.exec(id);

      return sendNoContent(res);
    } catch (error) {
      return sendError(res, error);
    }
  }
}
