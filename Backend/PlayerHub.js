const WebSocket = require('ws')
const port = 8080
const MQ = require('./Queries/HubQueries')

const wsServer = new WebSocket.Server({ port: port }, () => {
    console.log('server started')
})

let connections = {}

wsServer.on('connection', function (ws, req) {
    let queryString = req.url.replace('/', '');
    let params = new URLSearchParams(queryString);

    console.log(`Registering connection: playerID=${params.get('playerID')}`);

    connections[params.get('playerID')] = ws;
    //MQ.addUserToHub(params.get('playerID'))

    ws.on('message', (data) => {
        let JSONmessage = JSON.parse(data);
        if (JSONmessage.from_user in connections) {
            console.log("Receiver present, forwarding message to receiver");
            connections[JSONmessage.from_user].send(data);
        } else {
            console.log("Receiver not present, forwarding message to database");
            //MQ.storeMessage(JSONmessage)
        }
    })

    ws.on('close', () => {
        //MQ.removeUserFromHub(params.get('playerID'))
        delete connections[params.get('playerID')];
        console.log('Connection closed');
    })
})