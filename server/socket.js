import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ['GET', 'POST']
    }
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Authentication error'));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded;
      next();
    } catch (err) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.user.userId);
    
    // Join user's personal room for private updates
    socket.join(socket.user.userId);
    
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.user.userId);
    });
    
    // Delivery partner location updates
    socket.on('updateLocation', (data) => {
      if (socket.user.role === 'delivery') {
        io.to(data.orderId).emit('deliveryLocation', {
          orderId: data.orderId,
          location: data.location
        });
      }
    });
  });
};

export { io };