import {Server, Socket} from "socket.io"


const io = new Server(8000,{
  cors:{
    origin: "*"
  }
})
const users = {}
let userdetails=[]
io.on('connection',(socket)=>{
  
  
  socket.on("new-user-connected" , (name)=>{
    users[socket.id] = name
    socket.broadcast.emit('user-joined',name)
    console.log(name,"joined chat")
    userdetails.push(name)
    socket.emit('userList',userdetails)
  });
  socket.on("send" , (message)=>{
    socket.broadcast.emit('recieve',{message:message,name:users[socket.id]})
  });
  
  socket.on('disconnect', message=>{
    socket.broadcast.emit('left',users[socket.id])
    console.log(users[socket.id])
    const index = userdetails.indexOf(users[socket.id]);
    if (index > -1) { 
      userdetails.splice(index, 1); 
    }
    
    socket.emit('userList',userdetails)
    delete users[socket.id]
   
     })

     socket.on('connection',data=>{
      console.log(data)
     })

    })