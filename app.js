const express = require('express')
const clienteController = require('../Biblioteca/controller/clienteController')
const app = express()
const port = 3000

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const authRota = require('./rotas/authRotas')
app.use('/api/auth', authRota)

//Middleware para autenticação
app.use(clienteController.validarToken)

//Rotas
const livroRota = require('./rotas/livroRotas')
app.use('/api/livros',livroRota)

const autorRota = require('./rotas/autorRotas')
app.use('/api/autores',autorRota)

const clienteRota = require('./rotas/clienteRotas')
app.use('/api/clientes',clienteRota)

const reservaRota = require('./rotas/reservaRotas')
app.use('/api/reservas',reservaRota)


app.listen(port, () => {
    console.log(`Executando servidor em http://localhost:${port}`)
  })