const express = require('express');
const Pool = require('pg').Pool;
const cors = require('cors');

const pool = new Pool ({
    user: 'lqdgsulswbnhgv',
    password: '413021c6a2c26263cbbeab790aa5598998320c1edf5ba861306b5f93a17941ce',
    host: 'ec2-52-87-135-240.compute-1.amazonaws.com',
    database:'d573edo4ha6c3l',
    port: 5432,
    ssl: {rejectUnauthorized: false }
})

const server = express();
 
server.use(cors());

server.use(express.json());

//Jogos (id, nome, ano)

// GET
server.get('/jogos', async function(request, response) {
   result = await pool.query('SELECT * FROM jogos');

   return response.json(result.rows);
})

server.get('/jogos/search', async function(request, response) {
    const nome = request.query.nome;
    const sql = `SELECT * FROM jogos WHERE nome ILIKE $1`;
    const result = await pool.query(sql, ["%" +  nome + "%"]);
    return response.json(result.rows);
})

server.get('/jogos/:id', async function(request, response) {
    const id = request.params.id;
    const sql = `SELECT * FROM jogos WHERE id = $1`
    const result = await pool.query(sql, [id]);
    return response.json(result.rows);
})
 
//POST
server.post('/jogos', async function(request, response) {
    const nome = request.body.nome;
    const ano = request.body.ano;
    const sql= `INSERT INTO jogos (nome, ano) VALUES ($1, $2)`;
    await pool.query(sql, [nome, ano]);
    return response.status(204).send();
})

//DELETE
server.delete('/jogos/:id', async function(request, response) {
    const id = request.params.id;
    const sql = `DELETE FROM jogos WHERE id = $1`;
    await pool.query(sql, [id]);
    return response.status(204).send();
})


//UPDATE
server.put('/jogos/:id', async function(request, response) {
    const id = request.params.id;
    const { nome, ano } = request.body;
    const sql = `UPDATE jogos SET nome = $1, ano = $2 WHERE id = $3`;
    await pool.query(sql, [nome, ano, id]);
    return response.status(204).send();
})


server.listen(process.env.PORT || 3000);