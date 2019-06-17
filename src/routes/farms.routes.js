import { Router } from 'express';
import farmController from '../controllers/farm.controller';
const router = Router();

// index
router.get('/', farmController.getAll);

// create
router.post('/', farmController.createOne);

// update
router.put('/:id', farmController.update);

// delete
router.delete('/:id', farmController.deleteOne);

// get by filter
router.post('/getBy', farmController.getBy);

// get per page
router.post('/getPerPage/:page?', farmController.getFarmsPerPage);

export default router;
