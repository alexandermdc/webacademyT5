import express, { Request, Response } from "express";
import dotenv from "dotenv";
import validateEnv from './utils/validateEnv';
import morgan from "morgan";
import router from "./routes/router";
import logMiddleware from "./utils/logMiddleware";
import routerLorem from "./routes/lorem";
import { engine } from "express-handlebars";

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 3333;
app.use(morgan("short"));
app.use(logMiddleware("complete"));

app.engine("handlebars", engine({
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  helpers: require(`${__dirname}/views/helpers/helpers.ts`),
  layoutsDir: `${__dirname}/views/layouts`,
  defaultLayout: 'main',
}));
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);


app.use("/",router);
app.use("/lorem", routerLorem);
app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
});

