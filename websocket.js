const WebSocketServer = new require('ws');

const clients = {};

const webSocketServer = new WebSocketServer.Server({
  port: 3002
});

webSocketServer.on('connection', ws => {
  const id = Math.random();
  clients[id] = ws;
  console.log("new connection " + id);

  ws.on('message', message => {
    for (let key in clients) {
      clients[key].send(message);
    }
  });

  ws.on('close', () => {
    delete clients[id];
  });
});

console.log('WebSocket server started on port 3002')