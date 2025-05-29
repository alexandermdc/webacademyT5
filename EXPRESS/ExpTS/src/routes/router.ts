import { Router, Request, Response } from 'express';
import mainController from '../controllers/mainController';

const router = Router();


router.get('/', mainController.index);
router.get('/hb1', mainController.hb1);
router.get('/hb2', mainController.hb2);
router.get('/hb3', mainController.hb3);
router.get('/hb4', mainController.hb4);
router.get('/lorem', mainController.lorem);


export default router;
