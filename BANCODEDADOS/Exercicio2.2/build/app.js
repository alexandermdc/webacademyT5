"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./routes/router"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3333;
app.use(express_1.default.json());
app.use(router_1.default);
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'public/index.html'));
});
app.get('/cadastroendereco', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'public/cadastroendereco.html'));
});
app.get('/cadastrocliente', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'public/cadastrocliente.html'));
});
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
