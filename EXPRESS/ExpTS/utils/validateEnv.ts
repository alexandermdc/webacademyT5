import { cleanEnv, port, str } from "envalid";

function validateEnv() {
  return cleanEnv(process.env, {
    PORT: port(),
    NODE_ENV: str(),
    LOGS_PATH: str()
  })
}

export default validateEnv;