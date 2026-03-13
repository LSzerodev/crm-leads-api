import { userSchemaValidation } from "../../schema/user.schema";
import { CreateUserService } from "../../services/user/create.service";
import type{ Request, Response } from "express";

export class CreateUserController {
  async handle(req: Request, res: Response){
    try {
        const createService = new CreateUserService()
        const validation = userSchemaValidation.parse(req.body)

        const createUser = await createService.exec(validation)

        res.status(201).json({
          mensagem: 'usuario cadastrado',
          createUser,
        });

      } catch (error: any) {

        res.status(400).json({
          mensagem: "erro at user: " + error.message,
        });
      }
  }
}
