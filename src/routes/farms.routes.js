import { Router } from 'express';
import farmController from '../controllers/farm.controller';
const router = Router();

router.get('/', farmController.getAll);
router.get('/:id', farmController.getById);
router.post('/', farmController.createOne);
router.put('/:id', farmController.update);
router.delete('/:id', farmController.deleteOne);
router.post('/getPerPage/:page?', farmController.getFarmsPerPage);

export default router;
