import { Router } from 'express';
import serviceController from '../controllers/service.controller';

const router = Router();

// getAll
router.get('/', serviceController.getAll);

// create
router.post('/', serviceController.createOne);

// update
router.put('/:id', serviceController.update);

// delete
router.delete('/:id', serviceController.deleteOne);

// get per page
router.post('/getPerPage/:page?', serviceController.getServicesPerPage);

export default router;
