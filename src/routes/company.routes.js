import auth from '../middlewares/auth';
import companyController from '../controllers/company.controller';

function CompanyRouter(router) {
	router.get('/companies', companyController.getAll);
	router.get('/companies/:id', companyController.getById);
	router.post('/companies', auth, companyController.createCompany);
	router.put('/companies/:id', auth, companyController.updateCompany);
	router.delete('/companies/:id', auth, companyController.deleteCompany);

	return router;
}

module.exports = CompanyRouter;
