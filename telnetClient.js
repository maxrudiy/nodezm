require('dotenv').config()
const { Telnet } = require('telnet-client');

const TELNET_HOST = process.env.TELNET_HOST
const TELNET_PORT = process.env.TELNET_PORT

const telnetClient = (monId, func) => {
    return new Promise(async (resolve, reject) => {
        try {
            const connection = new Telnet()
            const params = {
                host: TELNET_HOST,
                port: TELNET_PORT,
                shellPrompt: false,
            }
            await connection.connect(params)
            const result = await connection.send(`${monId}|${func}|1|External Motion|External Motion`, () => {
                connection.end()
            })
            resolve(result)
        } catch (error) {
            //console.log(`Telnet Error: ${error.message}`)
        }
    })
}

module.exports = telnetClient