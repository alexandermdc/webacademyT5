import swaggerAutogen from "swagger-autogen";
import dotenv from "dotenv";

dotenv.config();

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || "3340";

const docsSwagger = {
  info: {
    title: "API Loja",
    description: "Documentação da API Loja",
  },
  host: `${HOST}:${PORT}`
}
const outputSwagger = "./output-swagger.json";
const router = "./src/router/index.ts";

swaggerAutogen(outputSwagger, [router], docsSwagger)