const conexao = require('../config/conexaoDB')
const reservaRepository = require('../repository/reservaRepository')

exports.listar = (req, res) => {
    reservaRepository.listar((erro, reservas) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        }
        else {
            res.json(reservas)
        }
    })
}

exports.inserir = (req, res) => {  
    //Obter o dado do request - nome e o preco
    const reserva = req.body;
    
    reservaRepository.inserir(reserva, (erro, reservaSalva) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        }
        else {
            res.status(201).json(reservaSalva)
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
        reservaRepository.buscarPorId(id, (erro, reserva) => {
            if(erro){
                res.status(erro.status).json(erro)
            }
            else {
                res.json(reserva)
            }
        })
    }
}

exports.atualizar = (req, res) => {
    const id = +req.params.id;
    const reserva = req.body;

    if (isNaN(id)) {
        const error = {
            status: 400,
            msg: "Id deve ser um numero!"
        }
        res.status(error.status).json(error)
    }
    else {
        reservaRepository.atualizar(id, reserva, (erro, reservaAtualizada) => {
            if(erro){
                res.status(erro.status).json(erro)
            }
            else {
                res.json(reservaAtualizada)
            }
        })
    }
}

exports.deletar = (req, res) => {
    const id = +req.params.id;
    if (isNaN(id)){
        const error = {
            status: 400,
            msg: "Id deve ser um numero"
        }
        res.status(error.status).json(error)
    }
    else {
        reservaRepository.buscarPorId(id, (erro, reserva) => {
            if(erro){
                res.status(erro.status).json(erro)
            }
            else {
                reservaRepository.deletar(id, (erro, id) => {
                    if (erro) {
                        res.status(erro.status).json(erro)
                    } else {
                        res.json(reserva)
                    }        
                })
            }
        })
    }
}