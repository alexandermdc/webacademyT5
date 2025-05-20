import { cleanEnv, port, str } from "envalid";

function validateEnv() {
  return cleanEnv(process.env, {
    PORT: port(),
    NODE_ENV: str(),
  })
}

export default validateEnv;