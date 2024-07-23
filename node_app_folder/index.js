const express = require('express')
const app = express()

app.get('/', (req, res) => {
    const head = req.headers
    res.status(200).send(head)
})

app.listen(process.env.NODE_APP_SERVER_PORT, () => {
    console.log(`Rodando na porta ${process.env.NODE_APP_SERVER_PORT}`);
});