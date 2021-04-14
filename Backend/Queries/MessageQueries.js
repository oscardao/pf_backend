const pool = require('./Pool')

const getMessagesByID = (request, response) => {
    const id = parseInt(request.params.id)
    pool.instance.query('SELECT * FROM idling_messages WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        deleteMessages(id)
        response.status(200).json(results.rows)
    })
}

const storeMessage = (message) => {
    return new Promise((resolve) => {
        const { to, from, action } = message
        console.log("Storing message: " + message)

        pool.instance.query('INSERT INTO idling_messages (to_user, from_user, action) VALUES ($1, $2, $3)', [to, from, action], (error, results) => {
            if (error) {
                throw error
            }
            resolve(results.rows);
        })
    })
}

const deleteMessages = (id) => {
    return new Promise((resolve) => {
        pool.instance.query('DELETE * FROM idling_messages WHERE id = $1', [id], (error, results) => {
            if (error) {
                throw error
            }
            resolve(`Messages Deleted for: ${id}`);
        })
    })
}

module.exports = {
    storeMessage,
    getMessagesByID,
}