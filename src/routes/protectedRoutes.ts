import { Router } from 'express';
import { getProtectedData } from '../controllers/authController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

// Aplica o middleware 'protect' a esta rota
router.get('/protected', protect, getProtectedData);

export default router;