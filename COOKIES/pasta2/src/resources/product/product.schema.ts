import Joi from "joi";
import { join } from "path";

const productSchema = Joi.object().keys({
    name: Joi.string().min(3).max(50).required(),
    price: Joi.number().min(0).required(),
    stockQuantity: Joi.number().integer().min(0).required(),
});