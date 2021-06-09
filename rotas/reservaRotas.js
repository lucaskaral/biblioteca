const express = require('express');
const rotas = express.Router();
const reservaController = require('../controller/reservaController')

rotas.get('/', reservaController.listar)
rotas.post('/', reservaController.inserir)
rotas.get('/:id', reservaController.buscarPorId)
rotas.put('/:id', reservaController.atualizar)
rotas.delete('/:id', reservaController.deletar)

module.exports = rotas