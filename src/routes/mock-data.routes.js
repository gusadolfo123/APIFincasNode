import { Router } from 'express';
import mockData from '../helpers/mock-data';
const router = Router();

router.get('/', mockData.generateData);

export default router;
