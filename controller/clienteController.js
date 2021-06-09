const conexao = require('../config/conexaoDB')
const clienteRepository = require('../repository/clienteRepository')

exports.listar = (req, res) => {
    clienteRepository.listar((erro,clientes) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        }
        else {
            res.json(clientes)
        }
    })
}

exports.inserir = (req, res) => {    
    //Obter o dado do request - nome e o preco
    const cliente = req.body;
    
    clienteRepository.inserir(cliente, (erro, clienteSalvo) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        }
        else {
            res.status(201).json(clienteSalvo)
        }
    })
}

exports.buscarPorId = (req, res) => {    
    const id = +req.params.id;
    if(isNaN(id)){
        const error = {
            status: 400,
            msg: "Id deve ser um numero!"
        }
        res.status(error.status).json(error)
    }
    else{
        clienteRepository.buscarPorId(id, (erro, cliente) => {
            if(erro){
                res.status(erro.status).json(erro)
            }
            else {
                res.json(cliente)
            }
        })
    }
}

exports.atualizar = (req, res) => {
    const id = +req.params.id;
    const cliente = req.body;

    if(isNaN(id)) {
        const error = {
            status: 400,
            msg: "Id deve ser um numero!"
        }
        res.status(error.status).json(error)
    }
    else {
        clienteRepository.atualizar(id, cliente, (erro, clienteAtualizado) => {
            if(erro){
                res.status(erro.status).json(erro)
            }
            else {
                res.json(clienteAtualizado)
            }
        })
    }
}

exports.deletar = (req, res) => {
    const id = +req.params.id;
    if(isNaN(id)){
        const error = {
            status: 400,
            msg: "Id deve ser um numero"
        }
        res.status(error.status).json(error)
    }
    else{
        clienteRepository.buscarPorId(id, (erro, cliente) => {
            if(erro){
                res.status(erro.status).json(erro)
            }
            else {
                clienteRepository.deletar (id, (erro, id) => {
                    if(erro){
                        res.status(erro.status).json(erro)
                    }
                    else {
                        res.json(cliente)
                    }        
                })
            }
        })
    }
}