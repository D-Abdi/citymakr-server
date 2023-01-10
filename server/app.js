const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:53141", "http://localhost:3001", "http://127.0.0.1:5173", "http://127.0.0.1:3005"]
  }
});

io.on('connection', (socket) => {
  console.log(socket.id, 'a user connected!!!');
  socket.on('disconnect', () => {
    console.log(socket.id, 'user disconnected');
  });

  socket.on("chat message", (msg) => {
    io.emit('chat message', msg);
  });
  
  socket.on("place-event", (event) => {
    console.log("EVENT", event);
    io.emit("place-event", event)
  })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});