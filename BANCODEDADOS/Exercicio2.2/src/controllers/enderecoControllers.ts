import { Request, Response } from "express";
import prisma from "../prisma/cliente";

export const createEndereco = async (req: Request, res: Response) => {
    const { rua, numero, bairro, cidade, estado, cep } = req.body;

    try {
        const endereco = await prisma.endereco.create({
            data: {
                rua,
                numero,
                bairro,
                cidade,
                estado,
                cep
            }
        });
        res.status(201).json(endereco);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar endereço' });
    }
}
export const getEnderecos = async (req: Request, res: Response) => {
    try {
        const enderecos = await prisma.endereco.findMany();
        res.status(200).json(enderecos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar endereços' });
    }
}