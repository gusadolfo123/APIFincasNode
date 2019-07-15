import { Router } from 'express';
import farmController from '../controllers/farm.controller';
const router = Router();

router.get('/', farmController.getAll);
router.get('/getPerPage/:page?', farmController.getFarmsPerPage);
router.get('/:id', farmController.getById);
router.post('/', farmController.createOne);
router.put('/:id', farmController.update);
router.delete('/:id', farmController.deleteOne);

export default router;
