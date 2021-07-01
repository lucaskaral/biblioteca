const express = require('express');
const rotas = express.Router();
const clienteController = require('../controller/clienteController')

rotas.post('/', clienteController.validarUsuario)

module.exports = rotas