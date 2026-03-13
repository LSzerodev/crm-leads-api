import mongoose from 'mongoose';

// Model User -> Pode ser utilizado para qualquer coisa relacionada ao meu user como cadastro, login, buscar user
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

export const User = mongoose.model('users', userSchema);
