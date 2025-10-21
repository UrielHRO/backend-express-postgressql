import bcrypt from 'bcrypt';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import prisma from '../database/prisma';
import logger from '../utils/logger';

// ==========================================================
// REGISTRO DE USUÁRIO
// ==========================================================
export const registerUser = async (userData: any) => {
  const { name, email, password } = userData;

  if (!name || !email || !password) {
    throw { status: 400, message: 'Todos os campos são obrigatórios.' };
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw { status: 409, message: 'Este email já está em uso.' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  logger.info(`Usuário criado com sucesso: ${email}`);

  // Remove o campo de senha antes de retornar
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// ==========================================================
// LOGIN DE USUÁRIO
// ==========================================================
export const loginUser = async (credentials: any) => {
  const { email, password } = credentials;

  if (!email || !password) {
    throw { status: 400, message: 'Email e senha são obrigatórios.' };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw { status: 401, message: 'Credenciais inválidas.' };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw { status: 401, message: 'Credenciais inválidas.' };
  }

  // --- Configurações do JWT ---
  const secret = process.env.JWT_SECRET as Secret;
  const expiresIn = (process.env.JWT_EXPIRES_IN || '1h') as SignOptions['expiresIn'];

  if (!secret) {
    logger.error('Chave JWT não configurada.');
    throw { status: 500, message: 'Erro interno do servidor.' };
  }

  // --- Criação do token JWT ---
  const payload = { id: user.id, name: user.name };
  const options: SignOptions = { expiresIn };

  const token = jwt.sign(payload, secret, options);

  logger.info(`Login bem-sucedido para o usuário: ${email}`);
  return { token };
};
