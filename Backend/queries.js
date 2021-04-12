const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: '192.168.8.104',
    database: 'pocket_friend_db',
    password: 'pocketfriend',
    port: 5234,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createUser = (request, response) => {
    const { name, character } = request.body
    console.log("adding user: " + request.body.name + "  " + request.body.character)
    pool.query('INSERT INTO users (name, character) VALUES ($1, $2) RETURNING id, name, character', [name, character], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).json(results.rows[0]);
    })
}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, character } = request.body

    pool.query(
        'UPDATE users SET name = $1, character = $2 WHERE id = $3',
        [name, character, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getUserById,
    createUser,
    updateUser,
    getUsers,
}