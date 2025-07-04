import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import setLangCookie from "./middlewares/setLangCookie";
import {v4 as uuidv4 }from "uuid";
import router from "./router/index";
import session from "express-session";
import swaggerUi from "swagger-ui-express";
import swaggerJson from "./output-swagger.json";

dotenv.config();
const app = express();
const PORT = process.env.PORT ?? 3366;

app.use(express.json());
app.use(cookieParser());
app.use(setLangCookie);
app.use(session({
  genid: (req) => uuidv4(),
  secret: process.env.SESSION_SECRET || "default_secret", // Use a secure value in production
  resave: true, 
  saveUninitialized: true,
}));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use(router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
