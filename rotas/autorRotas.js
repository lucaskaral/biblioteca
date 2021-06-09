const express = require('express');
const rotas = express.Router();
const autorController = require('../controller/autorController')

rotas.get('/', autorController.listar)
rotas.post('/', autorController.inserir)
rotas.get('/:id', autorController.buscarPorId)
rotas.put('/:id', autorController.atualizar)
rotas.delete('/:id', autorController.deletar)

module.exports = rotas