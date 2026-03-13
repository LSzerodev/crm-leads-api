import { User } from '../../models/User';

interface LoginPropsService {
  email: string;
  password: string;
}

export class LoginService {
  async exec(data: LoginPropsService) {
      const user = await User.findOne({ email: data.email, password: data.password });

      if(!user){
        throw new Error('email or password is invalid')
      }

      return user
}
}
