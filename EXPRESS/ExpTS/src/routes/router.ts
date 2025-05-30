import { Router, Request, Response } from 'express';
import mainController from '../controllers/mainController';
import productController from '../controllers/productController';

const router = Router();


router.get('/', mainController.index);
router.get('/hb1', mainController.hb1);
router.get('/hb2', mainController.hb2);
router.get('/hb3', mainController.hb3);
router.get('/hb4', mainController.hb4);
router.get('/lorem', mainController.lorem);

router.get('/products', productController.index);
router.all('/products/create', productController.create);
router.all('/products/update/:id', productController.update);
router.get('/products/:id', productController.read);
router.all('/products/remove/:id', productController.remove);



export default router;
