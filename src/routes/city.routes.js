import auth from '../middlewares/auth';
import cityController from '../controllers/city.controller';

function CityRouter(router) {
	router.get('/cities', cityController.getAllCities);
	router.post('/cities', auth, cityController.createOne);
	router.delete('/cities/:id', auth, cityController.deleteOne);

	return router;
}

module.exports = CityRouter;
