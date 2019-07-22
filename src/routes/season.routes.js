import auth from '../middlewares/auth';
import seasonController from '../controllers/season.controller';

function SeasonRouter(router) {
	router.get('seasons', auth, seasonController.getAll);
	router.post('seasons', auth, seasonController.createSeason);
	router.put('seasons/:id', auth, seasonController.updateSeason);

	return router;
}

module.exports = SeasonRouter;
