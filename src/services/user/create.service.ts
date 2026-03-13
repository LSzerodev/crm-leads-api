import { User } from "../../models/User";

interface RegisterUserProps {
    name: string
    email: string
    password: string
}

export class CreateUserService {
  async exec(data: RegisterUserProps) {
    const user = await User.findOne({ email: data.email });

    if (user) {
      throw new Error('This email already exists.');
    }

    const dataUser = await User.create({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    return dataUser;
  }
}


// try {
//     //     const { name, email, password } = req.body;
//     //     const register = await User.create({
//     //       name,
//     //       email,
//     //       password,
//     //     });
//     //     res.status(201).json({
//     //       mensagem: 'usuario cadastrado',
//     //       register,
//     //     });
//     //   } catch (error: any) {
//     //     console.error('erro no /users registerUser', error);
