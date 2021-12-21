const conexao = require('../config/conexaoDB')
const livroRepository = require('../repository/livroRepository')

exports.listar = (req, res) => {
    console.log("Listando livros: " + JSON.stringify(req.body));
    if (req.body.titulo) {
        this.buscarPorTitulo(req, res);
        return;
    } else if (req.body.idAutor) {
        this.buscarPorAutor(req, res);
        return;
    }
    livroRepository.listar((erro,livros) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        }
        else {
            console.log(JSON.stringify(livros));
            res.json(livros)
        }
    })
}

validarIdsAutores = (idsAutores) => {
    return livroRepository.validarIdsAutores(idsAutores);
}

exports.inserir = (req, res) => {
    //Obter o dado do request - nome e o preco
    const livro = req.body;
    if (!validarIdsAutores(livro.idsAutores.split(","))) {
        res.status(500).json({"erro:":"Database Error"});
        return;
    }
    var bError = false;
    var livroSalvoBase;
    livroRepository.inserir(livro, (erro, livroSalvo) => {
        if (erro) {
            res.status(500).json({"erro:":"Database Error"});
            console.log(erro);
            bError = true;
        } else {
            livroSalvoBase = livroSalvo;
            console.log("livroSalvoBase:... " + JSON.stringify(livroSalvoBase));
            livroRepository.inserirAutores(livroSalvoBase, (erro, livroSalvo) => {
                if (erro) {
                    console.log("Limpando livro: " + JSON.stringify(livroSalvoBase));
                    livroRepository.deletar(livroSalvoBase.id, (error, livro) => {
                        if (error) {
                            res.status(erro.status).json(error);
                        } else {
                            res.status(201).json(livroSalvo);
                        }
                    });
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
    console.log("Atualizando livro");
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
    const id = req.params.id;
    console.log("Deletando livro: " + id);
    livroRepository.buscarPorId(id, (erro, livro) => {
        if(erro){
            res.status(erro.status).json(erro)
        }
        else {
            livroRepository.deletarLivrosAutores(id, (error, id_livro) => {
                if (error) {
                    res.status(erro.status).json(error);
                } else {
                    livroRepository.deletar(id, (erro, id_livro) => {
                        if(erro){
                            res.status(erro.status).json(erro)
                        }
                        else {
                            res.json(livro)
                        }        
                    });
                }
            });
        }
    });
}

exports.buscarPorTitulo = (req, res) => {  
    console.log("Buscando livros por titulo.");
    console.log("params: " + JSON.stringify(req.body));
    const titulo = req.body.titulo;
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

    console.log("body: " + JSON.stringify(req.body));
    const id_autor = req.body.idAutor;
    console.log(id_autor);
    if (!id_autor) {
        const error = {
            status: 400,
            msg: "Autor não informado!"
        }
        res.status(error.status).json(error)
    }
    else{
        livroRepository.buscarPorAutor(id_autor, (erro, livros) => {
            if (erro) {
                res.status(erro.status).json(erro)
            }
            else {
                res.json(livros)
            }
        })
    }
}