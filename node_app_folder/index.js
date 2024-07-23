const express = require('express')
const mysql = require('mysql2/promise');
const app = express()
const db_config = {
    host: process.env.MYSQL_SRV_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}

async function insert_and_get_nome() {
    try {
        const connection = await mysql.createConnection(db_config);
        console.log('Conectado ao banco');

        const nome = 'Rodrigo';
        const insertQuery = 'INSERT INTO pessoa (nome) VALUES (?)';
        await connection.execute(insertQuery, [nome]);
        console.log('Nome inserido');

        const selectQuery = 'SELECT nome FROM pessoa ORDER BY id DESC LIMIT 1';
        const [rows] = await connection.execute(selectQuery);

        await connection.end();

        return rows[0] ? rows[0].nome : null;

    } catch (error) {
        console.error('Erro ao connect/ insert/ select:', error);
        return null;
    }
}

app.get('/', async (req, res) => {
    const nome = await insert_and_get_nome();

    let html = `
      <!DOCTYPE html>
      <html>
      <head>
         <title>Full Cycle - Desafio 02 - Docker Compose - NGINX/ NodeJS/ MySQL</title>
      </head>
      <body>
         <h1>${nome ? nome+' ' : 'Full Cycle '} Rocks</h1>
      </body>
      </html>
    `;

    res.status(200).send(html);    
  });

app.listen(process.env.NODE_APP_SERVER_PORT, () => {
    console.log(`Rodando na porta ${process.env.NODE_APP_SERVER_PORT}`);
});
