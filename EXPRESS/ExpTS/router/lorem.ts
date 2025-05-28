import { Router } from "express";
import { loremIpsum } from "lorem-ipsum";

const router = Router()

router.get('/lorem', (req, res)=>{
    res.send("Aqui no lorem")
})

export default router;
