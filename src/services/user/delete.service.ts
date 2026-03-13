import { User } from "../../models/User";

export class DeleteUserService {
    async exec(id: string){
        const deleteUser = await User.findByIdAndDelete(id as string)
        return  deleteUser
    }
}
