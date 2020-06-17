// yarn add pg

const Pool = require('pg').Pool;

//1 - Abrir a conexão
//2 - Executar o comando SQL (query, insert)
//3 - Fechar a conexão

const pool = new Pool ({  
    user: '',
    password: '',
    host: '',
    database:'',
    port: 5432,
    ssl: {rejectUnauthorized: false }
})

//const sql = `
//    CREATE TABLE IF NOT EXISTS jogos
//    (
//        id serial primary key,
//        nome varchar (200),
//        ano int,
//    )
//
//`;


// pool.query(sql, function(error, result) {
//    if(error)
//         throw error
//        
//    console.log ('Tabela criada com sucesso!');    
//
// });

//INSERT
//const sql_insert = `
//        INSERT INTO jogos (nome, ano) VALUES ('Corinthians',2019)
//`;
//
//pool.query(sql_insert, function(error, result) {
//   if(error)
//        throw error;
//
 //  console.log(result.rowCount);
//})

//SELECT
// const sql_select = `SELECT * FROM jogos`;
//
// pool.query(sql_select, function(error, result) {
//    if(error)
//         throw error;
//
//     console.log(result.rows);
// })