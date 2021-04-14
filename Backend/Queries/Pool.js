const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: '192.168.8.104',
    database: 'pocket_friend_db',
    password: 'pocketfriend',
    port: 5432,
})

exports.instance = pool;