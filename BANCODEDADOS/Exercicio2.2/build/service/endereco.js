"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const form = document.getElementById('formEndereco');
form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const dados = {
        rua: document.getElementById('rua').value,
        numero: document.getElementById('numero').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        cep: document.getElementById('cep').value,
    };
    try {
        const response = await axios_1.default.post('http://localhost:3333/enderecos', dados);
        alert('Endereço cadastrado com sucesso!');
        console.log(response.data);
        form.reset();
    }
    catch (error) {
        console.error('Erro ao cadastrar endereço:', error);
        alert('Erro ao cadastrar endereço.');
    }
});
