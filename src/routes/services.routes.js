import { Router } from 'express';
import serviceController from '../controllers/service.controller';
const router = Router();

router.get('/', serviceController.getAll);
router.post('/', serviceController.createOne);
router.put('/:id', serviceController.update);
router.delete('/:id', serviceController.deleteOne);
router.post('/getPerPage/:page?', serviceController.getServicesPerPage);

export default router;
