import { Router } from 'express';
import seasonController from '../controllers/season.controller';
const router = Router();

router.get('/', seasonController.getAll);
router.post('/', seasonController.createSeason);
router.put('/:id', seasonController.updateSeason);

export default router;
