const pool = require('./Pool')

const getUsers = (request, response) => {
    pool.instance.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createUser = (request, response) => {
    const { name, character_model } = request.body
    console.log("adding user: " + request.body.name + "  " + request.body.character_model)
    pool.instance.query('INSERT INTO users (name, character_model) VALUES ($1, $2) RETURNING id, name, character_model', [name, character_model], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).json(results.rows[0])
    })
}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, character_model } = request.body

    pool.instance.query(
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

    pool.instance.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }

        if (!results.rows.length) {
            response.status(200).json({})
        }

        response.status(200).json(results.rows[0])
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
    getHub,
}