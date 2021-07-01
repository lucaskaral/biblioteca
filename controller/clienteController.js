const conexao = require('../config/conexaoDB')
const jwt = require('jsonwebtoken')
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

exports.validarUsuario = (req, res) => {
    console.log("body----->>>> "+JSON.stringify(req.body));
    if (req.body && req.body.username && req.body.senha) {
        const userName = req.body.username;
        const senha = req.body.senha;
        console.log("senha:: " + senha);
        clienteRepository.buscarPorUserName(userName, (error, cliente) => {
            if (error) {
                if (error.status == 404) {
                    const erro = {
                        status: 401,
                        msg: "Usuario e/ou senha invalido(s)!"
                    };
                    res.status(erro.status).json(erro);
                } else {
                    res.status(error.status).json(error);
                }
            } else {
                if (cliente.senha == senha) {
                    const token = jwt.sign({
                        id: cliente.id,
                        nome: cliente.nome
                    }, "Sen@cR5", { expiresIn: "1h" });
                    res.status(201).json({"token":token});
                } else {
                    const erro = {
                        status: 401,
                        msg: "Senha e/ou usuario invalido(s)!"
                    };
                    res.status(erro.status).json(erro);
                }
            }
        });
    } else {
        const erro = {
            status: 401,
            msg: "Usuario e/ou senha invalido(s)!"
        }
        res.status(erro.status).json(erro);
    }
}

exports.validarToken = (req, res, next) => {
    const token = req.get("x-auth-token");
    if(!token) {
        const error = {
            status: 403,
            msg: "Sem token de acesso"
        }
        res.status(error.status).json(error);
    } else {
        jwt.verify(token, "Sen@cR5", (err, payload) => {
            if(err) {
                const error = {
                    status: 403,
                    msg: "Sem token de acesso"
                }
                res.status(error.status).json(error);
            } else {
                console.log("Id do user: " + payload.id);
                next();
            }
        })
    }
}