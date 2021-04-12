const express = require('express')
const app = express()
const port = 8000
const db = require('./queries')


app.use(express.urlencoded({ extended: true }));

app.get('/users/:id', db.getUserById)
app.get('/users', db.getUsers)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})