import express, { Request, Response } from "express";
import dotenv from "dotenv";
import validateEnv from './utils/validateEnv';
import router from "./routes/router";
import logMiddleware from "./utils/logMiddleware";;
import { engine } from "express-handlebars";
import sass from "node-sass-middleware";


dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 3333;
app.use(logMiddleware("complete"));

app.use(express.json());

app.use('/img', [
 express.static(`${__dirname}/public/img`)
]);

app.use(sass({
  src: `${__dirname}/../public/scss`,
  dest: `${__dirname}/../public/css`,
  outputStyle: "compressed",
  prefix: "/css",
}));
app.use("/css", express.static(`${__dirname}/../public/css`));


app.engine("handlebars", engine({
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  helpers: require(`${__dirname}/views/helpers/helpers.ts`),
  layoutsDir: `${__dirname}/views/layouts`,
  defaultLayout: 'main',
}));
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

app.use(router);

app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
});

