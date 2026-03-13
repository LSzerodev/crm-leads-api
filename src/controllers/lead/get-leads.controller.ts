import { GetLeadsService } from "../../services/lead/get-leads.service";
import type { Request, Response } from 'express';
import { leadUserParamsSchema } from "../../schema/lead.schema";

export class GetLeadsController {
    async handle(req: Request, res: Response){
        try{
            const { userId } = leadUserParamsSchema.parse(req.params)
            const getLeadService =  new GetLeadsService();
            const getLeads = await getLeadService.exec(userId);

             res.status(200).json({
              mensagem: 'Lead list for sucess',
              getLeads,
            });

        }catch(error: any){
            

            res.status(400).json({
              error: 'erro at getLeads: ' + error.message,
            });
        }

    }
}
