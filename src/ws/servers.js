// Node.js WebSocket server script
const http = require('http');
const WebSocketServer = require('websocket').server;
const server = http.createServer();
server.listen(8082);
const wsServer = new WebSocketServer({
    httpServer: server
});

let i = 0;
setInterval(()=>{
    i++;
},2000)
let pushmessageArray = [];


wsServer.on('request', function(request) {
    const connection = request.accept(null, request.origin);
      connection.on('message', function(message) {
      console.log('Received Message:', message.utf8Data);
      connection.sendUTF('Hi this is WebSocket server!' + i);
      console.log(connection)
      pushmessageArray.push(connection)
    });
    connection.on('close', function(reasonCode, description) {
        console.log('Client has disconnected.');
    });
});

setInterval(()=>{
    pushmessageArray.map(item => {
        item.sendUTF('pushmessage' + i)
    })
    //pushmessage.sendUTF('pushmessage' + i);  
},2000)