import http from 'http';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import {createLink} from './util.js';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const PORT = process.env.PORT || 3333;
const diretorio = process.argv[2] || './';

const server = http.createServer((req, res) => {
    const url = decodeURIComponent(req.url);
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

    if (url === '/' || url === '/index') {
        fs.readdir(diretorio, (err, files) => {
            if (err) {
                res.write('<h1>Erro ao ler o diretório</h1>');
                return res.end();
            }

            files
                .filter(file => path.extname(file) === '.txt')
                .forEach(file => {
                    res.write(createLink(file)); // usando a função
                });

            res.end();
        });

    } else {
        const filepath = path.join(diretorio, url);

        fs.readFile(filepath, 'utf-8', (err, data) => {
            if (err) {
                res.write('<h1>Arquivo não encontrado</h1>');
                return res.end();
            }

            res.write(`<a href="/">Voltar</a><br><br>`);
            res.write(`<pre>${data}</pre>`);
            res.end();
        });
    }
});
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});