import express from 'express';
import router from './routes/router';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());

// ✅ Servir arquivos estáticos (HTML, CSS, JS, imagens)
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Rotas para HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/cadastroendereco', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cadastroendereco.html'));
});
app.get('/cadastrocliente', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cadastrocliente.html'));
});

// ✅ Rotas da API
app.use(router);

// ✅ Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
