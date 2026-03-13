import { EditInfoService } from "../../services/lead/editInfos.service";
import type{ Request, Response } from "express";

import {
    leadEditBodySchema,
    leadParamsSchema,
} from "../../schema/lead.schema";

export class EditInfoController {
    async handle(req: Request, res: Response){
        try{
            const { leadId } = leadParamsSchema.parse(req.params)
            const modifyInfosLead = leadEditBodySchema.parse(req.body)

            const editInfoService = new EditInfoService();
            const editInfos = await editInfoService.exec(leadId, modifyInfosLead)

            res.status(200).json({
                message: "Modify in infos" ,
                editInfos
            })
        }catch(error: any){
            res.status(400).json({
              mensagem: 'erro at put Infos: ' + error.message,
            });
        }
    }
}
