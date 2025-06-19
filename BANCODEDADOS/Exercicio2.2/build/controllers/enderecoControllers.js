"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnderecos = exports.createEndereco = void 0;
const cliente_1 = __importDefault(require("../prisma/cliente"));
const createEndereco = async (req, res) => {
    const { rua, numero, bairro, cidade, estado, cep } = req.body;
    try {
        const endereco = await cliente_1.default.endereco.create({
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
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao criar endereço' });
    }
};
exports.createEndereco = createEndereco;
const getEnderecos = async (req, res) => {
    try {
        const enderecos = await cliente_1.default.endereco.findMany();
        res.status(200).json(enderecos);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar endereços' });
    }
};
exports.getEnderecos = getEnderecos;
