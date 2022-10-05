import {Server, Socket} from "socket.io"


const io = new Server(8000,{
  cors:{
    origin: "*"
  }
})
const users = {}
io.on('connection',(socket)=>{
  
    
     socket.on("new-user-connected" , (name)=>{
      users[socket.id] = name
      socket.broadcast.emit('user-joined',name)
      console.log(name,"joined chat")
         
     });
     socket.on("send" , (message)=>{
       socket.broadcast.emit('recieve',{message:message,name:users[socket.id]})
     });

     socket.on('disconnect', message=>{
      socket.broadcast.emit('left',users[socket.id])
      delete users[socket.id]
     })
    })