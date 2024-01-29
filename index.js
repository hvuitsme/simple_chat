const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
  console.log('1 người dùng đã ngắt kết nối');

  socket.on('disconnect', () => {
    console.log('Người dùng đã ngắt kết nối');
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', { text: msg.text, username: msg.username });
  });
});

const PORT = process.env.PORT || 7749;
server.listen(PORT, () => {
  console.log(`Máy chủ đang chạy ở cổng: ${PORT}`);
});
