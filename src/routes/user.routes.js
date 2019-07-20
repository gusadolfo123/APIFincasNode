import auth from '../middlewares/auth';
import userController from '../controllers/user.controller';

function UserRouter(router) {
	router.post('/api/users/register', userController.register);
	router.post('/api/users/login', userController.login);
	router.get('/api/users/logout-me', auth, userController.logoutMe);
	router.get('/api/users/logout-all', auth, userController.logoutAll);

	return router;
}

module.exports = UserRouter;
