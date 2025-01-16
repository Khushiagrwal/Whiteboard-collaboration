// const express=require("express")
// const app=express()
// const config =require("./config")
// const cors=require("cors")
// const http=require("http")
// const {Server} =require("socket.io")
// const mongoose =require("mongoose")
// const setupSocket = require("./api/routes/socket")
// const userRoute =require("./api/routes/authRoute")


// const server=http.createServer(app)
// app.use(cors());
// app.use(express.json());

// const io=new Server(server,{
//     cors:{
//         origin:config.FrontendUrl
//     }
// })

// setupSocket(io)

// mongoose.connect(config.MONGODB_URL).then(()=>{
//     console.log("Database connected successfully")
// })
// .catch((err)=>{
//     console.log(`Something gone wrong ${err}`)
// })

// server.listen(config.PORT,(req,res)=>{
//     console.log(`Server is connected successfully at port ${config.PORT}`)
// })
// app.use(express.json())
// app.use("/api/user",userRoute);


const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

const config = require("./config");
const setupSocket = require("./api/routes/socket");
const userRoute = require("./api/routes/authRoute");

const app = express();
const server = http.createServer(app);

// Middleware
app.use(
  cors({
    origin: config.FrontendUrl, // Restrict to the frontend origin
    credentials: true,// Allow cookies to be sent
  })
);

app.use(express.json());

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

// Start Server
server.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
