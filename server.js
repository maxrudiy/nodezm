require('dotenv').config()
const telnetClient = require(`${__dirname}/telnetClient`)
const dbClient = require(`${__dirname}/dbClient`)
const net = require('net')

const LISTEN_PORT = process.env.LISTEN_PORT
const LISTEN_HOST = process.env.LISTEN_HOST

const server = net.createServer()

server.listen(LISTEN_PORT, LISTEN_HOST, () => {
    console.log('TCP Server is running on port ' + LISTEN_PORT + '.');
});

server.on('connection', sock => {
    sock.on('data', async data => {
        data = JSON.parse(data.toString('utf8', 20))

        let ipcIp = sock.remoteAddress
        let monId = await dbClient(ipcIp)
        let monIdStr = monId[0].Id.toString()

        if (data.Status === 'Start') {
            //console.log(data)
            await telnetClient(monIdStr, 'on')
        } else if (data.Status === 'Stop') {
            //console.log(data)
            await telnetClient(monIdStr, 'cancel')
        } else {
            //console.log(data)
        }
    })
})