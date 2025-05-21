import express from 'express';
import dotenv from 'dotenv';
import validateEnv from './utils/validateEnv';


dotenv.config();
validateEnv();
const PORT = process.env.PORT || 3001;
const app = express();
const valor = 10;
app.get('/', (req, res) => {
  res.send('Hello World! hoje');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});