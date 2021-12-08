const express = require('express');
const rotas = express.Router();
const livroController = require('../controller/livroController')

rotas.get('/', livroController.listar)
rotas.post('/', livroController.inserir)
rotas.get('/:id', livroController.buscarPorId)
rotas.get('/:id/:titulo', livroController.buscarPorTitulo)
rotas.get('/:id/:id_autor', livroController.buscarPorAutor)
rotas.put('/:id', livroController.atualizar)
rotas.delete('/:id', livroController.deletar)

module.exports = rotas;