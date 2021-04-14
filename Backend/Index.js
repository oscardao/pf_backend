const express = require('express')
const app = express()
const port = 8000

const UQ = require('./Queries/UserQueries')
const MQ = require('./Queries/MessageQueries')
const PQ = require('./Queries/PartnerQueries')

app.use(express.urlencoded({ extended: true }));

app.get('/users/:id', UQ.getUserById)
app.get('/users', UQ.getUsers)
app.post('/users', UQ.createUser)
app.put('/users/:id', UQ.updateUser)
app.get('/users/:id', UQ.getHub)

app.get('/messages/:id', MQ.getMessagesByID)

app.get('/requests/:id', PQ.getRequestsById)
app.post('/requests/:id', PQ.requestPartner)

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})