import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger';

interface JwtPayload {
  id: number; 
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      token = authHeader.split(' ')[1];
      const secret = process.env.JWT_SECRET;

      if (!secret) {
        throw new Error('Chave secreta JWT não encontrada.');
      }

      const decoded = jwt.verify(token, secret) as JwtPayload;
      req.user = decoded;
      
      logger.info('Token JWT verificado com sucesso.');
      next();
    } catch (error) {
      logger.error('Token inválido ou expirado.', { token });
      return res.status(401).json({ message: 'Não autorizado, token inválido.' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Não autorizado, token não fornecido.' });
  }
};