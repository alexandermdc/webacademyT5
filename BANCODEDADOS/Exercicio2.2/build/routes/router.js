"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clientesControllers_1 = require("../controllers/clientesControllers");
const enderecoControllers_1 = require("../controllers/enderecoControllers");
const router = express_1.default.Router();
router.post('/clientes', clientesControllers_1.createCliente);
router.get('/clientes/todos', clientesControllers_1.getClientes);
router.post('/enderecos', enderecoControllers_1.createEndereco);
router.get('/enderecos/todos', enderecoControllers_1.getEnderecos);
exports.default = router;
