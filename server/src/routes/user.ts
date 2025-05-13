import express from 'express';
import UserController from '../controllers/UserController/index.js';

const userRouter = express.Router();

userRouter.get('/currentUserCart', UserController.getCurrentUserCart);
userRouter.get('/updateCurrentUserWishList', UserController.getCurrentUserWishList);
userRouter.get('/:id', UserController.getUserById);
userRouter.post('/removeItemFromCurrentUserCart', UserController.removeItemFromCurrentUserCart);
userRouter.post('/removeItemFromCurrentUserWishList', UserController.removeItemFromCurrentUserWishList);
userRouter.post('/updateCurrentUserChart', UserController.updateCurrentUserCart);
userRouter.post('/updateCurrentUserWishList', UserController.updateCurrentUserWishList);

export default userRouter;
