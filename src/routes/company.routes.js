import { Router } from 'express';
import companyController from '../controllers/company.controller';
const router = Router();

router.get('/', companyController.getAll);
router.get('/:id', companyController.getById);
router.post('/', companyController.createCompany);
router.put('/', companyController.updateCompany);
router.delete('/:id', companyController.deleteCompany);

export default router;
