import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import 'express-async-errors';
import authRoutes from './routes/authRoutes';
import noteRoutes from './routes/noteRoutes';
import { errorHandler } from './middlewares/erroMiddleware';
import logger from './utils/logger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware para processar JSON
app.use(cors());
app.use(express.json());

// Rota de boas-vindas
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'API com PostgreSQL e Prisma no ar!',
    status: 'OK',
    timestamp: new Date().toISOString() 
  });
});

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// Middleware de Erro (deve ser o último a ser registrado)
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT}`);
});