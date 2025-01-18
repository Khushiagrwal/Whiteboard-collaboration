const setupSocket = (io) => {
  const activeUsers = new Map(); // Map to track active connections

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Event: User provides their unique identifier (e.g., user ID or email)
  socket.on('register', (userId) => {
    if (activeUsers.has(userId)) {
      const existingSocket = activeUsers.get(userId);

      // Disconnect the existing connection
      existingSocket.disconnect();
      console.log(`Disconnected duplicate connection for user: ${userId}`);
    }

    // Register the new connection
    activeUsers.set(userId, socket);
    console.log(`User ${userId} connected with socket ID: ${socket.id}`);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    for (const [userId, userSocket] of activeUsers.entries()) {
      if (userSocket === socket) {
        activeUsers.delete(userId); // Remove user from active users
        console.log(`User ${userId} disconnected.`);
        break;
      }
    } 
  });
});
};

module.exports = setupSocket;
