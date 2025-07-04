import { Router } from "express";
/* import productRouter from "../resources/product/product.router"; */
import producrArrayRouter from "../resources/productArray/product.router";
import ProductRouter from "../resources/product/product.router";
import languageRouter from "../resources/languages/language.routes";
import userRouter from "../resources/user/user.router";
import authRouter from "../resources/auth/auth.router";

const router = Router();

router.use("/products",
    // #swagger.tags = ['Products'], 
    ProductRouter);
router.use("/productscreate",
    //swagger.tags = ['Products arra'],
    producrArrayRouter);
router.use("/language", 
    //swagger.tags = ['Languages'],
    languageRouter);
router.use("/user",
    // #swagger.tags = ['User'].     
    userRouter);
router.use("/auth", 
    // #swagger.tags = ['Auth'],
    authRouter);
export default router;
