import auth from '../middlewares/auth';
import userController from '../controllers/user.controller';

function UserRouter(router) {
	router.post('/users/register', userController.register);
	router.post('/users/login', userController.login);
	router.get('/users/logout-me', auth, userController.logoutMe);
	router.get('/users/logout-all', auth, userController.logoutAll);

	return router;
}

module.exports = UserRouter;
