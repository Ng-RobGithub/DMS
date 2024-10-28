const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('User connected');
  socket.on('trackOrder', (orderId) => {
    // Listen for order status changes
    socket.join(orderId); // Join a room specific to the order ID
  });
});

module.exports = io;
