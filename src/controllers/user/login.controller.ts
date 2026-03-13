import type { Request, Response } from 'express';
import { LoginService } from '../../services/user/login.service';

export class LoginUserController {
  async handle(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const loginUserService = new LoginService();

      const loginUser = await loginUserService.exec({
        email,
        password,
      });

      res.status(200).json({
        mensagem: 'Login is sucess',
        loginUser,
      });

    } catch (error: any) {
      res.status(400).json({
        mensagem: 'erro no auth/login: ' + error.message,
      });
    }
  }
}
