import mongoose from 'mongoose';
import type { UserDoc } from '../interfaces';

// Model User -> Pode ser utilizado para qualquer coisa relacionada ao meu user como cadastro, login, buscar user
const userSchema = new mongoose.Schema<UserDoc>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'create_d',
      updatedAt: false,
    },
  },
);

export const User = mongoose.model<UserDoc>('users', userSchema);
