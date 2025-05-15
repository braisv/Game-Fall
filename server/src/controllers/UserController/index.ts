import {updateCurrentUserWishList} from '@/controllers/UserController/updateCurrentUserWishList';
import {getCurrentUserCart} from '@/controllers/UserController/getCurrentUserCart';
import {getCurrentUserWishList} from '@/controllers/UserController/getCurrentUserWishList';
import {getUserById} from '@/controllers/UserController/getUserById';
import {removeItemFromCurrentUserCart} from '@/controllers/UserController/removeItemFromCurrentUserCart';
import {removeItemFromCurrentUserWishList} from '@/controllers/UserController/removeItemFromCurrentUserWishList';
import {updateCurrentUserCart} from '@/controllers/UserController/updateCurrentUserCart';

export default {
  getCurrentUserCart,
  getCurrentUserWishList,
  getUserById,
  removeItemFromCurrentUserCart,
  removeItemFromCurrentUserWishList,
  updateCurrentUserCart,
  updateCurrentUserWishList,
};
