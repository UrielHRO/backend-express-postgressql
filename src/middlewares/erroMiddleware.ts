import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

// Interface customizada para o erro
interface CustomError extends Error {
    status?: number;
    errors?: any; // Propriedade para erros de validação do Mongoose
}

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    // Define o status e a mensagem padrão
    let statusCode = err.status || 500;
    let message = err.message || 'Erro interno do servidor';
    
    // NOVO: Tratamento específico para erros de validação do Mongoose
    if (err.name === 'ValidationError') {
        statusCode = 400; // Define o status como 400 (Bad Request)
        // Extrai e formata as mensagens de erro de forma mais limpa
        message = Object.values(err.errors).map((error: any) => error.message).join(', ');
    }

    // Log do erro
    logger.error(`[${statusCode}] - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

    // Envio da resposta de erro em formato JSON
    res.status(statusCode).json({
        message: message,
    });
};