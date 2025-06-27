const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { getBotResponse } = require('./botLogic');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Serve static files from React app
app.use(express.static('../client/build'));

// Socket.io connection handler
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('chat message', (msg) => {
    const botReply = getBotResponse(msg, socket.id);
    socket.emit('chat message', { user: 'bot', text: botReply });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
