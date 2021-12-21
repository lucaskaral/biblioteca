const conexao = require('../config/conexaoDB')

exports.listar = (callback) => {
    const sql = "SELECT * FROM reservas";

    conexao.query(sql, (erro, rows) => {
        if(erro){            
            callback(erro,null);
        }
        else {
            callback(null, rows);
        }
    });
}

exports.inserir = (reserva, callback) => {
    //Verifica se o livro já possui alguma reserva no período das datas informadas.
    const sqlValidaData = "SELECT * FROM livros_reservados where id_livro = ? AND data_inicio >= STR_TO_DATE(?, '%d-%m-%Y') AND data_fim <= STR_TO_DATE(?, '%d-%m-%Y')";
    conexao.query(sqlValidaData, [reserva.idLivro, reserva.dataInicio, reserva.dataFim],
        (erro, rows) => {
            if (erro) {
                callback(erro, null);
            } else {
                if (rows && rows.length > 0) {
                    const error = {
                        status: 500,
                        msg: "Já existe reserva para o livro no período informado. Por favor verifique os dados informados!"
                    };
                    callback(error, null);
                } else {
                    const sql = "INSERT INTO livros_reservados(id_livro, id_cliente, data_inicio, data_fim) VALUES (?,?,STR_TO_DATE(?, '%d-%m-%Y'),STR_TO_DATE(?, '%d-%m-%Y'))";

                    conexao.query(sql, [reserva.idLivro, reserva.idCliente, reserva.dataInicio, reserva.dataFim],
                        (erro, rows) => {
                            if (erro) {
                                callback(erro, null);
                            } else {
                                reserva.id = rows.insertId;
                                callback(null, reserva);
                            }
                    });
                }
            }
        });
}

exports.buscarPorId = (id, callback) => {

    const sql = "SELECT * FROM livros_reservados WHERE id=?";

    conexao.query(sql, [id], (err, rows) => {
        if (err) {
            const error = {
                status: 500,
                msg: err
            };
            callback(error, null);
        }
        else {
            if (rows && rows.length > 0) {
                callback(null,rows[0])
            } else { 
                const error = {
                    status: 404,
                    msg: "Reserva nao encontrada!"
                };
                callback(error, null);
            }
        }
    });
}

exports.atualizar = (id, reserva, callback) => {

    const sql = "UPDATE livros_reservados SET livro_id=?, data_inicio=?, data_fim=? WHERE id=?";

    conexao.query(sql, [reserva.idLivro, reserva.dataInicio, reserva.dataFim, id], (err, reservaAtualizada) => {
        if(err){
            const error = {
                status: 500,
                msg: err
            }
            callback(error, null);
        }
        else {
            if(reservaAtualizado.affectedRows > 0) {
                callback(null, reservaAtualizada);
            } else {
                const error = {
                    status: 500,
                    msg: "Falha! Nenhuma reserva atualizada. Verifique os dados informados!"
                }
                callback(error, null);
            }
        }
    })
}

exports.deletar = (id, callback) => {
    const sql = `DELETE FROM livros_reservados WHERE id=?`;
    conexao.query(sql, [id], (err, rows) => {
        if(err){
            const error = {
                status: 500,
                msg: err
            }
            callback(err, null);
        }
        else {
            if(rows.affectedRows) {
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