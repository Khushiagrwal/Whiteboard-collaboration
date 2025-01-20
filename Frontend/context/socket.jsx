import { io } from "socket.io-client";

let socket;

export const getSocket = () => {
  const userData = localStorage.getItem("persist:root");

  try {
    const parsedData = userData ? JSON.parse(userData) : null;
    const userInfo = parsedData?.user ? JSON.parse(parsedData.user)?.userInfo?.user : null;
    const email = userInfo?.email;

    
    // If email exists and socket is not connected, establish the connection
    if (email && !socket) {
      socket = io("http://localhost:8080"); // Initialize socket connection
      socket.emit("register", email); // Emit the register event
      console.log("Socket connected and registered:", email);

      // Handle socket events (optional)
      socket.on("connect", () => {
        console.log("Socket connected:", socket.id);
      });

      socket.on("disconnect", () => {
        console.log("Socket disconnected");
      });
    }
    // If email doesn't exist and socket is connected, disconnect it
    if (!email && socket) {
      socket.disconnect(); // Disconnect the socket
      console.log("Socket disconnected due to missing email");
      socket = null; // Reset the socket reference
    }
  } catch (error) {
    console.error("Error processing user data:", error);
    if (socket) {
      socket.disconnect();
      socket = null; // Reset on error
    }
  }

  return socket;
};

export const useSocket = () => {
  return getSocket(); // Maintain compatibility for the existing code
};
