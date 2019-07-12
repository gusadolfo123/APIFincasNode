import { Router } from 'express';
import userController from '../controllers/user.controller';
import auth from '../middlewares/auth';

const router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logoutMe', auth, userController.logoutMe);
router.get('/logoutAll', auth, userController.logoutAll);

export default router;
