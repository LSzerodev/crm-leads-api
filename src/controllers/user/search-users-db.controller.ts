import type { Request, Response } from 'express';
import { SearchUserService } from '../../services/user';
import { sendError, sendSuccess } from '../../utils';

export class SearchUsersController {
  async handle(_req: Request, res: Response) {
    try {
      const searchUsersService = new SearchUserService();
      const users = await searchUsersService.exec();

      return sendSuccess(res, {
        message: 'Users fetched successfully.',
        data: users,
        meta: {
          total: users.length,
        },
      });
    } catch (error) {
      return sendError(res, error);
    }
  }
}
