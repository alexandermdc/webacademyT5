import { Request, Response, Router } from "express";

const router = Router();

router.get('/hb1', (req, res) => {
    res.render('hb1', {
        mensagem: "bem vindo ao web academy",
        layout: false
    });
});

router.get('/', (req: Request, res: Response) => {
    res.send('Hello World! hoje');
});

export default router;
