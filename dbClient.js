require('dotenv').config()
const mariadb = require('mariadb')

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    connectionLimit: 30
})

const dbClient = (ipcIp) => {
    return new Promise(async (resolve, reject) => {
        try {
            const connection = await pool.getConnection()
            const monId = await connection.query(`SELECT Monitors.Id FROM zm.Monitors WHERE Monitors.Path REGEXP"${ipcIp}"`)
            connection.release()
            resolve(monId)
        } catch (error) {
            console.log(`Database Error: ${error.message}`)
        }
    })
}

module.exports = dbClient