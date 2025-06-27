// src/resources/product/product.router.ts
import { Router } from 'express';
import productController from './product.controller';
import validate from '../../middlewares/validate';
import schema from './product.schema';

const router = Router();

// Assegure-se de que essas funções existem e estão exportadas corretamente no controller
router.get('/', productController.index);
router.post('/', validate(schema),productController.create);
router.get('/:id', productController.read);
router.put('/:id', validate(schema),productController.update);
router.delete('/:id', productController.remove);

export default router;
