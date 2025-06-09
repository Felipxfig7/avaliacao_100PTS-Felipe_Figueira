const express = require('express')
const tarefasRoutes = require('./routes/tarefa')
const app = express()

app.use(express.json())
app.use('/tarefas', tarefasRoutes)

app.listen(3000, () => {
    console.log("Servidor backend rodando em http://localhost:3000")
})