import type { Request, Response } from 'express';
import { userCreateBodySchema } from '../../schema';
import { CreateUserService } from '../../services/user';
import { sendError, sendSuccess } from '../../utils';

export class CreateUserController {
  async handle(req: Request, res: Response) {
    try {
      const createService = new CreateUserService();
      const validatedBody = userCreateBodySchema.parse(req.body);
      const createdUser = await createService.exec(validatedBody);

      return sendSuccess(res, {
        status: 201,
        message: 'User created successfully.',
        data: createdUser,
      });
    } catch (error) {
      return sendError(res, error);
    }
  }
}
