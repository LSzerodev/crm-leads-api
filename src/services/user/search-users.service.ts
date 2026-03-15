import { User } from '../../models';

export class SearchUserService {
  async exec() {
    return User.find().sort({ create_d: -1 });
  }
}
