import { Router } from 'express';
import userController from './user.controller';
import router from '../productArray/product.router';

const userRouter = Router();

router.get('/', userController.index);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.get('/:id', userController.read);
router.delete('/:id', userController.remove);

export default userRouter;









