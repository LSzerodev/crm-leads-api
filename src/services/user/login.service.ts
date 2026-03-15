import { User } from '../../models';
import type { UserLoginBody } from '../../schema';
import { AppError } from '../../utils';

export class LoginService {
  async exec(data: UserLoginBody) {
    const user = await User.findOne({
      email: data.email,
      password: data.password,
    });

    if (!user) {
      throw new AppError('Email or password is invalid.', 401);
    }

    return user;
  }
}
