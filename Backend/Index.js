const express = require('express')
const app = express()
const port = 8000

const UQ = require('./Queries/UserQueries')
const HQ = require('./Queries/HubQueries')

app.use(express.urlencoded({ extended: true }));

app.get('/users/:id', UQ.getUserById)
app.get('/users', UQ.getUsers)
app.post('/users', UQ.createUser)
app.put('/users/:id', UQ.updateUser)
app.get('/users/hub/:id', UQ.getHub)

app.get('/messages/:id', HQ.getMessagesByID)

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})