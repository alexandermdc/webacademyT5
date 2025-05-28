import fs from 'fs';
import path from 'path';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

type LogFormat = 'simple' | 'complete';

const LOG_DIR = process.env.LOG_DIR ?? 'logs';
const LOG_PATH = path.join(LOG_DIR, 'log.txt');


if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
}

function logMiddleware(format: LogFormat) {
    return (req: Request, res: Response, next: NextFunction) => {
        const now = new Date().toISOString();
        let logLine = '';

        if (format === 'simple') {
            logLine = `[${now}] ${req.method} ${req.url}\n`;
        } else if (format === 'complete') {
            logLine = `[${now}] ${req.method} ${req.url} HTTP/${req.httpVersion} - User-Agent: ${req.headers['user-agent']}\n`;
        }

        fs.appendFile(LOG_PATH, logLine, (err) => {
            if (err) {
                console.error('Erro ao escrever no log:', err);
            }
        });

        next();
    };
}
export default logMiddleware;