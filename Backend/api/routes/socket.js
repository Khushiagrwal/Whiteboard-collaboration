// const setupSocket = (io) => {
//   const activeUsers = new Map(); // Map to track active connections

// io.on('connection', (socket) => {
//   // Event: User provides their unique identifier (e.g., user ID or email)
//   socket.on('register', (userId) => {
//     if (activeUsers.has(userId)) {
//       const existingSocket = activeUsers.get(userId);

//       // Disconnect the existing connection
//       existingSocket.disconnect();
//       console.log(`Disconnected duplicate connection for user: ${userId}`);
//     }

//     // Register the new connection
//     activeUsers.set(userId, socket);
//     console.log(`User ${userId} connected with socket ID: ${socket.id}`);
//   });

//   // Handle disconnection
//   socket.on('disconnect', () => {
//     for (const [userId, userSocket] of activeUsers.entries()) {
//       if (userSocket === socket) {
//         activeUsers.delete(userId); // Remove user from active users
//         console.log(`User ${userId} disconnected.`);
//         break;
//       }
//     } 
//   });
// });
// };

// module.exports = setupSocket;
const setupSocket = (io) => {
  const activeUsers = new Map(); // Map to track active users and their sockets

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // Event: Register a user
    socket.on('register', (userId) => {
      if (activeUsers.has(userId)) {
        const existingSocket = activeUsers.get(userId);
        existingSocket.disconnect();
        console.log(`Disconnected duplicate connection for user: ${userId}`);
      }

      activeUsers.set(userId, socket);
      console.log(`User ${userId} connected with socket ID: ${socket.id}`);
    });

    // Example: Broadcast drawing actions
    socket.on('draw', (data) => {
      // console.log(data)
      socket.broadcast.emit('draw', data); // Broadcast to all except sender
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      for (const [userId, userSocket] of activeUsers.entries()) {
        if (userSocket === socket) {
          activeUsers.delete(userId);
          console.log(`User ${userId} disconnected.`);
          break;
        }
      }
    });
  });
};

module.exports = setupSocket;
