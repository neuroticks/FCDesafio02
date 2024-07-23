const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('<h1> Full Cycle Rocks!</h1>')
})

app.listen(process.env.NODE_APP_SERVER_PORT, () => {
    console.log(`Rodando na porta ${process.env.NODE_APP_SERVER_PORT}`);
});