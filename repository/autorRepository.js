const conexao = require('../config/conexaoDB')

exports.listar = (callback) => {
    const sql = "SELECT * FROM autores";

    conexao.query(sql, (erro, rows) => {
        if(erro){            
            callback(erro,null);
        }
        else {
            callback(null, rows);
        }
    })
}

exports.inserir = (autor, callback) => {   
    //SQL
    const sql = "INSERT INTO autores(nome, pais) VALUES (?,?)";

    conexao.query(sql, [autor.nome, autor.pais],
        (erro, rows) => {
            if(erro){
                callback(erro, null)
            }
            else {
                autor.id = rows.insertId;
                callback(null, autor)
            }
    })    
}

exports.buscarPorId = (id, callback) => {

    const sql = "SELECT * FROM autores WHERE id=?";

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
                    msg: "Autor nao encontrado!"
                }
                callback(error, null);
            }
        }
    })
}

exports.atualizar = (id, autor, callback) => {

    const sql = "UPDATE autores SET nome=?, pais=? WHERE id=?";

    conexao.query(sql, [autor.nome, autor.pais, id], (err, autorAtualizado) => {
        if(err){
            const error = {
                status: 500,
                msg: err
            }
            callback(error, null);
        }
        else {
            if(autorAtualizado.affectedRows > 0) {
                callback(null, autorAtualizado);
            } else {
                const error = {
                    status: 500,
                    msg: "Falha! Nenhum autor atualizado. Verifique os dados informados!"
                }
                callback(error, null);
            }
        }
    })
}

exports.deletar = (id, callback) => {
    const sql = `DELETE FROM autores WHERE id=?`;
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