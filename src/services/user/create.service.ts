import { User } from '../../models';
import type { UserCreateBody } from '../../schema';
import { AppError } from '../../utils';

export class CreateUserService {
  async exec(data: UserCreateBody) {
    const user = await User.findOne({ email: data.email });

    if (user) {
      throw new AppError('This email already exists.', 409);
    }

    return User.create({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  }
}
