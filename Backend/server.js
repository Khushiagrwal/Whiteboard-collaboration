const express=require("express")
const app=express()
const config =require("./config")
const cors=require("cors")
const http=require("http")
const {Server} =require("socket.io")
const mongoose =require("mongoose")
const setupSocket = require("./api/routes/socket")
const userRoute =require("./api/routes/authRoute")


const server=http.createServer(app)
app.use(cors());
app.use(express.json());

const io=new Server(server,{
    cors:{
        origin:config.FrontendUrl
    }
})

setupSocket(io)

mongoose.connect(config.MONGODB_URL).then(()=>{
    console.log("Database connected successfully")
})
.catch((err)=>{
    console.log(`Something gone wrong ${err}`)
})

server.listen(config.PORT,(req,res)=>{
    console.log(`Server is connected successfully at port ${config.PORT}`)
})

app.use("/api/user",userRoute);
