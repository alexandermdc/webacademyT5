import express from 'express';
import dotenv from 'dotenv';
import validateEnv from './utils/validateEnv';
import morgan from 'morgan';
import router from './router/router';
import loremRouter from './router/lorem'
import { engine } from 'express-handlebars';
//import logger from './middlewares/logger';

dotenv.config();
validateEnv();
const PORT = process.env.PORT || 3001;
const app = express();
const valor = 10;
app.engine("handlebars", engine())
app.set('view engine', 'handlebars')
app.set('views', `${__dirname}/views`)
app.use('/css', express.static(`${process.cwd()}/public/css`))
app.use('/js', express.static(`${process.cwd()}/public/js`))
app.use('/img', express.static(`${process.cwd()}/public/img`))
//app.use(logger('simple'));
app.use(morgan('combined'))
app.use(router)
app.use(loremRouter)
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});