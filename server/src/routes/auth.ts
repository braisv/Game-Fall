import express from 'express';
import AuthController from '../controllers/AuthController';
const router = express.Router();

router.post('/signup', AuthController.register);
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);
router.get('/currentuser', AuthController.getCurrentUser);

export default router;
