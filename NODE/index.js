const http = require('http');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

const PORT = process.env.PORT || 3000;
const diretorio = process.argv[2] || './';

const server = http.createServer((req, res) => {
    res.writeHead(200, {"content-type": "text/html; charset=utf-8"});

    fs.readdir(diretorio, (err, files) => {
        if (err) {
            console.error('Diretorio errado', err);
            res.write('Diretorio errado!!');
            res.end();
            return;
        }
        files.forEach(file => {
            res.write(`<p>${file}</p>`);
        });

        res.end();
    });
});

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});