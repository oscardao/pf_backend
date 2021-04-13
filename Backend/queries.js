const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: '192.168.8.104',
    database: 'pocket_friend_db',
    password: 'pocketfriend',
    port: 5432,
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
    const { name, character_model } = request.body
    console.log("adding user: " + request.body.name + "  " + request.body.character_model)
    pool.query('INSERT INTO users (name, character_model) VALUES ($1, $2) RETURNING id, name, character_model', [name, character_model], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).json(results.rows[0])
    })
}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, character_model } = request.body

    pool.query(
        'UPDATE users SET name = $1, character_model = $2 WHERE id = $3',
        [name, character_model, id],
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

        if (!results.rows.length) {
            response.status(404).send("User not found!")
        }

        response.status(200).json(results.rows[0])
    })
}

const storeMessage = (message) => {
    return new Promise((resolve) => {
        const { to, from, action } = message
        console.log("Storing message: " + message)

        pool.query('INSERT INTO messages (to_user, from_user, action) VALUES ($1, $2, $3)', [to, from, action], (error, results) => {
            if (error) {
                throw error
            }
            resolve(results.rows);
        })
    })
}

const getMessages = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM idling_messages WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getHub = (request, response) => {
    const id = parseInt(request.params.id)

}

module.exports = {
    getUserById,
    createUser,
    updateUser,
    getUsers,
    storeMessage,
    getMessages,
    getHub,
}