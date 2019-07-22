import auth from '../middlewares/auth';
import farmController from '../controllers/farm.controller';

function FarmRouter(router) {
	router.get('farms', auth, farmController.getAll);
	router.get('farms/getPerPage/:page?', auth, farmController.getFarmsPerPage);
	router.get('farms/:id', auth, farmController.getById);
	router.post('farms', auth, farmController.createOne);
	router.put('farms/:id', auth, farmController.update);
	router.delete('farms/:id', auth, farmController.deleteOne);

	return router;
}

module.exports = FarmRouter;
