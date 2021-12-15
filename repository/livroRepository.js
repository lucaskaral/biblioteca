const { json } = require('express');
const conexao = require('../config/conexaoDB')

exports.listar = (callback) => {
    console.log("Listando livros");
    const sql = "SELECT * FROM livros";

    conexao.query(sql, (erro, rows) => {
        if (erro) {
            callback(erro,null);
        }
        else {
            callback(null, rows);
        }
    })
}

exports.inserir = (livro, callback) => {   
    //SQL
    console.log("Inserindo livros");
    const sql = "INSERT INTO livros(titulo, editora, ano_publicacao, ISBN) VALUES (?,?,STR_TO_DATE(?, '%d-%m-%Y'),?)"

    conexao.query(sql, [livro.titulo, livro.editora, livro.anoPublicacao, livro.ISBN],
        (erro, rows) => {
            if(erro){
                console.log("Erro ao inserir livros: " + erro);
                callback(erro, null)
            }
            else {
                livro.id = rows.insertId;
                console.log("Livro cadastrado");
                callback(null, livro)
            }
    });
}

exports.validarIdsAutores = (arrIdsAutores) => {
    var consultaOk = true;

    for (let index = 0; index < arrIdsAutores.length; index++) {
        console.log("Validando idAutor: " + arrIdsAutores[index]);
        sqlAutores = "SELECT * FROM autores WHERE id=?";
        conexao.query(sqlAutores, [arrIdsAutores[index]],
            (erro, rows) => {
                if (erro) {
                    console.log("Erro consulta autor: " + erro);
                    consultaOk = false;
                }
                console.log("Autores rows: " + rows.length);
                if (rows.length <= 0) {
                    console.log("Autor nao encontrado: " + arrIdsAutores[index]);
                    consultaOk = false;
                }
        });
        console.log("Resultado consulta: " + consultaOk);
        if (!consultaOk) {
            break;
        }
    }

    if (!consultaOk) {
        return false;
    }
    console.log("Consulta autores exitosa.");
    return true;
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
                if (erro) {
                    callback(erro, null);
                } else {
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

    const sql = "UPDATE livros SET titulo=?, ISBN=?, ano_publicacao=STR_TO_DATE(?, '%d-%m-%Y'), editora=? WHERE id=?";

    conexao.query(sql, [livro.titulo, livro.ISBN, livro.anoPublicacao, livro.editora, id], (err, livroAtualizado) => {
        if (err) {
            const error = {
                status: 500,
                msg: err
            }
            callback(error, null);
        } else {
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
    console.log("Deletando livro ID:" + id);
    const sql = "DELETE FROM livros WHERE id=?";
    conexao.query(sql, [id], (err, rows) => {
        if (err) {
            console.log("Falha ao deletar livro. " + err);
            const error = {
                status: 500,
                msg: err
            }
            callback(err, null);
        } else {
            if (rows.affectedRows) {
                callback(null, id);
            } else {
                const error = {
                    status: 500,
                    msg: err
                }
                callback(err, null);    
            }
        }
    });         
}

//Remove livro da tabela de relação livros_autores
exports.deletarLivrosAutores = (id, callback) => {
    console.log("Deletando livro da tabela livros_autores LIVRO_ID:" + id);
    const sql = "DELETE FROM livros_autores WHERE id_livro=?";
    conexao.query(sql, [id], (err, rows) => {
        if (err) {
            console.log("Falha ao deletar livro da tabela livros_autores. " + err);
            const error = {
                status: 500,
                msg: err
            }
            callback(err, null);
        } else {
            if (rows.affectedRows) {
                callback(null, id);
            } else {
                const error = {
                    status: 500,
                    msg: err
                }
                callback(err, null);    
            }
        }
    });         
}

exports.buscarPorTitulo = (titulo, callback) => {
    console.log("buscando por titulo");
    const sql = "SELECT * FROM livros WHERE upper(titulo) LIKE CONCAT('%', upper(?) , '%')";

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
                callback(null,rows)
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

exports.buscarPorAutor = (id_autor, callback) => {
    console.log("Buscando po autor.");
    const sql = "SELECT L.* FROM LIVROS L INNER JOIN LIVROS_AUTORES LA ON LA.ID_LIVRO = L.ID WHERE LA.ID_AUTOR = ?";

    conexao.query(sql, [id_autor], (err, rows) => {
        if(err){
            const error = {
                status: 500,
                msg: err
            }
            callback(error, null);
        } else {
            if (rows && rows.length > 0) {
                callback(null,rows)
            } else { 
                const error = {
                    status: 404,
                    msg: "Nao foram encontrados livros para este autor!"
                }
                callback(error, null);
            }
        }
    })
}