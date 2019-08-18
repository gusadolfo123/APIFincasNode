import auth from '../middlewares/auth';
import serviceController from '../controllers/service.controller';

function ServiceRouter(router) {
	router.get('/services', serviceController.getAll);
	router.get('/services/:id', serviceController.getById);
	router.post('/services', auth, serviceController.createOne);
	router.put('/services/:id', auth, serviceController.update);
	router.delete('/services/:id', auth, serviceController.deleteOne);

	return router;
}

module.exports = ServiceRouter;
