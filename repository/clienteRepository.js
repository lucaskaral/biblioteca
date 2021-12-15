const conexao = require('../config/conexaoDB')

exports.listar = (callback) => {
    const sql = "SELECT * FROM clientes";

    conexao.query(sql, (erro, rows) => {
        if (erro) {            
            callback(erro,null);
        } else {
            callback(null, rows);
        }
    })
}

exports.inserir = (cliente, callback) => {
    const sqlUser = "SELECT * FROM clientes WHERE username = ?";
    conexao.query(sqlUser, [cliente.userName],
        (erro, rows) => {
            if (erro) {
                console.log("Erro ao validar usuario: " + JSON.stringify(erro));
                const error = {
                    status: 500,
                    msg: erro
                }
                callback(error, null);
            } else {
                console.log("Validando usuario: ");
                if (rows && rows.length > 0) {
                    console.log("Usuario já existe.");
                    const error = {
                        status: 422,
                        msg: "Usuario jah cadastrado. Por favor verifique os dados informados"
                   };
                   callback(error, null);
                } else {
                    //SQL
                    const sql = "INSERT INTO clientes(nome, telefone, username, senha) VALUES (?,?,?,?)"

                    conexao.query(sql, [cliente.nome, cliente.telefone, cliente.userName, cliente.senha],
                        (erro, rows) => {
                            if (erro) {
                                callback(erro, null);
                            } else {
                                cliente.id = rows.insertId;
                                callback(null, cliente);
                            }
                    });
                }
            }
    });
}

exports.buscarPorId = (id, callback) => {

    const sql = "SELECT * FROM clientes WHERE id=?";

    conexao.query(sql, [id], (err, rows) => {
        if (err) {
            const error = {
                status: 500,
                msg: err
            }
            callback(error, null);
        }
        else {
            if (rows && rows.length > 0) {
                callback(null,rows[0]);
            } else { 
                const error = {
                    status: 404,
                    msg: "Cliente nao encontrado!"
                }
                callback(error, null);
            }
        }
    });
}

exports.atualizar = (id, cliente, callback) => {

    const sql = "UPDATE clientes SET nome=?, telefone=? WHERE id=?";

    conexao.query(sql, [cliente.nome, cliente.telefone, id], (err, clienteAtualizado) => {
        if (err) {
            const error = {
                status: 500,
                msg: err
            }
            callback(error, null);
        } else {
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
    });
}


exports.buscarPorUserName = (userName, callback) => {

    const sql = "SELECT * FROM clientes WHERE username=?";

    conexao.query(sql, [userName], (err, rows) => {
        if (err) {
            console.log("------_>>> falha ao consultar usuário.. " + err);
            const error = {
                status: 500,
                msg: err
            };
            callback(error, null);
        } else {
            if(rows && rows.length > 0){
                callback(null,rows[0]);
            } else{ 
                const error = {
                    status: 404,
                    msg: "Usuario nao encontrado!"
                };
                callback(error, null);
            }
        }
    })
}