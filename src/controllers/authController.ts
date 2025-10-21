import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/authService';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json({ message: 'Usuário criado com sucesso!', user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = await authService.loginUser(req.body);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

export const getProtectedData = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Acesso autorizado à rota protegida!' });
};