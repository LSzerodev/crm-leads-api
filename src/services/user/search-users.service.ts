import { User } from '../../models/User';


export class SearchUserService {
  async exec() {
    const users = await User.find()
    return users
  }
}
