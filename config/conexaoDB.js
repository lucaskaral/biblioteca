const mysql = require('mysql')

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database: "biblioteca"
});

module.exports = conexao