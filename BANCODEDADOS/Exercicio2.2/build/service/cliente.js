"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const form = document.getElementById('formCliente');
form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const dados = {
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value,
        data_nascimento: document.getElementById('data_nascimento').value,
        id_endereco: parseInt(document.getElementById('id_endereco').value),
    };
    try {
        const response = await axios_1.default.post('http://localhost:3550/clientes', dados);
        alert('Cliente cadastrado com sucesso!');
        console.log(response.data);
        form.reset();
    }
    catch (error) {
        console.error('Erro ao cadastrar cliente:', error);
        alert('Erro ao cadastrar cliente.');
    }
});
