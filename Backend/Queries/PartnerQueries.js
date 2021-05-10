const pool = require('./Pool')

const requestPartner = (request, response) => {

    const id = parseInt(request.params.id)
    const { to_user } = request.body

    if (id == to_user || isNaN(to_user)) {
        response.status(400).send(`Enter a valid ID`)
        return;
    }

    pool.instance.query('SELECT * FROM users WHERE id = $1', [to_user], (error, results) => {
        if (error) {
            throw error
        }

        if (results.rows.length) {

            console.log("sss");
            pool.instance.query('SELECT * FROM requests WHERE from_user = $1 AND to_user = $2', [id, to_user], (error, cResults) => {
                if (error) {
                    throw error
                }

                if (cResults.rows.length) {
                    response.status(400).send(`Request Already Sent!`)
                    return;
                } else {
                    pool.instance.query('INSERT INTO requests (from_user, to_user) VALUES ($1, $2)', [id, to_user], (error, results) => {
                        if (error) {
                            throw error
                        }
                        response.status(200).send(`Request Sent!`)
                    })
                }
            })

        } else {
            console.log("sadas");
            response.status(400).send(`User Does Not Exist!`)
        }

    })


}

const acceptRequest = (request, response) => {
    const id = parseInt(request.params.id)
    const { from_user } = request.body

    pool.instance.query('DELETE FROM requests WHERE to_user = $1 OR from_user = $2', [id, from_user], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send("Success")
    })

}

const getRequestsById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.instance.query('SELECT * FROM requests WHERE to_user = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    requestPartner,
    acceptRequest,
    getRequestsById,
}


function checkUserExist(userID) {
    pool.instance.query('SELECT * FROM users WHERE id = $1', [userID], (error, results) => {
        if (error) {
            throw error
        }
        console.log(results.rows)
        if (!results.rows.length) {

            return false
        }

        return true
    })
}