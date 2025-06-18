import { Request, Response } from "express";
import { createProductDto } from "./product.types";
import { createProduct } from "./product.service";
import { StatusCodes } from "http-status-codes";
import { getProducts } from "../productArray/product.service";
import { createProductError } from "./product.error";

const index = (req: Request, res: Response) => {
  const products = await getProducts(); //modificacao
  try{
    res.status(StatusCodes.)
  }
};

const create = async (req: Request, res: Response) => {
  const newProduct = req.body as createProductDto;
  try {
    const product = await createProduct(newProduct);
    res.status(StatusCodes.CREATED).json(product);
  } catch (err) {
    createProductError(res, err)
  }
};

const read = (req: Request, res: Response) => {

};

const update = (req: Request, res: Response) => {

};

const remove = (req: Request, res: Response) => {

};

export default { index, create, read, update, remove };
