const WebSocket = require('ws')
const port = 8080

const wsServer = new WebSocket.Server({ port: port }, () => {
    console.log('server started')
})

let connections = {}

wsServer.on('connection', function (ws, req) {
    let queryString = req.url.replace('/', '');
    let params = new URLSearchParams(queryString);
    console.log(`Registering connection: playerID=${params.get('playerID')}`);

    connections[params.get('playerID')] = ws;

    ws.on('message', (data) => {
        let parsedMessage = JSON.parse(data);
        console.log(parsedMessage);
        if (parsedMessage.toID in connections) {
            console.log("Receiver present, forwarding message to receiver");
            connections[parsedMessage.toID].send(data);
        } else {
            console.log("Receiver not present, forwarding message to database");
            //Forward to database
        }
    })

    ws.on('close', () => {
        delete connections[params.get('playerID')];
        console.log('Connection closed');
    })
})