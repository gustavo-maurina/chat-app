const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: "http://localhost:5000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("nova conexão socket", socket.id);

  const id = socket.handshake.query.id;
  socket.join(id);
  console.log(id);

  socket.on("send-message", ({ recipient, text, timeSent }) => {
    socket.broadcast.to(recipient).emit("receive-message", {
      recipients: [recipient],
      sender: id,
      senderId: socket.id,
      text,
      timeSent,
    });
  });
});

server.listen(8080, () => console.log("server rodando"));
