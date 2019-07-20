import auth from '../middlewares/auth';
import farmController from '../controllers/farm.controller';

function FarmRouter(router) {
	router.get('/api/farms/', auth, farmController.getAll);
	router.get('/api/farms/getPerPage/:page?', auth, farmController.getFarmsPerPage);
	router.get('/api/farms/:id', auth, farmController.getById);
	router.post('/api/farms/', auth, farmController.createOne);
	router.put('/api/farms/:id', auth, farmController.update);
	router.delete('/api/farms/:id', auth, farmController.deleteOne);

	return router;
}

module.exports = FarmRouter;
