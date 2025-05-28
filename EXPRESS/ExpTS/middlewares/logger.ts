import { NextFunction } from "express"
import fs from 'fs/promises'

type LoggerType = 'complete' | 'simple'

function logger(type: LoggerType) {
    const LOGS_PATH = process.env.LOGS_PATH ?? 'logs'
    if (type === "simple") {
        return async (req: Request, res: Response, next: NextFunction)=>{
            const data = new Date()
<<<<<<< HEAD:EXPRESS/ExpTS/middlewares/logger.ts
            await fs.appendFile(`${process.cwd()}/${LOGS_PATH}/logs.log`, `${data.toISOString()} ${req.url} ${req.method}\n`, { flag: "a" });
        next()
        };
    }else{
=======
            await fs.writeFile(`${process.cwd()}/${LOGS_PATH}/logs.log`, `${data.toISOString()} ${req.url} ${req.method}\n`, { flag: 'a' })
            next()
        }
    } else {
>>>>>>> bf5597a9423dd156df9d85da45888da3ac89c6f8:EXPRESS/src/middlewares/logger.ts
        return (req: Request, res: Response, next: NextFunction)=>{
            console.log('complete')
            next()
        }
    }
}
export default logger;