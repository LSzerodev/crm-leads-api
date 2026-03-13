import type { Request, Response } from 'express';
import { DeleteUserService } from '../../services/user/delete.service';

export class DeleteUserController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deleteUserService = new DeleteUserService();
      const deleteUser = await deleteUserService.exec(id as string);
      res.status(204).send(deleteUser);
    } catch (error: any) {
      res.status(400).json({
        mensagem: 'error for delete is User: ' + error.message,
      });
    }
  }
}
