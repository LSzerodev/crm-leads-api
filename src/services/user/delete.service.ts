import { User } from '../../models';
import { AppError } from '../../utils';

export class DeleteUserService {
  async exec(id: string) {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      throw new AppError('User not found.', 404);
    }
  }
}
