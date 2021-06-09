const express = require('express');
const rotas = express.Router();
const clienteController = require('../controller/clienteController')

rotas.get('/', clienteController.listar)
rotas.post('/', clienteController.inserir)
rotas.get('/:id', clienteController.buscarPorId)
rotas.put('/:id', clienteController.atualizar)
rotas.delete('/:id', clienteController.deletar)

module.exports = rotas