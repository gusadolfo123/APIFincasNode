import auth from '../middlewares/auth';
import seasonController from '../controllers/season.controller';

function SeasonRouter(router) {
	router.get('/api/seasons/', auth, seasonController.getAll);
	router.post('/api/seasons/', auth, seasonController.createSeason);
	router.put('/api/seasons/:id', auth, seasonController.updateSeason);

	return router;
}

module.exports = SeasonRouter;
