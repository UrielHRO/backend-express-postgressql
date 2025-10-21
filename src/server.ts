import express from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';
import authRoutes from './routes/authRoutes';
import protectedRoutes from './routes/protectedRoutes';
import { errorHandler } from './middlewares/erroMiddleware';
import logger from './utils/logger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


// Middlewares
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'API do MiniProjeto-V2 está no ar!',
    status: 'OK',
    timestamp: new Date().toISOString() 
  });
});

// Rotas
app.use('/api', authRoutes);
app.use('/api', protectedRoutes);

// Middleware de Erro (deve ser o último)
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT}`);
});