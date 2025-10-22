import { Router } from 'express';
import * as noteController from '../controllers/noteController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

// Aplica o middleware de proteção a TODAS as rotas deste arquivo
router.use(protect);

router.post('/', noteController.create);
router.get('/', noteController.getAll);
router.get('/:id', noteController.getById);
router.put('/:id', noteController.update);
router.patch('/:id', noteController.update); // PUT e PATCH usam a mesma função controller
router.delete('/:id', noteController.remove);

export default router;