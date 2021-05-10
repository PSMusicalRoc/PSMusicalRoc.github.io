const { Socket } = require('dgram');
const express = require('express');
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
    app.use(express.static('public'));
    res.sendFile(__dirname + "/index.html");
});

app.get("/index.html", (req, res) => {
    app.use(express.static('public'));
    res.sendFile(__dirname + "/index.html");
});

app.get("/buttonPage.html", (req, res) => {
    if (req.query.roomid && req.query.username)
    {
        app.use(express.static('public'));
        res.sendFile(__dirname + "/buttonPage.html");
    }
});

io.on("connection", socket => {
    socket.on("clientjoinroom", room => {
        socketID = socket.id;
        console.log(`Room: ${room}`);
        io.in(socketID).socketsJoin(room);
    });

    /*socket.on("buttonbuzz", (username, room) => {
        io.to(room).emit("buzzedin", username, room);
    });*/
});

io.of("/").adapter.on("join-room", (room, userid) => {
    console.log("User " + userid + " joined room " + room);
});

io.of("/").adapter.on("create-room", room => {
    console.log("Room " + room + " created");
});

io.of("/").adapter.on("leave-room", (room, userid) => {
    console.log(`User ${userid} has left room ${room}`);
});

io.of("/").adapter.on("delete-room", room => {
    console.log(`Room ${room} deleted`);
});

server.listen(12000, () => {
    console.log("Listening on Port 12000");
});