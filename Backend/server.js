const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

const config = require("./config");
const setupSocket = require("./api/routes/socket");
const userRoute = require("./api/routes/authRoute");
const inviteRoute =require("./api/routes/inviteRoute");
const app = express();
const server = http.createServer(app);
const isAuthenticate =require("./middleware/authenticateJWT");
const cookieParser = require("cookie-parser");

// Middleware
app.use(
  cors({
    origin: config.FrontendUrl, // Restrict to the frontend origin
    credentials: true,// Allow cookies to be sent
  })
);

app.use(express.json());
app.use(cookieParser());
// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: config.FrontendUrl, // Match CORS with frontend URL
  },
}); 

setupSocket(io);

// MongoDB Connection
mongoose
  .connect(config.MONGODB_URL)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error(`Database connection error: ${err}`);
    process.exit(1); // Terminate on connection error
  });

// Routes
app.use("/api/user", userRoute);

app.get("/authenticate", isAuthenticate, (req, res) => {
  res.send("yes you are authenticate"); // Response if the user is authenticated
});

app.use("/api/share",isAuthenticate,inviteRoute);

// Start Server
server.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
