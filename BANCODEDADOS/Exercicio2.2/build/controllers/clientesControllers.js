"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientes = exports.createCliente = void 0;
const cliente_1 = __importDefault(require("../prisma/cliente"));
const createCliente = async (req, res) => {
    const { nome, cpf, telefone, email, data_nascimento, id_endereco } = req.body;
    try {
        const cliente = await cliente_1.default.cliente.create({
            data: {
                nome,
                email,
                telefone,
                cpf,
                data_nascimento: data_nascimento ? new Date(data_nascimento) : undefined,
                id_endereco
            }
        });
        res.status(201).json(cliente);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao criar cliente' });
    }
};
exports.createCliente = createCliente;
const getClientes = async (req, res) => {
    try {
        const clientes = await cliente_1.default.cliente.findMany();
        res.status(200).json(clientes);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar clientes' });
    }
};
exports.getClientes = getClientes;
