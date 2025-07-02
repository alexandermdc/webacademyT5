import Router from "express";
import languageController from "./language.controles";

const router = Router();

router.get('/change', languageController.changeLanguage);

export default router;
