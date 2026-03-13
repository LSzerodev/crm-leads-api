import type { Request, Response } from 'express';
import { SearchUserService } from '../../services/user/search-users.service';

export class SearchUsersController{
    async handle(req: Request, res: Response){
        try{
            const searchUsersService = new SearchUserService()
            const search = await searchUsersService.exec()

            return res.status(200).json({
                mensagem: "db users",
                search
            })
        }catch(error: any){
            res.status(400).json({
              mensagem: 'erro ao procurar db: ' + error.message,
            });
        }
    }
}
