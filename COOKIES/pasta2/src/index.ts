import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import setLangCookie from "./middlewares/setLangCookie";
import router from "./router/index";

dotenv.config();
const app = express();
const PORT = process.env.PORT ?? 3366;

app.use(express.json());
app.use(cookieParser());
app.use(setLangCookie);
app.use(router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
