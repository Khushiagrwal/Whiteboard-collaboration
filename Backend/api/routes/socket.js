// const setupSocket = (io) => {
//     io.on("connection", (socket) => {
//       console.log(`${socket.id} connected`);
      
//       socket.on("joinRoom", (room) => {
//         socket.join(room);
//         console.log(`User ${socket.id} joined room: ${room}`);
//       });
  
//       socket.on("leaveRoom", (room) => {
//         socket.leave(room);
//         console.log(`User ${socket.id} left room: ${room}`);
//       });
  
//       socket.on("sendMessage", (room, msg) => {
//         io.to(room).emit("receiveMessage", msg);
//         console.log(`Message sent to room ${room}: ${msg}`);
//       });
  
//       socket.on("disconnect", () => {
//         console.log(`User disconnected: ${socket.id}`);
//       });
//     });
//   };
  
//   module.exports = setupSocket;
  


const setupSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`${socket.id} connected`);

    // Store the room the user has joined
    let currentRoom = null;

    // Handle draw event
    socket.on("draw", (data) => {
      if (currentRoom) {
        io.to(currentRoom).emit("draw", data); // Broadcast to the current room
      }
    });

    // Handle room joining
    socket.on("joinRoom", (room) => {
      if (currentRoom) {
        socket.leave(currentRoom); // Leave the previous room if any
      }
      socket.join(room); // Join the new room
      currentRoom = room; // Update the current room
      console.log(`${socket.id} joined room: ${room}`);
    });

    // Handle leaving the room
    socket.on("leaveRoom", () => {
      if (currentRoom) {
        socket.leave(currentRoom);
        console.log(`${socket.id} left room: ${currentRoom}`);
        currentRoom = null; // Clear the current room
      }
    });

    // Handle disconnect
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
      if (currentRoom) {
        console.log(`${socket.id} was in room: ${currentRoom}`);
      }
    });
  });
};

module.exports = setupSocket;
