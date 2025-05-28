import express, {Router, Request, Response} from "express"

const router = Router()

router.get('/hb1', (req: Request, res: Response) => {
    res.render('hb1', {
        mensagem: 'bem vindo ao web academy',
        layout: false
    })
});
router.get('/', (req, res) => {
    res.send('Hello World! hoje');
  });

export default router;