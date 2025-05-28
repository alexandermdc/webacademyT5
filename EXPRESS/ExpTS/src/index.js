"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var validateEnv_1 = require("../utils/validateEnv");
dotenv_1.default.config();
(0, validateEnv_1.default)();
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3333;
app.get("/", function (req, res) {
    res.send("Hello world!");
});
app.listen(PORT, function () {
    console.log("Express app iniciada na porta ".concat(PORT, "."));
});
