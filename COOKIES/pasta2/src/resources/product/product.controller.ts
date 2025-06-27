// src/resources/product/product.controller.ts
import { Request, Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { createProductError } from './product.error';
import {getAllProducts, createProduct, getProduct,updateProduct, removeProduct,} from './product.service';
import { ProdCreateDto } from './product.types';

// GET /product
const index = async function index(req: Request, res: Response) {
  try {
    const products = await getAllProducts();
    res.status(StatusCodes.OK).json(products);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro ao buscar produtos.' });
  }
}

// GET /product/:id
const read = async function read(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const product = await getProduct(id);
    if (!product) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Produto não encontrado.' });
    }
    res.status(StatusCodes.OK).json(product);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro ao buscar produto.' });
  }
}
const create = async function create(req: Request, res: Response) {
  const product = req.body as ProdCreateDto;
  console.log('Received product data:', product);
  try {
    const newProduct = await createProduct(product);
    return res.status(StatusCodes.CREATED).json(newProduct);
  } catch (err: any) {
    return createProductError(res, err);
  }
}

// PUT /product/:id
const update = async function update(req: Request, res: Response) {
  const { id } = req.params;
  const productData = req.body as ProdCreateDto;

  try {
    const updated = await updateProduct(id, productData);
    if (!updated) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Produto não encontrado.' });
    }
    res.status(StatusCodes.OK).json(updated);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro ao atualizar produto.' });
  }
}

// DELETE /product/:id
const remove = async function remove(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const deleted = await removeProduct(id);
    if (!deleted) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Produto não encontrado.' });
    }
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro ao remover produto.' });
  }
}

export default {
  index,
  read,
  create,
  update,
  remove,
};
