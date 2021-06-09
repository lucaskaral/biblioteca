const { json } = require('express');
const conexao = require('../config/conexaoDB')

exports.listar = (callback) => {

    const sql = "SELECT * FROM livros";

    conexao.query(sql, (erro, rows) => {
        if(erro){            
            callback(erro,null);
        }
        else {
            callback(null, rows);
        }
    })
}

exports.inserir = (livro, callback) => {   
    //SQL
    const sql = "INSERT INTO livros(titulo, editora, ano_publicacao, ISBN) VALUES (?,?,?,?)"

    conexao.query(sql, [livro.titulo, livro.editora, livro.anoPublicacao, livro.ISBN],
        (erro, rows) => {
            if(erro){
                callback(erro, null)
            }
            else {
                livro.id = rows.insertId;
                console.log("Livro cadastrado");
                callback(null, livro)
            }
    });
}

exports.inserirAutores = (livro, callback) => {
    if (livro.idsAutores) {
        const sqlLivrosAutores = "INSERT INTO livros_autores (id_livro, id_autor) VALUES ?";
        arrIdsAutores = livro.idsAutores.split(",");
        arrIds = [];
        arrIdsAutores.forEach(function(idAutor, i) {
            arrIds.push([livro.id, idAutor]);
        });

        conexao.query(sqlLivrosAutores, [arrIds],
            (erro, rows) => {
                if(erro){
                    callback(erro, null);
                }
                else {
                    callback(null, livro);
                }
        });
    } else {
        const error = {
            status: 500,
            msg: "Ids Autores não informados!"
        }
        callback(error, null);
    }
}

exports.buscarPorId = (id, callback) => {

    const sql = "SELECT * FROM livros WHERE id=?";

    conexao.query(sql, [id], (err, rows) => {
        if(err){
            const error = {
                status: 500,
                msg: err
            }
            callback(error, null);
        }
        else {
            if(rows && rows.length > 0){
                callback(null,rows[0])
            }
            else{ 
                const error = {
                    status: 404,
                    msg: "Livro nao encontrado!"
                }
                callback(error, null);
            }
        }
    })
}

exports.atualizar = (id, livro, callback) => {

    const sql = "UPDATE livros SET titulo=?, ISBN=?, ano_publicacao=?, editora=? WHERE id=?";

    conexao.query(sql, [livro.titulo, livro.ISBN, livro.anoPublicacao, livro.editora, id], (err, livroAtualizado) => {
        if(err){
            const error = {
                status: 500,
                msg: err
            }
            callback(error, null);
        }
        else {
            if(livroAtualizado.affectedRows > 0) {
                callback(null, livroAtualizado);
            } else {
                const error = {
                    status: 500,
                    msg: "Falha! Nenhum livro atualizado. Verifique os dados informados!"
                }
                callback(error, null);
            }
        }
    })
}

exports.deletar = (id, callback) => {
    const sql = `DELETE FROM livros WHERE id=?`;
    conexao.query(sql, [id], (err, rows) => {
        if(err){
            const error = {
                status: 500,
                msg: err
            }
            callback(err, null);
        }
        else {
            if(rows.affectedRows){
                callback(null, id);
            }
            else {
                const error = {
                    status: 500,
                    msg: err
                }
                callback(err, null);    
            }
        }
    })            
}

exports.buscarPorTitulo = (titulo, callback) => {
    console.log("buscando por titulo")
    const sql = "SELECT * FROM livros WHERE titulo LIKE CONCAT('%', ? , '%')";

    conexao.query(sql, [titulo], (err, rows) => {
        if(err){
            const error = {
                status: 500,
                msg: err
            }
            callback(error, null);
        }
        else {
            if(rows && rows.length > 0){
                callback(null,rows[0])
            }
            else{ 
                const error = {
                    status: 404,
                    msg: "Livro nao encontrado!"
                }
                callback(error, null);
            }
        }
    })
}