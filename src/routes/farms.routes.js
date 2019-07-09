import { Router } from 'express';
import farmController from '../controllers/farm.controller';
import mockData from '../helpers/mock-data';
const router = Router();

router.get('/', farmController.getAll);
router.post('/', farmController.createOne);
router.put('/:id', farmController.update);
router.delete('/:id', farmController.deleteOne);
router.post('/getBy', farmController.getBy);
router.post('/getPerPage/:page?', farmController.getFarmsPerPage);
router.get('/generateMockData', mockData.generateFarms);

export default router;
