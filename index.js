const express = require("express");
const app = express();
const http = require("http");

const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  io.emit("connection", "a new user connected"); // sends events to ALL clientes(sockets)
  socket.emit("Welcome", "Welcome new user"); // sends an event to ONLY the cleint who sent the server an event
  socket.broadcast.emit("new user", "a new client has connected to the server"); // sends an event to clients EXCEPT the one who sent the server an event
  

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("nickName", (nickName) => {
    console.log("nickName:" + nickName);
    socket.broadcast.emit("nickName", nickName);
  });

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    socket.broadcast.emit("chat message", msg);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
