import auth from '../middlewares/auth';
import companyController from '../controllers/company.controller';

function CompanyRouter(router) {
	router.get('/api/companies/', auth, companyController.getAll);
	router.get('/api/companies/:id', auth, companyController.getById);
	router.post('/api/companies/', auth, companyController.createCompany);
	router.put('/api/companies/:id', auth, companyController.updateCompany);
	router.delete('/api/companies/:id', auth, companyController.deleteCompany);

	return router;
}

module.exports = CompanyRouter;
