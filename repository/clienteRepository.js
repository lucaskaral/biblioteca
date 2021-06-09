const conexao = require('../config/conexaoDB')

exports.listar = (callback) => {
    const sql = "SELECT * FROM clientes";

    conexao.query(sql, (erro, rows) => {
        if(erro){            
            callback(erro,null);
        }
        else {
            callback(null, rows);
        }
    })
}

exports.inserir = (cliente, callback) => {   
    //SQL
    const sql = "INSERT INTO clientes(nome, telefone) VALUES (?,?)"

    conexao.query(sql, [cliente.nome, cliente.telefone],
        (erro, rows) => {
            if(erro){
                callback(erro, null)
            }
            else {
                cliente.id = rows.insertId;
                callback(null, cliente)
            }
    })    
}

exports.buscarPorId = (id, callback) => {

    const sql = "SELECT * FROM clientes WHERE id=?";

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
                    msg: "Cliente nao encontrado!"
                }
                callback(error, null);
            }
        }
    })
}

exports.atualizar = (id, cliente, callback) => {

    const sql = "UPDATE clientes SET nome=?, telefone=? WHERE id=?";

    conexao.query(sql, [cliente.nome, cliente.telefone, id], (err, clienteAtualizado) => {
        if(err){
            const error = {
                status: 500,
                msg: err
            }
            callback(error, null);
        }
        else {
            if(clienteAtualizado.affectedRows > 0) {
                callback(null, clienteAtualizado);
            } else {
                const error = {
                    status: 500,
                    msg: "Falha! Nenhum cliente atualizado. Verifique os dados informados!"
                }
                callback(error, null);
            }
        }
    })
}

exports.deletar = (id, callback) => {
    const sql = `DELETE FROM clientes WHERE id=?`;
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