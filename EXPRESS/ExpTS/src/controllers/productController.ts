import { Request, Response } from 'express';
import { get, post, put } from '../utils/Dbapi';
import { Product } from '../types/products';

const index = async (req: Request, res: Response) => {
    const products = await get('products');
    res.render('products/index', {products});
};
async function create (req: Request, res: Response) {
    if (req.method === 'GET') {
        res.render('products/create');
    } else if (req.method === 'POST') {
        const NewProduct = req.body as Product;
        await post("products", NewProduct)
        res.redirect('/products');
    } else {
        res.status(405).send('Method Not Allowed');
    }
};
async function read (req: Request, res: Response) {
    const product = await get(`products/${req.params.id}`);
    res.render('products/read', { product });
};

async function update (req: Request, res: Response) {
    if (req.method === 'GET') {
        const product = await get(`products/${req.params.id}`);
        res.render('products/update', { product });
    } else if (req.method === 'POST') {
        const updatedProduct = req.body as Product;
        await put(`products/${req.params.id}`, updatedProduct);
        res.redirect('/products');
    } else {
        res.status(405).send('Method Not Allowed');
    }
};
async function remove (req: Request, res: Response) {
    if (req.method === 'POST') {
        await post(`products/remove`, { id: req.body.id });
        res.redirect('/products');
    }
};

export default { index, create, read, update, remove };