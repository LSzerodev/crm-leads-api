import type { Request, Response } from 'express';
import { userLoginBodySchema } from '../../schema';
import { LoginService } from '../../services/user';
import { sendError, sendSuccess } from '../../utils';

export class LoginUserController {
  async handle(req: Request, res: Response) {
    try {
      const loginUserService = new LoginService();
      const validatedBody = userLoginBodySchema.parse(req.body);
      const loggedUser = await loginUserService.exec(validatedBody);

      return sendSuccess(res, {
        message: 'Login successful.',
        data: loggedUser,
      });
    } catch (error) {
      return sendError(res, error);
    }
  }
}
