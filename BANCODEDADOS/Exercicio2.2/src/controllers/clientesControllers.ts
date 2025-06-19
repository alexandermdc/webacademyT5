import {Request, Response} from 'express';
import prisma from '../prisma/cliente';

export const createCliente = async (req: Request, res: Response) => {
  const { nome, cpf, telefone, email, data_nascimento, id_endereco } = req.body;

  try {
const cliente = await prisma.cliente.create({
  data: {
    nome,
    cpf,
    telefone,
    email,
    data_nascimento: data_nascimento ? new Date(data_nascimento) : undefined,
    ...(id_endereco ? { id_endereco } : {})
  }
});

    res.status(201).json(cliente);
  } catch (error) {
    console.error('Erro no createCliente:', error);  // loga o erro real
    res.status(500).json({ error: 'Erro ao criar cliente' });
  }
};
export const getClientes = async (req: Request, res: Response) => {
    try {
        const clientes = await prisma.cliente.findMany();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar clientes' });
    }
}