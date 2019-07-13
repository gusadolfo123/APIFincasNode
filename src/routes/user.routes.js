import { Router } from 'express';
import userController from '../controllers/user.controller';
import auth from '../middlewares/auth';

const router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout-me', auth, userController.logoutMe);
router.get('/logout-all', auth, userController.logoutAll);

export default router;
