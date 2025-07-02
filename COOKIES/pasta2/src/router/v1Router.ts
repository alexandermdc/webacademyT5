import { Router } from "express";
/* import productRouter from "../resources/product/product.router"; */
import producrArrayRouter from "../resources/productArray/product.router";
import ProductRouter from "../resources/product/product.router";
import languageRouter from "../resources/languages/language.routes";

const router = Router();

router.use("/products", ProductRouter);
router.use("/productscreate", producrArrayRouter);
router.use("/language", languageRouter);

export default router;
