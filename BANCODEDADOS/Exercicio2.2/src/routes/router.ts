import express from 'express';
import { createCliente, getClientes } from '../controllers/clientesControllers';
import { createEndereco, getEnderecos } from '../controllers/enderecoControllers';

const router = express.Router();

router.post('/clientes', createCliente);
router.get('/clientes', getClientes);
router.post('/enderecos', createEndereco);
router.get('/enderecos', getEnderecos);

export default router;