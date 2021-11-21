const conexao = require('../config/conexaoDB')
const livroRepository = require('../repository/livroRepository')

exports.listar = (req, res) => {

    livroRepository.listar((erro,livros) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        }
        else {
            res.json(livros)
        }
    })
}

exports.inserir = (req, res) => {    
    //Obter o dado do request - nome e o preco
    const livro = req.body;
    var bError = false;
    var livroSalvoBase;
    livroRepository.inserir(livro, (erro, livroSalvo) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"});
            console.log(erro);
            bError = true;
        }
        else {
            livroSalvoBase = livroSalvo;
            console.log("livroSalvoBase:... " + JSON.stringify(livroSalvoBase));
//          res.status(201).json(livroSalvo);
            livroRepository.inserirAutores(livroSalvoBase, (erro, livroSalvo) => {
                if(erro){
                    res.status(500).json({"erro:":"Database Error"});
                    console.log(erro);
                } else {
                    res.status(201).json(livroSalvo);
                }
            });
        }
    });
}

exports.buscarPorId = (req, res) => {
    console.log("Parametrossss " + JSON.stringify(req.params));
    const id = +req.params.id;
    if(isNaN(id)) {
        const error = {
            status: 400,
            msg: "Id deve ser um numero!"
        }
        res.status(error.status).json(error);
    }
    else{
        livroRepository.buscarPorId(id, (erro, livro) => {
            if(erro){
                res.status(erro.status).json(erro)
            }
            else {
                res.json(livro)
            }
        })
    }
}

exports.atualizar = (req, res) => {
    const id = +req.params.id;
    const livro = req.body;

    if(isNaN(id)){
        const error = {
            status: 400,
            msg: "Id deve ser um numero!"
        }
        res.status(error.status).json(error)
    }
    else{
        livroRepository.atualizar(id, livro, (erro, livroAtualizado) => {
            if(erro){
                res.status(erro.status).json(erro)
            }
            else {
                res.json(livroAtualizado)
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
        livroRepository.buscarPorId(id, (erro, livro) => {
            if(erro){
                res.status(erro.status).json(erro)
            }
            else {
                livroRepository.deletar (id, (erro, id) => {
                    if(erro){
                        res.status(erro.status).json(erro)
                    }
                    else {
                        res.json(livro)
                    }        
                })
            }
        })
    }
}

exports.buscarPorTitulo = (req, res) => {  
    console.log("params: " + JSON.stringify(req.params));
    const titulo = req.params.titulo;
    console.log(titulo);
    if(!titulo){
        const error = {
            status: 400,
            msg: "Titulo não informado!"
        }
        res.status(error.status).json(error)
    }
    else{
        livroRepository.buscarPorTitulo(titulo, (erro, livro) => {
            if(erro){
                res.status(erro.status).json(erro)
            }
            else {
                res.json(livro)
            }
        })
    }
}


exports.buscarPorAutor = (req, res) => {  
    console.log("params: " + JSON.stringify(req.params));
    const id_autor = req.params.id_autor;
    console.log(id_autor);
    if (!id_autor) {
        const error = {
            status: 400,
            msg: "Autor não informado!"
        }
        res.status(error.status).json(error)
    }
    else{
        livroRepository.buscarPorAutor(titulo, (erro, livros) => {
            if (erro) {
                res.status(erro.status).json(erro)
            }
            else {
                res.json(livros)
            }
        })
    }
}