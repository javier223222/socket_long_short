require('dotenv').config()

const e = require('express')
const express=require("express")
const { createServer, get } = require("http")
const { Server } = require('socket.io')
const fileUpload=require("express-fileupload")
const cors=require("cors")
const Foro = require('./src/models/Foro.model')
const { getTokenData } = require('./src/config/jwt.config')
const { verify } = require('./src/middlewares/socketio/AuthJwt.socketio')

const app=express()
app.use(express.json())
app.use(cors())
app.use(fileUpload
({
    useTempFiles:true,
    tempFileDir:"./uploads"
}))
app.use("/auth",require("./src/router/AuthUser.router"))
app.use("/foros",require("./src/router/Foro.router"))
app.use("/users/media",require("./src/router/User.router"))
const httpServer = createServer(app)
const PORT=process.env.PORT
const io =new Server(httpServer,{
    cors: {
        origin: "http://localhost:3000",
        
    },
    pingInterval: 1000,
    pingTimeout: 2000
})
io.use(verify)
io.of("/foros")
.on("connection",(socket)=>{
    socket.emit("welcome","bienvenido")
    const foro=new Foro()
    socket.on("joinRoom",(room)=>{
        socket.join(room)
        foro.getAllForo().then((res)=>{
            io.of("/foros").in(room).emit("newForos",res)
        })

         socket.emit("success","you have successfully joined the room")
    })


    
   
    // socket.on("joinAllforos",(name)=>{
    //     console.log("user joined all foros")
    //     socket.join("allForos")

    
        
    



    // })

    // socket.on("joinRoom",(idForo)=>{
    //     console.log("user joined room")
    //     socket.join("")
    
    // })
  



    socket.on("createForo",(data,token)=>{
        const {nameForo,descripcionForo}=data
        console.log(nameForo)
        getTokenData(token).then((res)=>{
            if(res!=null){
                const {idUser}=res.data
                const foro=new Foro(null,nameForo,descripcionForo,idUser)
                foro.create().then(res=>{
                     console.log("foro created")
                     foro.getAllForo().then((res)=>{
                     
                        io.of("/foros").in("allforos").emit("newForos",res)
                      })
                })


            }
            
            
        })
       

       
    })
   



})
httpServer.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
    
})