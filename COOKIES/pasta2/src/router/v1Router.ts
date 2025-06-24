import { Router } from "express";
/* import productRouter from "../resources/product/product.router"; */
import producrArrayRouter from "../resources/productArray/product.router";

const router = Router();

/* router.use("/products", productRouter); */
router.use("/productscreate", producrArrayRouter);

export default router;
