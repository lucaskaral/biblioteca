const conexao = require('../config/conexaoDB')
const autorRepository = require('../repository/autorRepository')

exports.listar = (req, res) => {

    autorRepository.listar((erro,autores) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        }
        else {
            res.json(autores)
        }
    })
}

exports.inserir = (req, res) => {  

    //Obter o dado do request - nome e o preco
    const autor = req.body;
    
    autorRepository.inserir(autor, (erro, autorSalvo) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        }
        else {
            res.status(201).json(autorSalvo)
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
        autorRepository.buscarPorId(id, (erro, autor) => {
            if(erro){
                res.status(erro.status).json(erro)
            }
            else {
                res.json(autor)
            }
        })
    }
}

exports.atualizar = (req, res) => {

    const id = +req.params.id;
    const autor = req.body;

    if(isNaN(id)) {
        const error = {
            status: 400,
            msg: "Id deve ser um numero!"
        }
        res.status(error.status).json(error)
    }
    else {
        autorRepository.atualizar(id, autor, (erro, autorAtualizado) => {
            if(erro){
                res.status(erro.status).json(erro)
            }
            else {
                res.json(autorAtualizado)
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
        autorRepository.buscarPorId(id, (erro, autor) => {
            if(erro){
                res.status(erro.status).json(erro)
            }
            else {
                autorRepository.deletar (id, (erro, id) => {
                    if(erro){
                        res.status(erro.status).json(erro)
                    }
                    else {
                        res.json(autor)
                    }        
                })
            }
        })
    }
}