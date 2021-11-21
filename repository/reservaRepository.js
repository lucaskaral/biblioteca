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
    })
}

exports.inserir = (reserva, callback) => {   
    //SQL
    const sql = "INSERT INTO reservas(id_livro, id_cliente, data_inicio, data_fim) VALUES (?,?,?)"

    conexao.query(sql, [reserva.idLivro, reserva.id_cliente, reserva.dataInicio, reserva.dataFim],
        (erro, rows) => {
            if(erro){
                callback(erro, null)
            }
            else {
                reserva.id = rows.insertId;
                callback(null, reserva)
            }
    })    
}

exports.buscarPorId = (id, callback) => {

    const sql = "SELECT * FROM reservas WHERE id=?";

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
                    msg: "Reserva nao encontrada!"
                }
                callback(error, null);
            }
        }
    })
}

exports.atualizar = (id, reserva, callback) => {

    const sql = "UPDATE reservas SET livro_id=?, data_inicio=?, data_fim=? WHERE id=?";

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
    const sql = `DELETE FROM reservas WHERE id=?`;
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