import auth from '../middlewares/auth';
import serviceController from '../controllers/service.controller';

function ServiceRouter(router) {
	router.get('/api/services/', auth, serviceController.getAll);
	router.get('/api/services/:id', auth, serviceController.getById);
	router.post('/api/services/', auth, serviceController.createOne);
	router.put('/api/services/:id', auth, serviceController.update);
	router.delete('/api/services/:id', auth, serviceController.deleteOne);

	return router;
}

module.exports = ServiceRouter;
